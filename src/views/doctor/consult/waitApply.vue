<template>
  <div class="docAppForm">
    <div class="appForm" style="margin-top: 15px">
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
      >
        <el-table-column prop="reserveNum" label="预约编号" width="200">
        </el-table-column>
        <el-table-column prop="patientID" label="患者ID" width="100">
        </el-table-column>
        <el-table-column prop="time" label="预约时间" width="100">
        </el-table-column>
        <el-table-column
          prop="InitDescription"
          label="患者主诉"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column label="查看">
          <template slot-scope="scope">
            <el-button size="mini" @click="loadPatientInfo(scope.row)"
              >查看详情</el-button
            >

            <el-dialog title="预约人详情" :visible.sync="dialogTableVisible">
              <el-table :data="patientInfo">
                <el-table-column
                  label="患者姓名"
                  prop="patientName"
                ></el-table-column>
                <el-table-column label="预约时间" prop="time"></el-table-column>
                <el-table-column
                  label="出生日期"
                  prop="bornDate"
                ></el-table-column>
                <el-table-column label="性别" prop="gender"></el-table-column>
                <el-table-column label="身高" prop="height"></el-table-column>
                <el-table-column label="体重" prop="weight"></el-table-column>
                <el-table-column
                  label="心率"
                  prop="heartRate"
                ></el-table-column>
                <el-table-column
                  label="患者主诉"
                  prop="initDescription"
                ></el-table-column>
              </el-table>
            </el-dialog>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleAccept(scope.row)"
              >接受
            </el-button>
          </template>
        </el-table-column>

        <el-table-column>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="margin-left: 20px"
              @click="handleRefuse(scope.row)"
              >拒绝
            </el-button>
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
      patientInfo: [],
      dialogTableVisible: false,
      currentPage: 1, // 当前页码
      total: 10, // 总条数
      pageSize: 10, // 每页的数据条数
      formData: new FormData(), //表单提交的数据
    };
  },

  methods: {
    //加载申请信息列表
    loadData() {
      this.axios({
        url: "./oiservice/getDoctorRequests/" + this.ID,
        method: "get",
        params: {
          id: this.ID,
        },
      }).then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if(response.data[i].bookingRequest.status===0)
          this.tableData.push({
            reserveNum: response.data[i].bookingRequest.reserveNum,
            patientID: response.data[i].bookingRequest.patientID,
            time: response.data[i].bookingRequest.time,
            initDescription: response.data[i].bookingRequest.initDescription,
          });
        }
      });
    },

    loadPatientInfo(row) {
      this.dialogTableVisible = true;
      this.patientInfo = undefined;
      this.patientInfo = new Array();
      this.axios({
        url: "./oiservice/getRequest/" + row.reserveNum,
        method: "get",
        params: {
          id: row.reserveNum,
        },
      })
        .then((response) => {
          this.patientInfo.push({
            patientID: response.data.id,
            patientName: response.data.name,
            time: response.data.time,
            gender: response.data.gender,
            bornDate: response.data.bornDate,
            height: response.data.height,
            weight: response.data.weight,
            heartRate: response.data.heartRate,
            initDescription: response.data.initDescription,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

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

    handleAccept(row) {
      this.formData = new FormData();
      this.formData.append("id", row.reserveNum);
      this.axios({
        url: "./oiservice/doctorAcceptRequest",
        method: "post",
        data: this.formData,
      })
        .then((response) => {
          if (response.data === true) {
            this.$message({
              type: "success",
              message: "处理成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "处理失败！",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "处理失败！",
          });
        });
      this.formData = new FormData();
    },

    handleRefuse(row) {
      this.formData = new FormData();
      this.formData.append("id", row.reserveNum);
      this.$prompt("请输入拒绝理由", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.formData.append("content", value);
          this.axios({
            url: "./oiservice/doctorRefuseRequest",
            method: "post",
            data: this.formData,
          })
            .then((response) => {
              if (response.data === true) {
                this.$refs.form.resetFields();
                this.dialogFormVisible = false;
                this.$message({
                  type: "success",
                  message: "处理成功",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "处理失败！",
                });
              }
            })
            .catch(() => {
              this.$message({
                type: "error",
                message: "处理失败！",
              });
            });
          this.formData = new FormData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作取消",
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
.docAppForm {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.appForm {
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
