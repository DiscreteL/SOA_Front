<template>
  <el-table
    :data="
      tableData.filter(
        (data) =>
          !search || data.title.toLowerCase().includes(search.toLowerCase())
      )
    "
    style="width: 100%"
  >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="标题">
            <span>{{ props.row.title }}</span>
          </el-form-item>
          <el-form-item label="作者">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="收藏时间">
            <span>{{ props.row.time | formatDate }}</span>
          </el-form-item>
          <el-form-item label="分类标签">
            <span>{{ props.row.label }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="收藏时间" prop="time" :formatter="dateFormat">
    </el-table-column>
    <el-table-column label="标题" prop="title"> </el-table-column>
    <el-table-column label="作者" prop="name"> </el-table-column>
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
        <el-button size="mini" @click="more(scope.row)"
          >查看全文</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="deleteCollect(scope.row)"
          >取消收藏</el-button
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
import moment from "moment";
import { formatDate } from "@/utils/date.js";
export default {
  data() {
    return {
      tableData: [],
      search: "",
      store: {
        id: "",
      },
    };
  },
  created() {
    this.gettableData();
  },
  filters: {
    formatDate(time) {
      // time=Number(time);
      // console.log(time);
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
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
        .get("patient-service/getAllTweetCollection/" + this.store.id)
        .then(function (res) {
          console.log("gettabledata.res.data:");
          console.log(res.data);
          _this.tableData = res.data;
        })
        .catch(function (error) {
          console.log("Get Nothing!" + error);
        });
    },
    more(data){
      window.open(data.url)
    },
    dateFormat(row, column) {
      const date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD");
    },
    deleteCollect(data) {
      this.store.id = window.sessionStorage.getItem("userID");
      this.axios
        .delete(
          "patient-service/deleteTweetCollection/" + data.id + "/" + this.store.id
        )
        .then((res) => {
          console.log("res.data:");
          console.log(res.data);
          if (res.data === true)
            this.$message({
              message: "取消成功",
              type: "success",
            });
        })
        .catch((err) => {
          console.log(err);
        });
      this.$router.push({
        path: "/articleempty",
      });
    },
  },
};
</script>
