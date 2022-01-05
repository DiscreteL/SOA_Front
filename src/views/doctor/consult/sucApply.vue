<template>
  <el-table
    :data="
      tableData.filter(
        (data) =>
          !search || data.doctor.toLowerCase().includes(search.toLowerCase())
      )
    "
    style="width: 100%"
  >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form
          label-position="left"
          inline
          class="demo-table-expand"
          label-width="200px"
        >
          <el-form-item label="预约单号">
            <span>{{ props.row.reserveNum }}</span>
          </el-form-item>
          <el-form-item label="预约时间">
            <span>{{ props.row.time | formatDate}}</span>
          </el-form-item>
          <el-form-item label="患者姓名">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="患者主诉">
            <span>{{ props.row.initDescription }}</span>
          </el-form-item>
          <el-form-item label="性别">
            <span>{{ props.row.gender }}</span>
          </el-form-item>
          <el-form-item label="出生日期">
            <span>{{ props.row.bornDate }}</span>
          </el-form-item>
          <el-form-item label="身高(cm)">
            <span>{{ props.row.height }}</span>
          </el-form-item>
          <el-form-item label="体重(kg)">
            <span>{{ props.row.weight }}</span>
          </el-form-item>
          <el-form-item label="心率(次/分钟)">
            <span>{{ props.row.heartRate }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="预约日期" prop="time" :formatter="dateFormat1">
    </el-table-column>
    <el-table-column label="预约时间" prop="time" :formatter="dateFormat2">
    </el-table-column>
    <el-table-column label="患者姓名" prop="name"> </el-table-column>
    <el-table-column
      label="患者主诉"
      prop="initDescription"
      :show-overflow-tooltip="true"
    >
    </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          @click="handleEdit(scope.$index, scope.row)"
          size="mini"
          placeholder="输入关键字搜索"
        />
      </template>
      <template slot-scope="scope">
      <el-button size="mini" type="primary" @click="goConsult(scope.row)"
        >前往问诊界面</el-button
      ></template>
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
      ID: window.sessionStorage.getItem("userID"),
      tableData: [],
      search: "",
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 20, // 每页的数据条数
    };
  },
  filters: {
    formatDate(time) {
      time = Number(time);
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    loadData() {
      this.axios({
        url: "/doctor-service/doctorGetAcceptedRequest/" + this.ID,
        method: "get",
        params: {
          id: this.ID,
        },
      })
        .then((response) => {
          console.log(response.data);
          this.tableData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

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
      time = Number(time);
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    //  格式化日期
    dateFormat2(row, column) {
      let time = row[column.property];
      if (time == undefined) {
        return "";
      }
      time = Number(time);
      var date = new Date(time);
      return formatDate(date, "hh:mm:ss");
    },
    goConsult(data) {
      // console.log("data.time" + data.time);
      var strtime = Number(data.time);
      // console.log("strtime" + strtime);
      var date1 = new Date(strtime);
      // console.log("date1" + date1);
      var date2 = new Date();
      // console.log("date2" + date2);
      if (date1 < date2) {
        // console.log(window.sessionStorage.getItem('userID'))
        this.$store.commit("editPatientId",data.id);
        this.$store.commit(
          "editDoctorId",
          window.sessionStorage.getItem("userID")
        );
        console.log("this.$store.state.inquiry.patientId");
        console.log(this.$store.state.inquiry.patientId);
        console.log("this.$store.state.inquiry.doctorId");
        console.log(this.$store.state.inquiry.doctorId);
        this.$router.push("/doctorchat");
      } else
        this.$confirm("时间未到，聊天室还未开启！", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
