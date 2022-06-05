<template>
  <el-table
    :data="
      tableData.filter(
        (data) =>
          !search || data.doctorName.toLowerCase().includes(search.toLowerCase())
      )
    "
    style="width: 100%"
  >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="问诊时间">
            <span>{{ props.row.time | formatDate}}</span>
          </el-form-item>
          <el-form-item label="医生">
            <span>{{ props.row.doctorName }}</span>
          </el-form-item>
          <el-form-item label="诊断">
            <span>{{ props.row.diagContent }}</span>
          </el-form-item>
          <el-form-item label="处方">
            <span>{{ props.row.medicine }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="问诊时间" prop="time" :formatter="dateFormat">
    </el-table-column>
    <el-table-column label="医生" prop="doctorName"> </el-table-column>
    <el-table-column label="疾病名称" prop="diseaseName"> </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          @click="handleEdit(scope.$index, scope.row)"
          size="mini"
          placeholder="输入关键字搜索"
        />
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
import moment from "moment";
import { formatDate } from "@/utils/date.js";

export default {
  data() {
    return {
      tableData: [],
      store: {
        id: "",
      },
      search: "",
    };
  },
  created() {
    this.gettableData();
  },
  filters: {
    formatDate(time) {
        if (time == undefined) {
        return "";
      }
      return time.substring(0,10)+' '+time.substring(11,19);
    },
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
    gettableData() {
      this.store.id = window.sessionStorage.getItem("userID");
      console.log("sessionstorage.id:" + this.store.id);
      let _this = this;
      this.axios
        .get(
          "./oiservice/patientGetAllRecord/" + this.store.id
        )
        .then(function (res) {
          console.log("gettableData.res.data:");
          console.log(res.data);
          _this.tableData = res.data;
        })
        .catch(function (error) {
          console.log("Get Nothing!" + error);
        });
    },
    //  格式化日期
    dateFormat(row, column) {
      const date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD");
    },
  },
};
</script>
