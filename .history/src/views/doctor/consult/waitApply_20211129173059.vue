<template>
  <div class="applyForm">
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
          label="预约日期"
          sortable
          width="150"
          column-key="date"
        >
        </el-table-column>
        <el-table-column
          prop="time" 
          label="预约时间"
          width="150"
        >
        </el-table-column>
        <el-table-column prop="name" label="患者姓名" width="100">
        </el-table-column>
        <el-table-column
          prop="description"
          label="症状描述"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="操作">
          <el-button size="mini" @click="dialogTableVisible = true"
            >查看详情</el-button
          >
          <el-dialog title="申请信息" :visible.sync="dialogTableVisible">
            <el-descriptions direction="vertical" :column="4" border>
              <el-descriptions-item label="姓名">AAA</el-descriptions-item>
              <el-descriptions-item label="性别">男</el-descriptions-item>
              <el-descriptions-item label="执业医师资格证编号"
                >123456789</el-descriptions-item
              >
              <el-descriptions-item label="身份证号"
                >9876543210000</el-descriptions-item
              >
              <el-descriptions-item label="工作单位" :span="4"
                >上海市第一医院</el-descriptions-item
              >
              <el-descriptions-item label="科室" :span="2"
                >皮肤科</el-descriptions-item
              >
              <el-descriptions-item label="职称">主任医师</el-descriptions-item>
              <el-descriptions-item label="资格证书证明">
                <el-link type="primary">查看文件</el-link>
              </el-descriptions-item>
              <el-descriptions-item label="申请陈述" :span="4"
                >我有十年工作经验</el-descriptions-item
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
          <el-dialog title="申请处理" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="处理结果" :label-width="formLabelWidth">
                <el-select v-model="form.result" placeholder="请选择处理结果">
                  <el-option label="通过申请" value=1></el-option>
                  <el-option label="拒绝申请" value=2></el-option>
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
          date: "2021-05-02",
          time: "15:00",
          name: "AAA",
          description: "头疼持续一周",
        },
        {
          date: "2021-05-04",
          time: "9:00",
          name: "BBB",
          description: "头晕乏力",
        },
        {
          date: "2021-05-02",
          time: "16:00",
          name: "CCC",
          description: "胃疼",
        },
        {
          date: "2021-05-03",
          time: "12:00",
          name: "DDD",
          description: "跑完800米之后恶心",
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
    formatter(row, column) {
      return row.hospital;
    },
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
.applyForm {
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
