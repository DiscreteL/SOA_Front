<template>
  <div>
    <div class="login_background">
      <img
        :src="imgSrc"
        style="width: 100%; height: 100%; display: block"
        alt=""
      />
    </div>
    <div style="height: 120px"></div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      style="
        background-color: #ffffffa4;
        width: 700px;
        margin-left: 10%;
        padding-left: 10px;
      "
    >
      <el-tab-pane label="患者注册" name="first">
        <div class="login_box1">
          <!-- <div class="pos"> -->
          <el-form
            ref="loginForm1"
            :model="loginForm1"
            :rules="loginForm1Rules"
            label-width="80px"
            :inline="true"
            size="medium"
            class="login_form1"
          >
           <!-- 姓名 -->
            <el-form-item prop="username" label="姓名">
              <el-input
                v-model="loginForm1.username"
                prefix-icon="el-icon-user"
               
              ></el-input>
            </el-form-item>
            <!-- 身份证 -->
            <el-form-item prop="identification" label="身份证号">
              <el-input
                v-model="loginForm1.identification"
                prefix-icon="el-icon-postcard"
                 style="width: 117%"
              ></el-input>
            </el-form-item>
           
            <el-row>
              <el-col :span="11">
                <!-- 性别 -->
                <el-form-item label="性别" prop="sex" style="width=100%">
                  <el-radio-group v-model="loginForm1.sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <!-- 邮箱 -->
                <el-form-item
                  prop="email"
                  label="邮箱"
                  style="white-space: nowrap;margin-left:8px;"
                >
                  <el-input
                    v-model="loginForm1.email"
                    prefix-icon="el-icon-message"
                    style="width:117%"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 密码 -->
            <el-form-item prop="password" label="密码">
              <el-input
                v-model="loginForm1.password"
                prefix-icon="el-icon-lock"
                type="password"
              ></el-input>
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item prop="rePassword" label="确认密码">
              <el-input
                v-model="loginForm1.rePassword"
                prefix-icon="el-icon-lock"
                type="password"
                class="length"
                style="width: 110%"
                show-password
              ></el-input>
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item style="margin-right=0;width:100%" align="right">
              <!-- class="btns" -->
              <el-button type="text" @click="toLogin">已有账号，登陆</el-button>
              <el-button type="primary" @click="register1('loginForm1')"
                >注册</el-button
              >
              <el-button type="info" @click="resetloginForm1">重置</el-button>
            </el-form-item>
          </el-form>
          <!-- </div> -->
        </div>
      </el-tab-pane>

      <el-tab-pane label="医生注册" name="second">
        <div class="login_box2">
          <!-- <div class="pos"> -->
          <el-form
            ref="loginForm2"
            :model="loginForm2"
            :rules="loginForm2Rules"
            label-width="80px"
            :inline="true"
            size="medium"
            class="login_form2"
          >
            <!-- 姓名 -->
            <el-form-item prop="username" label="姓名">
              <el-input
                v-model="loginForm2.username"
                prefix-icon="el-icon-user"
              ></el-input>
            </el-form-item>
            <!-- 身份证 -->
            <el-form-item prop="identification" label="身份证号">
              <el-input
                v-model="loginForm2.identification"
                prefix-icon="el-icon-postcard"
                style="width: 117%"
              ></el-input>
            </el-form-item>
             <!-- 密码 -->
            <el-form-item prop="password" label="密码">
              <el-input
                v-model="loginForm2.password"
                prefix-icon="el-icon-lock"
                type="password"
              ></el-input>
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item prop="rePassword" label="确认密码">
              <el-input
                v-model="loginForm2.rePassword"
                prefix-icon="el-icon-lock"
                type="password"
                style="width: 110%"
                show-password
              ></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="11">
                <!-- 邮箱 -->
                <el-form-item
                  prop="email"
                  label="邮箱"
                  style="white-space: nowrap"
                >
                  <el-input
                    v-model="loginForm2.email"
                    prefix-icon="el-icon-message"
                  ></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="11">
                <!-- 性别 -->
                <el-form-item label="性别" prop="sex">
                  <el-radio-group v-model="loginForm2.sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <!-- 医院 -->
                <el-form-item
                  prop="hospital"
                  label="工作医院"
                  style="margin-left: 7px"
                >
                  <el-input
                    v-model="loginForm2.hospital"
                    prefix-icon="el-icon-office-building"
                    style="width: 117%"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 科室 -->
            <el-form-item prop="department" label="科室">
              <el-input
                v-model="loginForm2.department"
                prefix-icon="el-icon-house"
              ></el-input>
            </el-form-item>
            <!-- 职称 -->
            <el-form-item prop="title" label="职称">
              <el-input
                v-model="loginForm2.title"
                prefix-icon="el-icon-s-custom"
                style="width: 117%"
              ></el-input>
            </el-form-item>
           <!-- 工作时间 -->
            <el-form-item prop="workingAge" label="从业起始年份">
              <el-input
                v-model="loginForm2.workingAge"
                prefix-icon="el-icon-news"
              ></el-input>
            </el-form-item>
             <!-- 个人简介 -->
            <el-form-item label="个人简介" prop="introduction">
              <el-input
                type="textarea"
                v-model="loginForm2.introduction"
                style="width: 138%"
              ></el-input>
            </el-form-item>
            <!-- 执业医师资格证编号 -->
            <el-form-item prop="certification" label="执业医师资格证号">
              <el-input
                v-model="loginForm2.certification"
                prefix-icon="el-icon-medal"
               
              ></el-input>
            </el-form-item>

            <el-form-item label="资格证明">
              <el-upload
                class="upload-demo"
                action="#"
                :http-request="httpRequest"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-upload="beforeUpload"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="cFileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过8MB
                </div>
              </el-upload>
            </el-form-item>
          
            <!-- 按钮区域 -->
            <el-form-item
              style="margin-right=0;width:100%"
              align="right"
              size="medium"
            >
              <el-button type="text" @click="toLogin">已有账号，登陆</el-button>
              <el-button type="primary" @click="register2('loginForm2')"
                >注册</el-button
              >
              <el-button type="info" @click="resetloginForm2">重置</el-button>
              <el-button type="info" @click="testFile">打印</el-button>
            </el-form-item>
          </el-form>
          <!-- </div> -->
        </div>
      </el-tab-pane>
    </el-tabs>
    <div style="height: 100px"></div>
  </div>
</template>

<script>

const TIME_COUNT = 60; // 设置一个全局的倒计时的时间
export default {
  data() {
    //在data里面定义两个校验器,检验两次密码是否一致
    var validatePass1 = (rule, value, callback) => {
      if (value !== this.loginForm1.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.loginForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      count: 0,
      //这是注册表单的数据绑定对象
      loginForm1: {
        username: "",
        password: "",
        rePassword: "",
        email: "",
        identification: "",
        sex: "",
      },
      loginForm2: {
        sex: "",
        username: "",
        identification: "",
        email: "",
        password: "",
        rePassword: "",
        certification:"",
        hospital: "",
        department: "",
        title: "",
        introduction:"",
        workingAge: 0,
        
      },
      cFileList: [],
      //这是表单的验证规则对象
      loginForm1Rules: {
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        //验证姓名是否合法
        username: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              //校验中文的正则：/^[\u4e00-\u9fa5]{0,}$/
              if (/^[\u4e00-\u9fa5]+$/.test(value) == false) {
                callback(new Error("请输入中文"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        // code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        //验证身份证是否合法
        identification: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          {
            min: 18,
            max: 18,
            message: "长度在 18 个字符",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              //校验身份证的正则：(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)
              if (
                /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) == false
              ) {
                callback(new Error("请输入正确的身份证号"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        //验证邮箱是否合法
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              //校验数字的正则：^[0-9]*$
              if (
                /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(
                  value
                ) == false
              ) {
                callback(new Error("请输入正确的邮箱"));
              } else {
                //校验通过
                callback();
              }
            },
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

      //这是表单的验证规则对象
      loginForm2Rules: {
        // code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        certification: [
          { required: true, message: "请输入执业医师资格证编号", trigger: "blur" },
        ],
        introduction: [
          { required: true, message: "请输入个人简介", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        //验证姓名是否合法
        username: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              //校验中文的正则：/^[\u4e00-\u9fa5]{0,}$/
              if (/^[\u4e00-\u9fa5]+$/.test(value) == false) {
                callback(new Error("请输入中文"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        //验证身份证是否合法
        identification: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          {
            min: 18,
            max: 18,
            message: "长度在 18 个字符",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              //校验身份证的正则：(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)
              if (
                /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) == false
              ) {
                callback(new Error("请输入正确的身份证号"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        //验证邮箱是否合法
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              //校验数字的正则：^[0-9]*$
              if (
                /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(
                  value
                ) == false
              ) {
                callback(new Error("请输入正确的邮箱"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        //验证工作医院是否合法
        hospital: [
          { required: true, message: "请输入工作医院", trigger: "blur" },
          {
            min: 4,
            message: "工作医院不能为空",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              //校验中文的正则：/^[\u4e00-\u9fa5]{0,}$/
              if (/^[\u4e00-\u9fa5]+$/.test(value) == false) {
                callback(new Error("请输入中文"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        //验证工龄是否合法
        workingAge: [
          { required: true, message: "请输入从业起始年份", trigger: "blur" },
          {
            min: 4,
            max: 4,
            message: "工龄不能为空",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              //校验数字的正则：/^[0-9]*$/
              if (/^[0-9]+$/.test(value) == false) {
                callback(new Error("请输入数字"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        //验证职称是否合法
        title: [
          { required: true, message: "请输入职称", trigger: "blur" },
          {
            min: 2,
            message: "请填写正确的职称",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              //校验中文的正则：/^[\u4e00-\u9fa5]{0,}$/
              if (/^[\u4e00-\u9fa5]+$/.test(value) == false) {
                callback(new Error("请输入中文"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        //验证科室是否合法
        department: [
          { required: true, message: "请输入科室名", trigger: "blur" },
          {
            min: 2,
            message: "科室名不能为空",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              //校验中文的正则：/^[\u4e00-\u9fa5]{0,}$/
              if (/^[\u4e00-\u9fa5]+$/.test(value) == false) {
                callback(new Error("请输入中文"));
              } else {
                //校验通过
                callback();
              }
            },
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
          {
            validator: function (rule, value, callback) {
              //校验密码的正则: ^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$
              if (
                /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/.test(value) ==
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
          { validator: validatePass2, trigger: "blur" },
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      activeName: "first",
      imgSrc: require("../assets/bg.png"),
      radio: "1",
      show: true,
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    // beforeRemove(file, fileList) {
    //   return this.$confirm(`确定移除 ${file.name}？`);
    // },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt8M = file.size / 1024 / 1024 < 8;
      if (!isJPG && !isPNG) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!");
      }
      if (!isLt8M) {
        this.$message.error("上传图片大小不能超过 8MB!");
      }
      // return isJPG && isLt8M;
      // let fd = new FormData();//通过form数据格式来传
      // fd.append("picFile", file); //传文件
      // this.eFileList.push(fd);
    },

    testFile() {
      this.loginForm2.eFileList = this.eFileList;
      console.log(this.eFileList);
      console.log(this.loginForm2);
    },

    httpRequest(data) {
      let fd = new FormData(); //通过form数据格式来传
      fd.append("picFile", data.file); //传文件
      // let x=rd.result;
      // console.log(x);
      console.log(fd);
      // this.eFileList.push(fd);
      this.eFileList.push({
        name: data.file.name,
        url: data.file.url,
      });

      // rd.onloadend = function (e) {
      //   _this.data.imageUrl = this.result // this指向当前方法onloadend的作用域
      // }
    },
    //跳转到登录界面
    toLogin() {
      this.$router.push("/");
    },
    //点击重置按钮，重置登录
    resetloginForm1() {
      this.$refs.loginForm1.resetFields();
    },
    //点击重置按钮，重置登录
    resetloginForm2() {
      this.$refs.loginForm2.resetFields();
    },

    //患者注册功能
    register1(loginForm1) {
      this.$refs[loginForm1].validate((valid, wrongstring) => {
        // 获取loginform的实例（el-form），找到validate方法，根据验证规则rules校验是否valid
        if (valid) {
          this.loading = true;
              //this.axios.post("http://100.80.144.48:9000/doctor-service/register",{
         this.axios.post("/patient-service/register",{
            name: this.loginForm1.username,
            password: this.loginForm1.password,
            email: this.loginForm1.email,
            idNum: this.loginForm1.identification,
            gender: this.loginForm1.sex,
          })
            .then((res) => {
              console.log(res)
              if (res.data === "注册失败") {
                this.$notify({
                  title: "提示",
                  message: "用户已注册过账号，无须再注册！",
                  type: "warning",
                  duration: 3000,
                });
              } else {
                this.$message({
                  showClose: true,
                  message: `注册成功！请记住您的ID：${res.data}`,
                  type: "success",
                  duration: 0,
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
        } else {
          console.log(valid, wrongstring);
          console.log("error submit!!");
          return false;
        }
      });
    },

    //医生注册功能
    register2(loginForm2) {
      this.$refs[loginForm2].validate((valid, wrongstring) => {
        // 获取loginform2的实例（el-form），找到validate方法，根据验证规则rules校验是否valid
        if (valid) {
          this.axios.post("doctor-service/register",{
            name: this.loginForm2.username,
            mail:this.loginForm2.email,
            password: this.loginForm2.password,
            idnum: this.loginForm2.identification,
            gender: this.loginForm2.sex,
            workLength: this.loginForm2.workingAge,
            title: this.loginForm2.title,
            hospital: this.loginForm2.hospital,
            department: this.loginForm2.department,
            certificationNum:this.loginForm2.certification,
            docIntro:this.loginForm2.introduction,
          })
            .then((res) => {
              if (res.result === "注册失败") {
                this.$notify({
                  title: "提示",
                  message: "用户已注册过账号，无须再注册！",
                  type: "warning",
                  duration: 3000,
                });
              } else {
                this.$router.push("/login"); //注册成功路由实现跳转
                this.$message({
                  showClose: true,
                  message: `注册成功！请记住您的ID：${res.result}`,
                  type: "success",
                  duration: 0,
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
          console.log(valid, wrongstring);
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_background {
  // width: 100%;
  // height: 100%;
  z-index: -1;
  // position: absolute;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px; // 这里是设置与顶部的距离
  left: 0px; // 这里是设置与左边的距离
}

.login_box1 {
  background-color: #ffffffa4;
  opacity: 0.9;
  border-radius: 5px;
  width: 690px;
}
.login_box2 {
  background-color: #ffffff;
  opacity: 0.9;
  border-radius: 5px;
  width: 690px;
  // height: 450px;
  // left: 50%;
  // top: 50%;
  // transform: translate(-75%, -35%);
}

.login_form1 {
  background-color: #ffffff;
  width: 100%;
  padding: 10px 10px;
  padding-top: 30px;
  margin-bottom: 10px;
  border-radius: 5px;
  // align-self: center;
  box-sizing: border-box;
}

.login_form2 {
  background-color: #ffffff;
  width: 100%;
  padding: 10px 10px;
  padding-top: 30px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-sizing: border-box;
}

.pos {
  position: absolute;
  padding: 10px;
}
</style>