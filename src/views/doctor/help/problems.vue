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
          <el-form-item label="解答">
            <span>{{ props.row.problemAnswer }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="问题名称" prop="problemContent"> </el-table-column>
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
      tableData: [],
      search: "",
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 20, // 每页的数据条数
    };
  },
  methods: {
    //加载问题列表
    loadData() {
      this.axios({
        url: "./pmservice/getAllProblem",
        method: "get",
        params: {
        },
      })
        .then((response) => {
          this.tableData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
