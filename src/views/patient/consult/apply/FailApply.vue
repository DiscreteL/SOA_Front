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
            <span v-if="props.row.status == 2">已拒绝</span>
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
        <el-tag v-if="scope.row.status == 2" type="danger" size="mini"
          >已拒绝</el-tag
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
      <el-button slot-scope="scope" size="mini" @click="ViewReason(scope.row)"
        >查看原因</el-button
      >
      <el-dialog title="拒绝原因" :visible.sync="dialogFormVisible" :append-to-body="true">
        {{ this.currentrow }}
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
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
      dialogFormVisible: false,
      store: {
        id: "",
      },
      currentrow:'',
    };
  },
  filters: {
    formatDate(time) {
      if (time == undefined) {
        return "";
      }
      return time.substring(0,10)+' '+time.substring(11,19);
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
            if(i.bookingRequest.status==2)
            _this.tableData.push({
              time:i.bookingRequest.time,
              name:i.doctor.name,
              status:i.bookingRequest.status,
              initDescription:i.bookingRequest.initDescription,
              rejectionReason:i.bookingRequest.rejectionReason,
            })
          }
          //0待接收 1接受 2拒绝 3已完成
        })
        .catch(function (error) {
          console.log("Get Nothing!" + error);
        });
    },
    ViewReason(data){
      console.log("this.scope.row")
      console.log(data.rejectionReason)
      this.dialogFormVisible=true;
      this.currentrow=data.rejectionReason;
      console.log(this.currentrow)
    }
  },
};
</script>
