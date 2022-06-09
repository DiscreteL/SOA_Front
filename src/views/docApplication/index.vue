<template>
  <div class="docAppForm">
    <div class="appForm" style="margin-top: 15px">
      <el-table
        ref="multipleTable"
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="100"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100">
        </el-table-column>
        <el-table-column
          prop="hospital"
          label="工作单位"
          width="200"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column prop="title" label="职称" width="100">
        </el-table-column>
        <el-table-column
          prop="description"
          label="申请陈述"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column label="查看">
          <template slot-scope="scope">
            <el-button size="mini" @click="loadDocInfo(scope.row)"
              >查看详情</el-button
            >
            <el-dialog title="申请人详情" :visible.sync="dialogTableVisible">
              <el-table :data="docInfo">
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="用户ID" prop="id"></el-table-column>
                <el-table-column
                  label="身份证号"
                  prop="IDNum"
                ></el-table-column>
                <el-table-column label="性别" prop="gender"></el-table-column>
                <el-table-column label="邮箱" prop="mail"></el-table-column>
                <el-table-column
                  label="工作单位"
                  prop="hospital"
                ></el-table-column>
                <el-table-column
                  label="所属科室"
                  prop="department"
                ></el-table-column>
                <el-table-column label="职称" prop="title"></el-table-column>
                <el-table-column
                  label="工作经验"
                  prop="workLength"
                ></el-table-column>
                <el-table-column
                  label="执业医师资格证书编号"
                  prop="certificationNum"
                ></el-table-column>
                <el-table-column label="证明文件" prop="url">
                  <template slot-scope="scope">
                    <!-- 点击进行响应弹出通告具体界面-->
                    <span @click="getDetail(scope.row)" styLe="cursor: pointer">
                      <a class="link">{{ scope.row.url }}</a>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="申请陈述"
                  prop="docIntro"
                ></el-table-column>
              </el-table>
            </el-dialog>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="margin-left: 20px"
              @click="toOperate(scope.row)"
              >处理</el-button
            >
            <el-dialog title="申请处理" :visible.sync="dialogFormVisible">
              <el-form ref="form" :model="form" style="width: 100%">
                <el-form-item label="处理结果" :label-width="formLabelWidth">
                  <el-radio v-model="form.result" label="1">通过</el-radio>
                  <el-radio v-model="form.result" label="0">拒绝</el-radio>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handle(opDoctorID)"
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
      docInfo: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      formData: new FormData(), //表单提交的数据
      form: {
        result: "",
      },
      formLabelWidth: "120px",
      opDoctorID: "",
    };
  },

  methods: {
    //加载医生申请信息列表
    loadData() {
      this.axios({
        url: "pimservice/getDoctorList",
        method: "get",
        params: {},
      }).then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (!response.data[i].isCertified) {
            this.tableData.push({
              id: response.data[i].id,
              // date: response.data[i].date,
              // status: response.data[i].status,
              name: response.data[i].name,
              hospital: response.data[i].hospital,
              description: response.data[i].docIntro,
              title: response.data[i].title,
              department: response.data[i].department,
            });
          }
        }
      });
    },

    loadDocInfo(row) {
      console.log(row);
      this.dialogTableVisible = true;
      this.docInfo = undefined;
      this.docInfo = new Array();
      this.axios({
        url: "pimservice/getDoctorInfor/" + row.id,
        method: "get",
      })
        .then((response) => {
          this.docInfo.push({
            id: response.data.id,
            name: response.data.name,
            IDNum: response.data.idNum,
            gender: response.data.gender,
            mail: response.data.email,
            hospital: response.data.hospital,
            title: response.data.title,
            department: response.data.department,
            workLength: response.data.workLength,
            certificationNum: response.data.certificationNum,
            url: response.data.certiProof,
            docIntro: response.data.docIntro,
            // "audit":response.data.audit===0?"未审核":"已审核"
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

    handle(row) {
      let opinion;
      if(this.form.result==0) opinion='2';
      else opinion='1';
      this.axios({
        url: "/pimservice/auditDoctor",
        method: "post",
        data: { id: row, isCertified: opinion },
      })
        .then((response) => {
          if (response.data === true) {
            this.$refs.form.resetFields();
            this.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: "处理成功",
            });
            // location.reload();
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
    },

    toOperate(row) {
      this.dialogFormVisible = true;
      this.opDoctorID = row.id;
    },

    getDetail(mes) {
      window.open(mes.url)
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
