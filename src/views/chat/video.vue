<template>
  <div class="video">
    <h2 class="left-align">开始视频问诊</h2>
    <div class="row">
      <div>
        <el-button type="primary" plain id="join">开始</el-button>
        <el-button type="primary" plain id="leave">离开</el-button>
      </div>
    </div>
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
    };
  },
  methods: {
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