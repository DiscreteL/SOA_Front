<template>
  <el-card>
    <el-descriptions
      class="margin-top"
      title="基本信息"
      :column="3"
      :size="size"
    >
      <el-descriptions-item label="用户ID">{{ ID }}</el-descriptions-item>

      <el-descriptions-item label="姓名">{{
        userInfo.name
      }}</el-descriptions-item>
      <el-descriptions-item label="性别">
        {{ userInfo.gender }}</el-descriptions-item
      >
      <el-descriptions-item label="身份证号">{{
        userInfo.idnum
      }}</el-descriptions-item>
      <el-descriptions-item label="资格认证状态">
        <el-tag
          size="small"
          :type="userInfo.isCertified === 0 ? 'danger' : 'success'"
          ><span v-if="userInfo.isCertified === 0">未通过</span>
          <span v-if="userInfo.isCertified === 1">已通过</span></el-tag
        >
      </el-descriptions-item>
      <el-descriptions-item label="评分">{{
        userInfo.rating
      }}</el-descriptions-item>
    </el-descriptions>

    <hr />
    <el-descriptions
      class="margin-top"
      title="职业信息"
      :column="3"
      :size="size"
    >
      <template slot="extra">
        <el-button type="primary" size="small" @click="dialog1Visible = true"
          >编辑</el-button
        >
        <el-dialog
          title="编辑信息"
          :visible.sync="dialog1Visible"
          width="50%"
          :before-close="handleClose"
        >
          <el-form ref="form1" :model="form1" label-width="80px">
            <el-form-item label="邮箱地址" required>
              <el-input v-model="form1.mail"></el-input>
            </el-form-item>
            <el-form-item label="个人简介" required>
              <el-input type="textarea" v-model="form1.docIntro"></el-input>
            </el-form-item>
            <span
              style="
                margin-left: 20px;
                font-size: 10px;
                color: rgb(245, 69, 69);
              "
              >注：您的其他职业信息暂时不允许修改，如需修改请重新提交医生资格认证申请</span
            >
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog1Visible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm1">确 定</el-button>
          </span>
        </el-dialog>
      </template>

      <el-descriptions-item label="执业医师资格证编号">{{
        userInfo.certificationNum
      }}</el-descriptions-item>
      <el-descriptions-item label="资格证书证明">
        <el-link type="primary" @click="download">查看文件</el-link>
      </el-descriptions-item>
      <el-descriptions-item label="从业时长">{{
        userInfo.workLength
      }}</el-descriptions-item>
      <el-descriptions-item label="工作单位">{{
        userInfo.hospital
      }}</el-descriptions-item>
      <el-descriptions-item label="科室">{{
        userInfo.department
      }}</el-descriptions-item>
      <el-descriptions-item label="职称">{{
        userInfo.title
      }}</el-descriptions-item>
      <el-descriptions-item label="个人简介">{{
        userInfo.docIntro
      }}</el-descriptions-item>
    </el-descriptions>
    <br />
    <el-descriptions
      class="margin-top"
      title="联系方式"
      :column="3"
      :size="size"
    >
      <el-descriptions-item label="邮箱">{{
        userInfo.mail
      }}</el-descriptions-item>
      >
    </el-descriptions>
  </el-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 返回个人信息
      ID: window.sessionStorage.getItem("userID"),
      userInfo: {},
      dialog1Visible: false,
      form1: {
        docIntro: "",
        mail: "",
      },
    };
  },
  methods: {
    loadData() {
      this.axios({
        url: "api/doctor-service/getInfo/" + this.ID,
        method: "get",
        params: {
          ID: this.ID,
        },
      })
        .then((response) => {
          this.userInfo = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    submitForm1() {
      if (!this.form1.mail) {
        this.$message.error("请输入您的邮箱");
      } else if (!this.form1.docIntro) {
        this.$message.error("请输入您的个人简介");
      } else {
        this.axios
          .post("/doctor-service/changeInfo", {
            id: this.ID,
            name: this.userInfo.name,
            gender: this.userInfo.gender,
            hospital: this.userInfo.hospital,
            title: this.userInfo.title,
            department: this.userInfo.department,
            workLength: this.userInfo.workLength,
            certificationNum: this.userInfo.certificationNum,
            certiProof: this.userInfo.certiProof,
            isCertified: this.userInfo.isCertified,
            opinion: this.userInfo.opinion,
            isActive: this.userInfo.isActive,
            rating: this.userInfo.rating,
            password:this.userInfo.password,
            docIntro: this.form1.docIntro,
            mail: this.form1.mail,
          })
          .then((response) => {
            //后端更新成功
            if (response.data === true) {
              this.$message({
                type: "success",
                message: "编辑成功！",
              });
              this.dialog1Visible = false;
              location.reload();
            }
            //后端更新失败
            else if (response.data === false) {
              this.$message({
                type: "error",
                message: "提交失败，请稍后重试！",
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "error",
              message: "提交失败，请稍后重试！",
            });
          });
      }
    },

    download() {},

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style scoped></style>
