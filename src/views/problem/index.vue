<template>
  <div class="problemForm">
    <div class="form" style="margin-top: 15px">
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
      >
        <el-table-column
          prop="problemContent"
          label="问题"
          :show-overflow-tooltip="false"
        >
        </el-table-column>
        <el-table-column
          prop="problemAnswer"
          label="解答"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="操作">
          <el-button size="mini" @click="dialogTableVisible = true" style="margin-left: 20px"
            >查看详情</el-button
          >
          <el-dialog title="问题详情" :visible.sync="dialogTableVisible">
            <el-descriptions direction="vertical" :column="4" border>
              <el-descriptions-item label="问题" prop="problemContent" :span="4"></el-descriptions-item>
              <el-descriptions-item label="解答" prop="problemAnswer" :span="4"></el-descriptions-item>
            </el-descriptions>
          </el-dialog>
          <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            style="margin-left: 20px"
            @click="del(scope.row)"
            >删除</el-button
          >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        align="center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 20, // 每页的数据条数
    };
  },
  methods: {
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

    del(row) {
        this.$confirm("确定要删除此问题吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteProblem(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作取消",
          });
        });
      },

      deleteProblem(data) {
      this.axios({
        url: "./pmservice/deleteProblem/"+data.problemContent,
        method: "delete"
      })
        .then(() => {
          this.tableData.splice(data, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "删除失败! 请稍后再试",
          });
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
  }
};
</script>

<style scoped>
.problemForm {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.form {
  float: left;
  width: 100%;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.block {
  float: left;
  width: 100%;
  position: fixed;
  bottom: 75px;
}
</style>
