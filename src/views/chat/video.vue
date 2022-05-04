<template>
  <div class="video">
    <!-- <h2 class="left-align">开始视频问诊</h2> -->
    <div class="row">
      <div class="but">
        <el-button type="primary" plain id="join" icon="el-icon-video-camera">开启视频</el-button>
        <el-button type="primary" plain id="leave" icon="el-icon-close">关闭视频</el-button>
      </div>
      <div v-show="show">
        <img
        :src="imgSrc1"
        style="margin-top:3%;margin-left:4%;width: 390px; height: 550px;"
        alt=""
      />
       <img
        :src="imgSrc2"
        style="position:absolute;top:10.7%;left:50%;width: 390px; height: 550px;"
        alt=""
      />
   
      </div>
    </div>
  </div>
</template>

<script>
import { startBasicCall } from "../../utils/basicVideoCall.js";

export default {
  name: "testvideo",
  data() {
    return {
       show: true,
       imgSrc1: require("../../assets/video1.png"),
       imgSrc2: require("../../assets/video2.png"),
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
  top: 5px;
}
.but{
  margin-left:10%;
}
</style>