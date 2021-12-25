<template>
  <el-card>
    <el-descriptions title="用户信息">
      <!-- 编辑个人信息的按钮 -->
      <template slot="extra">
        <el-button
          type="primary"
          size="small"
          @click="dialogFormVisible = true"
        >
          编辑</el-button
        >
        <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
          <el-form :model="userInfo" ref="userInfo" :rules="userInfoRules">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input
                v-model="userInfo.name"
                prefix-icon="el-icon-user"
                autocomplete="off"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio-group v-model="userInfo.gender" disabled>
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="身份证号" :label-width="formLabelWidth">
              <el-input
                v-model="userInfo.idNum"
                prefix-icon="el-icon-postcard"
                autocomplete="off"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="height"
              label="身高/cm"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="userInfo.height"
                prefix-icon="el-icon-notebook-2"
                autocomplete="off"
                placeholder="请输入身高"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="weight"
              label="体重/kg"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="userInfo.weight"
                prefix-icon="el-icon-notebook-2"
                autocomplete="off"
                placeholder="请输入体重"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="heartRate"
              label="心率 /次/分"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="userInfo.heartRate"
                prefix-icon="el-icon-notebook-2"
                autocomplete="off"
                placeholder="请输入心率"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="email"
              label="邮箱"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="userInfo.email"
                prefix-icon="el-icon-message"
                autocomplete="off"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateInfo('userInfo')"
              >保 存</el-button
            >
          </div>
        </el-dialog>
      </template>
      <!-- 个人信息显示 -->
      <el-descriptions-item label="姓名">{{
        userInfo.name
      }}</el-descriptions-item>
      <el-descriptions-item label="性别">
        {{ userInfo.gender }}</el-descriptions-item
      >
      <el-descriptions-item label="身份证号码">
        {{ userInfo.idNum }}</el-descriptions-item
      >
      <el-descriptions-item label="出生日期">{{
        userInfo.bornDate | formatDate
      }}</el-descriptions-item>
    </el-descriptions>
    <hr />
    <!-- 健康信息显示 -->
    <el-descriptions class="margin-top" title="健康信息" :column="3">
      <el-descriptions-item label="身高"
        >{{ userInfo.height }}cm</el-descriptions-item
      >
      <el-descriptions-item label="体重"
        >{{ userInfo.weight }}kg</el-descriptions-item
      >
      <el-descriptions-item label="心率"
        >{{ userInfo.heartRate }}次/分</el-descriptions-item
      >
    </el-descriptions>

    <hr />
    <!-- 联系方式显示 -->
    <el-descriptions class="margin-top" title="联系方式" :column="3">
      <el-descriptions-item label="邮箱">{{
        userInfo.email
      }}</el-descriptions-item>
      >
    </el-descriptions>
  </el-card>
</template>
<script>
import { formatDate } from "@/utils/date.js";
export default {
  data() {
    return {
      // 返回个人信息
      // userID: window.sessionStorage.getItem("id"),
      userInfo: {
        name: "",
        idNum: "",
        bornDate: "",
        gender: "",
        email: "",
        height: "",
        weight: "",
        heartRate: "",
      }, //用户个人信息
      store: {
        id: "",
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
      userInfoRules: {
        height: [{ required: true, message: "输入身高", trigger: "blur" }],
        weight: [{ required: true, message: "输入体重", trigger: "blur" }],
        heartRate: [{ required: true, message: "输入心率", trigger: "blur" }],
        //验证邮箱是否合法
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            min: 1,
            max: 25,
            message: "长度在 1 到 25 个字符",
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
      },
    };
  },
  // 将时间戳格式转化为string格式
  filters: {
    formatDate(time) {
      // time=Number(time);
      // console.log(time);
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  methods: {
    getInfo() {
      this.store.id = window.sessionStorage.getItem("userID");
      console.log("sessionstorage.id:" + this.store.id);
      let _this = this;
      this.axios
        .get(
          "api/patient-service/getPatient/" + this.store.id
          // headers: {
          //   token: window.sessionStorage.getItem("token"),
          // },
        )
        .then(function (res) {
          console.log("getInfo.res.data:");
          console.log(res.data);
          _this.userInfo = res.data;
        })
        .catch(function (error) {
          console.log("Get Nothing!" + error);
        });
    },
    updateInfo(userInfo) {
      this.$refs[userInfo].validate((valid, wrongstring) => {
        if (valid) {
          this.axios
            .post("/patient-service/updatePatientInfor", {
              id: this.store.id,
              name: this.userInfo.name,
              idNum: this.userInfo.idNum,
              bornDate: this.userInfo.bornDate,
              gender: this.userInfo.gender,
              email: this.userInfo.email,
              height: this.userInfo.height,
              weight: this.userInfo.weight,
              heartRate: this.userInfo.heartRate,
            })
            .then((res) => {
              console.log("updateinfo.res.data:");
              console.log(res);
              if (res.data !== true) {
                this.$notify({
                  title: "提示",
                  message: "保存编辑失败",
                  type: "warning",
                  duration: 3000,
                });
              } else {
                this.$message({
                  showClose: true,
                  message: `保存成功`,
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
  created() {
    this.getInfo();
  },
};
</script>
