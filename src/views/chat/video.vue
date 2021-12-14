<template>
  <div class="video">
    <h2 class="left-align">开始视频问诊</h2>
    <div class="row">
      <div>
        <el-button type="primary" plain id="join">开始</el-button>
        <el-button type="primary" plain id="leave">离开</el-button>
      </div>
    </div>
    <el-button type="primary" @click="totest">测试</el-button>
  </div>
</template>

 

<script>
import { startBasicCall } from "../../utils/basicVideoCall.js";
// import { testFun } from "../../service/userService.js";
// import request from "@/utils/request";
// import axios from "axios"
// axios.defaults.headers.post['Content-Type'] = 'application/json,;charset=utf-8';

export default {
  name: "testvideo",
  data() {
    return {
      CommonProblem: {
        "problemContent": "呜呜呜哇",
        "problemAnswer": "1"
      },
    };
  },
  methods: {
    totest() {
      this.axios.post(
          "/admin-and-problem-service/addProblem",
          this.CommonProblem
        )
        // request.post("/addProblem", this.CommonProblem)
        .then((res) => {})
        .catch((err) => {
          this.$notify({
            title: "提示",
            message: "用户访问错误",
            type: "error",
            duration: 3000,
          });
          console.log(err);
        });
    },
  },
  created() {
    startBasicCall();
  },
};
</script>

<style scoped>
.video {
  position: relative;
  margin-left: 4%;
  top: -20px;
}
</style>