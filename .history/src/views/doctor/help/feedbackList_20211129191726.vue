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
          prop="date"
          label="反馈日期"
          sortable
          width="150"
          column-key="date"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="120"
          :filters="[
            { text: '等待回复', value: '等待回复' },
            { text: '已回复', value: '已回复' }
          ]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === '等待回复' ? 'primary' : 'success'"
              disable-transitions
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="反馈内容"
          width="500"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="操作">
            <el-button size="mini" @click="dialogTableVisible = true"
            >查看详情</el-button
          >
          <el-dialog :visible.sync="dialogTableVisible">
            <el-descriptions
              title="反馈内容详情"
              direction="vertical"
              :column="4"
              border
            >
              <el-descriptions-item label="反馈提交时间"
                >2021-05-02</el-descriptions-item
              >
              <el-descriptions-item label="状态">
                <el-tag size="small" type="success">已回复</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="相关文件" :span="2">
                  <el-link href="https://element.eleme.io" type="primary" >点击下载</el-link>
             </el-descriptions-item>
             <el-descriptions-item label="回复内容" :span="4"
                >感谢您的反馈！现已对bug进行了修复！</el-descriptions-item
              >
            </el-descriptions>
          </el-dialog>
          <el-button
            size="mini"
            type="danger"
            style="margin-left: 20px"
            @click="del"
            >删除</el-button
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
      tableData: [
        {
          date: "2021-05-02",
          status: "已回复",
          content: "个人信息界面中的“编辑”按钮点击后没有反应",
        },
        {
          date: "2021-07-03",
          status: "等待回复",
          content: "个人信息界面中的“编辑”按钮点击后没有反应",
        },
        {
          date: "2021-10-13",
          status: "等待回复",
          content: "个人信息界面中的“编辑”按钮点击后没有反应",
        },
        {
          date: "2021-05-01",
          status: "已回复",
          content: "个人信息界面中的“编辑”按钮点击后没有反应",
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 20, // 每页的数据条数
      form: {
        reason: "",
        region: 0,
        delivery: false,
      },
      formLabelWidth: "120px",
      formArticle: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
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
    del() {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    onSubmit() {
      console.log("submit!");
    },
    clear() {
      this.$refs.form.resetFields();
    },
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
