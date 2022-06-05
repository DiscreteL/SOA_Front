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
          <el-form-item label="问诊时间" >
            <span>{{ props.row.time }}</span>
          </el-form-item>
          <el-form-item label="患者姓名">
            <span>{{ props.row.patientName }}</span>
          </el-form-item>
          <el-form-item label="疾病名称">
            <span>{{ props.row.diseaseName }}</span>
          </el-form-item>
          <el-form-item label="诊断内容">
            <span>{{ props.row.diagContent }}</span>
          </el-form-item>
          <el-form-item label="药品">
            <span>{{ props.row.medicine }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="问诊时间" prop="time" :formatter="dateFormat" sortable> </el-table-column>
    <el-table-column label="患者姓名" prop="patientName"> </el-table-column>
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
  methods: {
      dateFormat(row, column) {
      let time = row[column.property];
      if (time == undefined) {
        return "";
      }
     return time.substring(0,10)+' '+time.substring(11,19);
    },
    loadData() {
      this.axios({
        url: "./oiservice/doctorGetAllRecord/" + this.ID,
        method: "get",
        params: {
          doctorID: this.ID,
        },
      })
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].time=response.data[i].time.substring(0,10)+' '+response.data[i].time.substring(11,19)
          }
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
  },

  mounted() {
    this.loadData();
  },
};
</script>
