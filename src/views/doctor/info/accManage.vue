<template>
  <el-card>
    <el-descriptions
      class="margin-top"
      title="修改密码"
      :column="3"
      :size="size"
    >
      <template slot="extra">
        <el-button type="primary" size="small">修改</el-button>
      </template>
      <el-descriptions-item label="温馨提示"
        >设置复杂密码更能保护您的账号安全</el-descriptions-item
      >
      >
    </el-descriptions>
    <hr />
    <el-descriptions
      class="margin-top"
      title="账号注销"
      :column="3"
      :size="size"
    >
      <template slot="extra">
        <el-button type="primary" size="small" @click="dialogVisible = true"
          >注销</el-button
        >
        <el-dialog
          title="注销账户"
          :visible.sync="dialogVisible"
          width="50%"
        >
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="确认密码" required>
              <el-input v-model="form.password" show-password></el-input>
            </el-form-item>
            <span
              style="
                margin-left: 20px;
                font-size: 10px;
                color: rgb(245, 69, 69);
              "
              >重要提示：账户一旦注销数据将不可恢复，请务必慎重操作！</span
            >
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
          </span>
        </el-dialog>
      </template>
      <el-descriptions-item label="温馨提示"
        >为保证您的账号安全，需要满足相应的条件，才能提交注销申请</el-descriptions-item
      >
      >
    </el-descriptions>
    <hr />
    <el-button type="primary" size="small" @click="logout"
      >退出当前帐号</el-button
    >
  </el-card>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-card div {
  margin-bottom: 5%;
}
</style>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        password: "",
      },
    };
  },
  methods: {
    logout() {
      // 清空token
      window.sessionStorage.clear();
      this.$router.push("/login");
    },

    submitForm() {
      if (!this.form.password) {
        this.$message.error("请输入密码");
      } else {
        this.axios
          .post("/", {
            id:this.$route.params.id,
            password: this.form.password
          })
          .then((response) => {
            if (response.data === true) {
              this.$message({
                type: "error",
                message: "账户已注销，请重新登录",
              });
              this.dialogVisible = false;
              this.$router.push("/login");
            }
            //后端更新失败
            else if (response.data === false) {
              this.$message({
                type: "error",
                message: "密码错误",
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "error",
              message: "操作失败，请稍后重试！",
            });
          });
      }
    },
  },
};
</script>
