<template>
  <div class="messageForm">
    <div class="form1" style="margin-top: 15px">
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
      >
        <el-table-column
          prop="time"
          label="上传时间"
          sortable
          width="300"
          column-key="date"
        >
        </el-table-column>
        <el-table-column
          prop="audit"
          label="审核状态"
          width="150"
          :filters="[
            { text: '等待审核', value: 0 },
            { text: '已审核', value: 1 },
          ]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.audit === 0 ? 'primary' : 'success'"
              disable-transitions
            >
              {{ scope.row.audit === 0 ? "等待审核" : "已审核" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="400"
        ></el-table-column>
        <el-table-column label="操作">
          <el-button
            size="mini"
            @click="dialogTableVisible = true"
            style="margin-left: 20px"
            >查看详情</el-button
          >
          <el-dialog title="推文详情" :visible.sync="dialogTableVisible">
            <el-descriptions direction="vertical" :column="4" border>
              <el-descriptions-item
                label="标题"
                prop="title"
                :span="4"
              ></el-descriptions-item>
              <el-descriptions-item
                label="上传时间"
                prop="time"
                :span="4"
              ></el-descriptions-item>
              <el-descriptions-item
                label="状态"
                prop="audit"
                :span="4"
              ></el-descriptions-item>
              <el-descriptions-item
                label="标签"
                prop="label"
                :span="4"
              ></el-descriptions-item>
              <el-descriptions-item
                label="内容"
                prop="content"
                :span="4"
              ></el-descriptions-item>
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
      ID: window.sessionStorage.getItem("userID"),
      tableData: [],
      dialogTableVisible: false,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 20, // 每页的数据条数
    };
  },

  methods: {
    loadData() {
      this.axios({
        url: "api/doctor-service/getDoctorTweet/" + this.ID,
        method: "get",
        params: {
          id: this.ID,
        },
      })
        .then((response) => {
          this.tableData = response.data;
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
    filterType(value, row) {
      return row.type === value;
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

    del(row) {
      this.$confirm("确定要删除此推文吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteTweet(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作取消",
          });
        });
    },

    deleteTweet(data) {
      this.axios({
        url: "/" + data.title,
        method: "delete",
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
  },

  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
.messageForm {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.form1 {
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
