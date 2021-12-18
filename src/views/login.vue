<template>
  <div>
    <div class="login_background">
      <img
        :src="imgSrc"
        style="width: 100%; height: 100%; display: block"
        alt=""
      />
    </div>

    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo2.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        style="margin-top: 15px; margin-left: 15px; margin-right: 15px"
      >
        <el-tab-pane label="账号密码登录" name="first">
          <el-form
            ref="loginForm1"
            :model="loginForm1"
            :rules="loginForm1Rules"
            label-width="0px"
            class="login_form"
          >
            <el-form-item label=" " prop="usertype">
              <el-radio-group v-model="loginForm1.usertype">
                <el-radio label="我是医生"></el-radio>
                <el-radio label="我是患者"></el-radio>
                <el-radio label="我是管理员"></el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item prop="email">
              <el-input
                v-model="loginForm1.email"
                prefix-icon="el-icon-user"
                placeholder="请输入ID"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                v-model="loginForm1.password"
                prefix-icon="el-icon-lock"
                placeholder="请输入密码"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item class="btns" align="right">
              <el-button type="primary" @click="alogin('loginForm1')"
                >登录</el-button
              >
              <el-button type="primary" @click="toRegister">注册</el-button>
              <el-button type="info" @click="resetloginForm1">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="邮箱验证码登录" name="second">
          <el-form
            ref="loginForm2"
            :model="loginForm2"
            :rules="loginForm2Rules"
            label-width="0px"
            class="login_form"
          >
            <el-form-item label=" " prop="usertype">
              <el-radio-group v-model="loginForm2.usertype">
                <el-radio label="我是医生"></el-radio>
                <el-radio label="我是患者"></el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item prop="email">
              <el-input
                v-model="loginForm2.email"
                prefix-icon="el-icon-message"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
            <!-- 验证码 -->
            <el-form-item prop="code">
              <el-input
                v-model="loginForm2.code"
                prefix-icon="el-icon-chat-round"
                style="width: 55%"
                placeholder="请输入验证码"
              ></el-input>
              <el-button
                @click="getCode()"
                :disabled="!show"
                style="width: 40%; float: right"
              >
                <span v-show="show">发送验证码</span>
                <span v-show="!show" class="count"
                  >{{ count }} s后可点击重发</span
                >
              </el-button>
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item class="btns">
              <el-button type="primary" @click="elogin('loginForm2')"
                >登录</el-button
              >
              <el-button type="primary" @click="toRegister">注册</el-button>
              <el-button type="info" @click="resetloginForm2">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import request from "@/utils/request";

const TIME_COUNT = 60; // 设置一个全局的倒计时的时间
export default {
  data() {
    return {
      count: 0,
      //这是登录表单的数据绑定对象
      loginForm1: {
        email: "",
        password: "",
        usertype: "",
      },
      loginForm2: {
        email: "",
        code: "",
        usertype: "",
      },
      //这是表单的验证规则对象
      loginForm1Rules: {
        //验证邮箱是否合法
        email: [
          { required: true, message: "请输入ID", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        //验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        usertype: [
          { required: true, message: "请选择用户身份", trigger: "change" },
        ],
      },
      loginForm2Rules: {
        //验证邮箱是否合法
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        //验证验证码是否合法
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        usertype: [
          { required: true, message: "请选择用户身份", trigger: "change" },
        ],
      },
      activeName: "first",
      imgSrc: require("../assets/bg2.png"),
      show: true,
    };
  },
  methods: {
    //点击重置按钮，重置登录
    resetloginForm1() {
      this.$refs.loginForm1.resetFields();
    },
    resetloginForm2() {
      this.$refs.loginForm2.resetFields();
    },

    //账号密码登录
    alogin(loginForm1) {
      this.$refs[loginForm1].validate((valid, wrongstring) => {
        // 获取loginform1的实例（el-form），找到validate方法，根据验证规则rules校验是否valid
        if (valid) {
          if (this.loginForm1.usertype === "我是患者") {
            this.axios
              .get(
                "api/patient-service/loginByAccount/" +
                  this.loginForm1.email +
                  "/" +
                  this.loginForm1.password
              )
              .then((res) => {
                console.log(res);
                console.log(res.data);
                if (res.data == true) {
                  // window.sessionStorage.setItem("token", res.data.token);
                  this.$notify({
                    title: "提示",
                    message: "用户登录成功",
                    type: "success",
                    duration: 3000,
                  });
                  this.$router.push("/home");
                  window.sessionStorage.setItem(
                    "userID",
                    this.loginForm1.email
                  ); //其实存的是ID
                } else {
                  this.$notify({
                    title: "提示",
                    message: "用户登录失败",
                    type: "error",
                    duration: 3000,
                  });
                }
                console.log(res);
              })
              .catch((err) => {
                this.$notify({
                  title: "提示",
                  message: "用户访问错误",
                  type: "error",
                  duration: 3000,
                });
                console.log(err);
              });
          } else if (this.loginForm1.usertype === "我是医生") {
            this.axios
              .get(
                "api/doctor-service/loginByAccount/" +
                  this.loginForm1.email +
                  "/" +
                  this.loginForm1.password
              )
              .then((res) => {
                console.log(res);
                console.log(res.data);
                if (res.data == true) {
                  // window.sessionStorage.setItem("token", res.data.token);
                  this.$notify({
                    title: "提示",
                    message: "用户登录成功",
                    type: "success",
                    duration: 3000,
                  });
                  this.$router.push("/userhome2");
                  window.sessionStorage.setItem(
                    "userID",
                    this.loginForm1.email
                  ); //其实存的是ID
                } else {
                  this.$notify({
                    title: "提示",
                    message: "用户登录失败",
                    type: "error",
                    duration: 3000,
                  });
                }
                console.log(res);
              })
              .catch((err) => {
                this.$notify({
                  title: "提示",
                  message: "用户访问错误",
                  type: "error",
                  duration: 3000,
                });
                console.log(err);
              });
          } else {
            this.axios
              .get(
                "api/admin-and-problem-service/login/" +
                  this.loginForm1.email +
                  "/" +
                  this.loginForm1.password
              )
              .then((res) => {
                console.log(res);
                console.log(res.data);
                if (res.data == true) {
                  // window.sessionStorage.setItem("token", res.data.token);
                  this.$notify({
                    title: "提示",
                    message: "用户登录成功",
                    type: "success",
                    duration: 3000,
                  });
                  this.$router.push("/adminhome");
                  window.sessionStorage.setItem(
                    "userID",
                    this.loginForm1.email
                  ); //其实存的是ID
                } else {
                  this.$notify({
                    title: "提示",
                    message: "用户登录失败",
                    type: "error",
                    duration: 3000,
                  });
                }
                console.log(res);
              })
              .catch((err) => {
                this.$notify({
                  title: "提示",
                  message: "用户访问错误",
                  type: "error",
                  duration: 3000,
                });
                console.log(err);
              });
          }
        } else {
          console.log(valid, wrongstring);
          console.log("error submit!!");
          return false;
        }
      });
    },
    //向手机号发送验证码
    getCode() {
      if (this.loginForm2.email === "") {
        this.$message.error("请先输入邮箱再点击获取验证码");
      } else {
        let regemail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!regemail.test(this.loginForm2.email)) {
          this.$message({
            showClose: true,
            message: "请输入格式正确有效的邮箱号!",
            type: "error",
          });
        } else {
          console.log("经过检验格式正确"); //已执行
          if (this.loginForm2.usertype === "我是患者") {
            this.axios
              .get("api/patient-service/getCode/" + this.loginForm2.email)
              .then((res) => {
                console.log(res);
                if (res.data === true) {
                  this.$message({
                    showClose: true,
                    type: "success",
                    message: "验证码已发送",
                  });
                  this.Ecode = res.Ecode;
                  console.log(res.Ecode);
                } else {
                  console.log("4444444"); //未执行
                  this.$message({
                    message: res.msg,
                    type: "error",
                    showClose: true,
                  });
                }
              });
          } else {
            this.axios
              .get("api/doctor-service/getCode/" + this.loginForm2.email)
              .then((res) => {
                console.log(res);
                if (res.data === true) {
                  this.$message({
                    showClose: true,
                    type: "success",
                    message: "验证码已发送",
                  });
                  this.Ecode = res.Ecode;
                  console.log(res.Ecode);
                } else {
                  console.log("4444444"); //未执行
                  this.$message({
                    message: res.msg,
                    type: "error",
                    showClose: true,
                  });
                }
              });
          }
        }
      }
      console.log("55555"); //执行
      // 验证码倒计时
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },

    //邮箱验证码登录
    elogin(loginForm2) {
      this.$refs[loginForm2].validate((valid, wrongstring) => {
        // 获取loginform1的实例（el-form），找到validate方法，根据验证规则rules校验是否valid
        if (valid) {
          if (this.loginForm2.usertype === "我是患者") {
            this.axios
              .get(
                "api/patient-service/loginByMail/" +
                  this.loginForm2.email +
                  "/" +
                  this.loginForm2.code
              )
              .then((res) => {
                console.log(res);
                if (res.data != "登录失败！！！") {
                  this.$notify({
                    title: "提示",
                    message: "用户登录成功",
                    type: "success",
                    duration: 3000,
                  });
                  this.$router.push("/home");
                  window.sessionStorage.setItem(
                    "userID",
                    res.data
                  ); //其实存的是ID
                } else {
                  this.$notify({
                    title: "提示",
                    message: "用户登录失败",
                    type: "error",
                    duration: 3000,
                  });
                }
                console.log(res);
              })
              .catch((err) => {
                this.$notify({
                  title: "提示",
                  message: "用户访问错误",
                  type: "error",
                  duration: 3000,
                });
                console.log(err);
              });
          } else if (this.loginForm2.usertype === "我是医生") {
            this.axios
              .get(
                "api/doctor-service/loginByMail/" +
                  this.loginForm2.email +
                  "/" +
                  this.loginForm2.code
              )
              .then((res) => {
                console.log(res);
                console.log(res.data);
                if (res.data != "登录失败！！！") {
                  // window.sessionStorage.setItem("token", res.data.token);
                  this.$notify({
                    title: "提示",
                    message: "用户登录成功",
                    type: "success",
                    duration: 3000,
                  });
                  this.$router.push("/userhome2");
                  window.sessionStorage.setItem(
                    "userID",
                     res.data
                  ); //其实存的是ID
                } else {
                  this.$notify({
                    title: "提示",
                    message: "用户登录失败",
                    type: "error",
                    duration: 3000,
                  });
                }
                console.log(res);
              })
              .catch((err) => {
                this.$notify({
                  title: "提示",
                  message: "用户访问错误",
                  type: "error",
                  duration: 3000,
                });
                console.log(err);
              });
          }
        } else {
          console.log(valid, wrongstring);
          console.log("error submit!!");
          return false;
        }
      });
    },

    toRegister() {
      this.$router.push("/register");
    },
    handleClick(tab, event) {
      //切换事件时可以根据身份不同做一些事情
      console.log(tab, event);
    },
  },
};
</script>

<style lang="less" scoped>
.login_background {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
}

.login_box {
  width: 35%;
  // height:65%;
  background-color: #fff;
  opacity: 0.9;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(10%, -40%);
  z-index: 1;
  border: 1px solid #d8d2d2;
}

.avatar_box {
  height: 100px;
  width: 100px;
  border: 1px solid #d8d2d2;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -80%);
  background-color: rgba(255, 255, 255, 0.589);
  img {
    width: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #eeeeee;
  }
}

.login_form {
  // position: absolute;
  // bottom: 0;
  width: 100%;
  padding: 0px 10px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>