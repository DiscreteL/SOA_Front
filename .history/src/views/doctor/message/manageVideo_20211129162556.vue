<template>
  <div class="videoForm">
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
          label="上传日期"
          sortable
          width="150"
          column-key="date"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="审核状态"
          width="120"
          :filters="[
            { text: '等待审核', value: '等待审核' },
            { text: '通过审核', value: '通过审核' },
            { text: '未通过审核', value: '未通过审核' },
          ]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === '未通过审核' ? 'danger' : 'success'"
              disable-transitions
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="视频标题"
          width="500"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="label"
          label="标签"
          width="120"
          :filters="[
            { text: '疾病科普', value: '疾病科普' },
            { text: '生活常识', value: '生活常识' },
            { text: '养生妙招', value: '养生妙招' },
            { text: '其他', value: '其他' },
          ]"
          :filter-method="filterLabel"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag :type="primary" disable-transitions>
              {{ scope.row.label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="链接地址"
          :show-overflow-tooltip="true"
          prop="content"
        >
          <el-link type="primary">点击查看</el-link>
        </el-table-column>
        <el-table-column label="操作">
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
          status: "等待审核",
          title: "过敏性哮喘患者在饮食上有什么禁忌？",
          label: "生活常识",
          content: "",
        },
        {
          date: "2021-05-04",
          status: "未通过审核",
          title: "小儿支气管炎，别怕！六招教你如何护理！",
          label: "生活常识",
          content: ""
        },
        {
          date: "2021-05-01",
          status: "通过审核",
          title: "新生儿黄疸要注意！你知道引起黄疸的真正原因吗？",
          label: "疾病科普",
          content: ""
        },
        {
          date: "2020-05-03",
          status: "通过审核",
          title: "新生儿黄疸护理方法出来啦，一起来学学吧",
          label: "其他",
          content: ""
        },
        {
          date: "2020-05-03",
          status: "未通过审核",
          title: "小儿先天性膈疝临床表现有哪些",
          label: "疾病科普",
          content: ""
        },
        {
          date: "2020-05-03",
          status: "通过审核",
          title: "小儿慢性肾衰如何治疗，需要注意什么",
          label: "疾病科普",
          content: ""
        },
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
.videoForm {
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
