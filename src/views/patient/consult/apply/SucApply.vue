<template>
  <el-table
    :data="
      tableData.filter(
        (data) =>
          !search ||
          data.doctorName.toLowerCase().includes(search.toLowerCase())
      )
    "
    style="width: 100%"
  >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="预约问诊时间" label-width="100px">
            <span>{{ props.row.time | formatDate }}</span>
          </el-form-item>
          <el-form-item label="医生" label-width="100px">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="预约状态" label-width="100px">
            <span v-if="props.row.status == 1">已接受</span>
          </el-form-item>
          <el-form-item label="主诉" label-width="100px">
            <span>{{ props.row.initDescription }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      label="预约日期"
      prop="time"
      :formatter="dateFormat1"
      sortable
    >
    </el-table-column>

    <el-table-column label="预约时间" prop="time" :formatter="dateFormat2">
    </el-table-column>
    <el-table-column label="预约医生" prop="name"> </el-table-column>
    <el-table-column label="预约状态" prop="status">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.status == 1" type="success" size="mini"
          >已接受</el-tag
        >
      </template>
    </el-table-column>

    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          @click="handleEdit(scope.row)"
          size="mini"
          placeholder="输入医生关键字搜索"
        />
      </template>
      <template slot-scope="scope">
        <el-button size="mini" type="primary" @click="goConsult(scope.row)"
          >前往问诊界面</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-left: 2%;
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
import { formatDate } from "@/utils/date.js";
export default {
  data() {
    return {
      tableData: [],
      search: "",
      dialogTableVisible: false,
      store: {
        id: "",
      },
    };
  },
  filters: {
    formatDate(time) {
      time = Number(time);
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  created() {
    this.gettableData();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleChange() {
      this.$forceUpdate();
    },
     //  格式化日期
    dateFormat1(row, column) {
      let time = row[column.property];
      if (time == undefined) {
        return "";
      }
      return time.substring(0,10);
    },
    //  格式化日期
    dateFormat2(row, column) {
      let time = row[column.property];
      if (time == undefined) {
        return "";
      }
      return time.substring(11,19);
    },
    gettableData() {
      this.store.id = window.sessionStorage.getItem("userID");
      console.log("sessionstorage.id:" + this.store.id);
      let _this = this;
      this.axios
        .get("./oiservice/getPatientRequests/" + this.store.id)
        .then(function (res) {
          for (let i of res.data){
            if(i.bookingRequest.status==1)
            _this.tableData.push({
              time:i.bookingRequest.time,
              name:i.doctor.name,
              status:i.bookingRequest.status,
              initDiscription:i.bookingRequest.initDescription,
              rejectionReason:i.bookingRequest.rejectionReason,
              doctorID:i.bookingRequest.doctorID,
              doctorName:i.doctor.name,
            })
          }
          //0待接收 1接受 2拒绝 3已完成
        })
        .catch(function (error) {
          console.log("Get Nothing!" + error);
        });
    },
    goConsult(data) {
      var date1=new Date( data.time)
      date1.setHours(date1.getHours() - 8);
      // console.log("date1" + date1);
      var date2 = new Date();
      // console.log("date2" + date2);
      if (date1 < date2) {
        // console.log(window.sessionStorage.getItem('userID'))
        // this.$store.commit(
        //   "editPatientId",
        //   window.sessionStorage.getItem("userID")
        // );
        // this.$store.commit("editDoctorId", data.doctorID);
        //记得改回来！！！！！！！！！
        // this.axios
        //   .get("doctor-service/completeRequest/" + data.reserveNum)
        //   .then(function (res) {
        //     console.log("gettableData.res.data:");
        //     console.log(res.data);
        //   })
        //   .catch(function (error) {
        //     console.log("Failed!" + error);
        //   });
        console.log("data:"+data)
        console.log("data.doctorID:"+data.doctorID);
        window.sessionStorage.setItem("doctorID", data.doctorID);
        window.sessionStorage.setItem("patientID", window.sessionStorage.getItem("userID"));
        window.sessionStorage.setItem("doctorName",data.name);
        window.sessionStorage.setItem("patientName",window.sessionStorage.getItem("userName"));
        console.log("patientName:"+window.sessionStorage.getItem('patientName'))
        this.$router.push("/patientchat");
      } else
        this.$confirm("时间未到，聊天室还未开启！", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        });
    },
  },
};
</script>
