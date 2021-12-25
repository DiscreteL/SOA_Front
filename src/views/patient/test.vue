<template>
  <el-card>
    <el-descriptions class="margin-top" title="修改密码" :column="3">
      <template slot="extra">
        <el-button type="primary" size="small" @click="dialogFormVisible = true"
          >修改</el-button
        >
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
          <el-form :model="userInfo" ref="userInfo" :rules="userInfoRules">
            <!-- 密码 -->
            <el-form-item prop="password" label="密码">
              <el-input
                v-model="userInfo.password"
                prefix-icon="el-icon-lock"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item prop="rePassword" label="确认密码">
              <el-input
                v-model="userInfo.rePassword"
                prefix-icon="el-icon-lock"
                type="password"
                class="length"
                style="width: 110%"
                show-password
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updatePsd('userInfo')"
              >保 存</el-button
            >
          </div>
        </el-dialog>
      </template>
      <el-descriptions-item label="温馨提示"
        >设置复杂密码更能保护您的账号安全</el-descriptions-item
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
    var validatePass1 = (rule, value, callback) => {
      if (value !== this.userInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }}
      return {
        userInfo: {
          password: "",
          rePassword: "",
        },
        store: {
          id: "",
        },
        userInfoRules: {
          //验证密码是否合法
          password: [
            { required: true, message: "请输入新密码", trigger: "blur" },
            {
              min: 6,
              max: 15,
              message: "长度在 6 到 15 个字符",
              trigger: "blur",
            },
            {
              validator: function (rule, value, callback) {
                //校验密码的正则: ^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$
                if (
                  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(value) ==
                  false
                ) {
                  callback(
                    new Error("请输入包含字母和数字的组合，不能使用特殊字符")
                  );
                } else {
                  //校验通过
                  callback();
                }
              },
              trigger: "blur",
            },
          ],
          //确认密码是否正确
          rePassword: [
            { required: true, message: "请再次确认密码", trigger: "blur" },
            {
              min: 6,
              max: 15,
              message: "长度在 6 到 15 个字符",
              trigger: "blur",
            },
            { validator: validatePass1, trigger: "blur" },
          ],
        },
        dialogFormVisible: false,
        passwordType: "password",
      };
  },
  methods: {
    logout() {
      // 清空token
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    updatePsd(userInfo) {
      this.store.id = window.sessionStorage.getItem("userID");
      console.log("sessionstorage.id:" + this.store.id);
      this.$refs[userInfo].validate((valid, wrongstring) => {
        if (valid) {
          this.axios
            .post(
              "/patient-service/updatePassword" +
                this.store.id +
                "/" +
                this.userInfo.password
            )
            .then((res) => {
              console.log("updatePsd.res.data:");
              console.log(res);
              if (res.data !== true) {
                this.$notify({
                  title: "提示",
                  message: "修改密码失败",
                  type: "warning",
                  duration: 3000,
                });
              } else {
                this.$message({
                  showClose: true,
                  message: `修改密码成功`,
                  type: "success",
                  duration: 3000,
                });
              }
            })
            .catch((err) => {
              this.$notify({
                title: "提示",
                message: "用户访问错误",
                type: "error",
                duration: 0,
              });
              console.log(err);
            });
          this.dialogFormVisible = false;
        } else {
          console.log(valid, wrongstring);
          console.log("error submit!!");
          this.$message({
            showClose: true,
            message: `请输入正确的信息！`,
            type: "warning",
            duration: 3000,
          });
          // this.dialogFormVisible = false;
          return false;
        }
      });
    },
  },
};
</script>
