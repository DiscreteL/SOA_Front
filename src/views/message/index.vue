<template>
  <div class="messageForm">
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
          label="处理状态"
          width="80"
          :filters="[
            { text: '未处理', value: '未处理' },
            { text: '已处理', value: '已处理' },
          ]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === '未处理' ? 'primary' : 'success'"
              disable-transitions
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="用户id" width="100"></el-table-column>
        <el-table-column prop="name" label="用户姓名" width="100"></el-table-column>
        <el-table-column
          prop="type"
          label="资讯类型"
          width="80"
          :filters="[
            { text: '文章', value: '文章' },
            { text: '视频', value: '视频' },
          ]"
          :filter-method="filterType"
          filter-placement="bottom-end"
        >
        </el-table-column>
        <el-table-column prop="title" label="标题" width="200"></el-table-column>
        <el-table-column label="操作">
          <el-button size="mini" @click="dialogTableVisible = true"
            >查看详情</el-button
          >
          <el-dialog title="资讯信息" :visible.sync="dialogTableVisible">
            <el-descriptions direction="vertical" :column="4" border>
              <el-descriptions-item label="姓名">AAA</el-descriptions-item>
              <el-descriptions-item label="上传内容">
                <el-link type="primary">查看文件</el-link>
              </el-descriptions-item>
            </el-descriptions>
          </el-dialog>
          <el-button
            size="mini"
            type="danger"
            style="margin-left: 20px"
            @click="dialogFormVisible = true"
            >处理</el-button
          >
          <el-dialog title="申请处理" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="处理结果" :label-width="formLabelWidth">
                <el-select v-model="form.result" placeholder="请选择处理结果">
                  <el-option label="通过" value=1></el-option>
                  <el-option label="拒绝" value=2></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="处理意见" :label-width="formLabelWidth">
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
          name: "AAA",
          status: "未处理",
          id:'123456789',
          type:"文章",
          title:'如何科学养生'
        },
        {
          date: "2016-05-04",
          name: "AAA",
          status: "已处理",
          id:'123456789',
          type:"文章",
          title:'如何科学养生'
        },
        {
          date: "2016-05-01",
          name: "AAA",
          status: "未处理",
          id:'123456789',
          type:"文章",
          title:'如何科学养生'
        },
        {
          date: "2016-05-03",
          name: "AAA",
          status: "未处理",
          id:'123456789',
          type:"视频",
          title:'如何科学养生'
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
  },
};
</script>

<style scoped>
.messageForm {
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
