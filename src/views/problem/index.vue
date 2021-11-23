<template>
  <div class="problemForm">
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
          label="添加时间"
          sortable
          width="150"
          column-key="time"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="问题"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="answer"
          label="解答"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="操作">
          <el-button size="mini" @click="dialogTableVisible = true"
            >查看详情</el-button
          >
          <el-dialog title="问题详情" :visible.sync="dialogTableVisible">
            <el-descriptions direction="vertical" :column="4" border>
              <el-descriptions-item label="问题" :span="4">无法编辑个人资料</el-descriptions-item>
              <el-descriptions-item label="添加时间" :span="4">2016-05-02</el-descriptions-item>
              <el-descriptions-item label="解答" :span="4">退出重新登录</el-descriptions-item>
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
          date: "2016-05-02",
          name: "无法编辑个人资料",
          answer: "退出重新登录",
        },
        {
          date: "2016-05-04",
          name: "无法编辑个人资料",
          answer: "退出重新登录",
        },
        {
          date: "2016-05-01",
          name: "无法编辑个人资料",
          answer: "退出重新登录",
        },
        {
          date: "2016-05-03",
          name: "无法编辑个人资料",
          answer: "退出重新登录",
        },
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 20, // 每页的数据条数
      form: {
          reason: '',
          region: 0,
          delivery: false
        },
        formLabelWidth: '120px'
    };
  },
  methods: {
    del() {
        this.$alert('确定要删除此问题吗', '删除', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'success',
              message: '已成功删除'
            });
          }
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
