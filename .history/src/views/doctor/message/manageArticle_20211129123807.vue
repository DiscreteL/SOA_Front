<template>
  <div class="reportForm">
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
          width="80"
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
          prop="content"
          label="反馈内容"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="操作">
          <el-button size="mini" @click="dialogTableVisible = true"
            >查看详情</el-button
          >
          <el-dialog title="反馈信息" :visible.sync="dialogTableVisible">
            <el-descriptions direction="vertical" :column="4" border>
              <el-descriptions-item label="用户id">123456789</el-descriptions-item>
              <el-descriptions-item label="反馈时间">2016-05-02</el-descriptions-item>
              <el-descriptions-item label="反馈内容"
                >页面闪退</el-descriptions-item
              >
              <el-descriptions-item label="处理结果"
                >NULL</el-descriptions-item
              >
            </el-descriptions>
          </el-dialog>
          <el-button
            size="mini"
            type="danger"
            style="margin-left: 20px"
            @click="dialogFormVisible = true"
            >处理</el-button
          >
          <el-dialog title="反馈处理" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="处理结果" :label-width="formLabelWidth">
                <el-input v-model="form.reply" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
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
          status: "等待审核",
          id: '123456789',
          content: '页面闪退'
        },
        {
          date: "2016-05-04",
          status: "未通过审核",
          id: '123456789',
          content: '页面闪退'
        },
        {
          date: "2016-05-01",
          status: "通过审核",
          id: '123456789',
          content: '页面闪退'
        },
        {
          date: "2016-05-03",
          status: "未通过审核",
          id: '123456789',
          content: '页面闪退'
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
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterStatus(value, row) {
      return row.status === value;
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
.reportForm {
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
