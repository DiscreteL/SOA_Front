<template>
  <div class="feedbackForm">
    <div class="form" style="margin-top: 15px">
      <el-table
        ref="filterTable"
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
      >
        <el-table-column
          prop="time"
          label="反馈日期"
          sortable
          width="200"
          column-key="time"
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="反馈内容"
          width="500"
        >
        </el-table-column>
        <el-table-column
          prop="reply"
          label="反馈回复"
          width="500"
        >
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
      ID: window.sessionStorage.getItem("userID"),
      tableData: [],
      currentPage: 1, // 当前页码
      total: 10, // 总条数
      pageSize: 10,
    };
  },
  methods: {
    loadData() {
      this.axios({
        url: "./pmservice/getPatientFeedback/" + this.ID,
        method: "get",
        params: {
          id:this.ID
        },
      })
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
          this.tableData.push({
            reply: response.data[i].reply,
            content: response.data[i].content,
            time: response.data[i].time.substring(0,10)
          });
        }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterStatus(value, row) {
      return row.status === value;
    },
    filterLabel(value, row) {
      return row.label === value;
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

<style scoped>
.feedbackForm {
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
