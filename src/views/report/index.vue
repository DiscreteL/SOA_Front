<template>
  <div class="messageForm">
    <div class="form1" style="margin-top: 15px">
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
      >
        <el-table-column prop="time" label="反馈时间" sortable width="300">
        </el-table-column>

        <el-table-column prop="id" label="用户ID" width="120"></el-table-column>
        <el-table-column
          prop="content"
          label="反馈内容"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="reply"
          label="反馈回复"
          width="200"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="margin-left: 20px"
              @click="toOperate(scope.row)"
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
                <el-button type="primary" @click="handle(opTweetID)"
                  >确 定</el-button
                >
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
        :page-sizes="[1, 5, 10]"
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
      pageSize: 5, // 每页的数据条数
      form: {
        reply: "",
      },
      formLabelWidth: "120px",
      opTweetID: "",
      identityC: 0,
      timeC: "",
      contentC: "",
    };
  },

  methods: {
    loadData() {
      this.axios({
        url: "./pmservice/getAllDoctorFeedback",
        method: "get",
        params: {},
      })
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.tableData.push({
              id: response.data[i].doctorID,
              time:response.data[i].time.substring(0,10)+' '+response.data[i].time.substring(11,19),
              reply: response.data[i].reply,
              content: response.data[i].content,
              identity: 1,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });

      this.axios({
        url: "./pmservice/getAllPatientFeedback",
        method: "get",
        params: {},
      })
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.tableData.push({
              id: response.data[i].patientID,
              time: response.data[i].time.substring(0,10)+' '+response.data[i].time.substring(11,19),
              reply: response.data[i].reply,
              content: response.data[i].content,
              identity: 2,
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

    toOperate(row) {
      this.dialogFormVisible = true;
      this.opTweetID = row.id;
      if (row.identity == 1) {
        (this.identityC = 1),
          (this.timeC = row.time),
          (this.contentC = row.content);
      }
      if (row.identity == 2) {
        this.identityC = 2;
        (this.timeC = row.time), (this.contentC = row.content);
      }
    },

    handle(row) {
      if (this.identityC == 1) {
        this.axios({
          url: "./pmservice/replyDoctorFeedback",
          method: "post",
          data: {
            time: this.timeC,
            content: this.contentC,
            reply: this.form.reply,
            doctorID: row,
          },
        })
          .then((response) => {
            if (response.data === true) {
              location.reload();
              (this.opTweetID = ""),
                (this.identityC = 0),
                (this.timeC = ""),
                (this.contentC = "");
              this.$refs.form.resetFields();
              this.dialogFormVisible = false;
              this.$message({
                type: "success",
                message: "处理成功",
              });
            } else {
              (this.opTweetID = ""),
                (this.identityC = 0),
                (this.timeC = ""),
                (this.contentC = "");
              this.$message({
                type: "error",
                message: "处理失败！",
              });
            }
          })
          .catch(() => {
            (this.opTweetID = ""),
              (this.identityC = 0),
              (this.timeC = ""),
              (this.contentC = "");
            this.$message({
              type: "error",
              message: "处理失败！",
            });
          });
      } else if (this.identityC == 2) {
        this.axios({
          url: "./pmservice/replyPatientFeedback",
          method: "post",
          data: {
            time: timeC,
            content: contentC,
            reply: this.form.reply,
            doctorID: row,
          },
        })
          .then((response) => {
            if (response.data === true) {
              (this.opTweetID = ""),
                (this.identityC = 0),
                (this.timeC = ""),
                (this.contentC = "");
              location.reload();
              this.$refs.form.resetFields();
              this.dialogFormVisible = false;

              this.$message({
                type: "success",
                message: "处理成功",
              });
            } else {
              (this.opTweetID = ""),
                (this.identityC = 0),
                (this.timeC = ""),
                (this.contentC = "");
              this.$message({
                type: "error",
                message: "处理失败！",
              });
            }
          })
          .catch(() => {
            (this.opTweetID = ""),
              (this.identityC = 0),
              (this.timeC = ""),
              (this.contentC = "");
            this.$message({
              type: "error",
              message: "处理失败！",
            });
          });
      }
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
