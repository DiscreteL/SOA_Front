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
          label="反馈时间"
          sortable
          width="300"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="audit"
          label="处理状态"
          width="80"
          :filters="[
            { text: '未处理', value: 0 },
            { text: '已处理', value: 1 },
          ]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.audit === 0 ? 'primary' : 'success'"
              disable-transitions
            >
              {{ scope.row.audit === 0 ? '未处理' : '已处理' }}
            </el-tag>
          </template>
        </el-table-column> -->
        <el-table-column prop="id" label="用户ID" width="120"></el-table-column>
        <el-table-column prop="content" label="反馈内容" width="200"></el-table-column>
        <el-table-column prop="reply" label="反馈回复" width="200"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            style="margin-left: 20px"
            @click="dialogFormVisible = true"
            >处理</el-button
          >
                   
          <el-dialog title="反馈处理" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" style="width: 100%">
              <el-form-item label="回复内容" :label-width="formLabelWidth">
                <el-input v-model="form.reply" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submit(scope.row)">确 定</el-button>
            </div>
          </el-dialog>
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
      dialogFormVisible: false,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 20, // 每页的数据条数
      formData: new FormData(), //表单提交的数据
      form: {
          reply: ''
        },
        formLabelWidth: '120px'
    };
  },

  methods: {
    loadData() {
      this.axios({
        url: "api/admin-and-problem-service/getAllDoctorFeedback",
        method: "get",
        params: {
        },
      })
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
          this.tableData.push({
            id: response.data[i].doctorID,
            time: response.data[i].time,
            reply: response.data[i].reply,
            content: response.data[i].content,
          });
        }
        })
        .catch((error) => {
          console.log(error);
        });

      this.axios({
        url: "api/admin-and-problem-service/getAllPatientFeedback",
        method: "get",
        params: {
        },
      })
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
          this.tableData.push({
            id: response.data[i].patientID,
            time: response.data[i].time,
            reply: response.data[i].reply,
            content: response.data[i].content,
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

    // submit(row) {
    //   this.formData.append("id", row.id);
    //   data.append("result", this.form.result);
    //   data.append("reply", this.form.reply);
    //   this.axios({
    //     url: "/admin-and-problem-service/auditTweet"+row.id,
    //     method: "post",
    //     data: this.formData,
    //   })
    //     .then((response) => {
    //       if (response.data === true) {
    //         this.$refs.form.resetFields();
    //         this.dialogFormVisible = false;
    //         this.$message({
    //           type: "success",
    //           message: "处理成功",
    //         });
    //       } else {
    //         this.$message({
    //           type: "error",
    //           message: "处理失败！",
    //         });
    //       }
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "error",
    //         message: "处理失败！",
    //       });
    //     });
    //     this.formData = new FormData();
    // },

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
