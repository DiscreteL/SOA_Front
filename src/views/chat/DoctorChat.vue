<template>
  <div>
    <div class="navigation">
      <el-button @click="quit" type="text" class="btn">
        <i class="el-icon-back"></i>
        <span>结束</span>
      </el-button>
    </div>
    <el-card class="chatroom">
      <div class="ope">
        <i class="el-icon-turn-off-microphone"></i>
        <!-- <i class="el-icon-video-camera"></i> -->
      </div>
      <!-- <i class="el-microphone"></i> -->
    </el-card>
    <el-card class="tab_pos">
      <tabs></tabs>
    </el-card>
  </div>
</template>

<script>
// import { getDocInfoData } from "@/service/userService";
// import text_box from "@/components/text_box";
// import inquiry_record from "@/components/medicalrecord_form";
import tabs from "@/components/docChatSide.vue";
// import inquiry_title from "@/components/inquiry_title";
// import inquiry_navigation_doc from "@/components/inquiry_navigation_doc";
export default {
  name: "Inquiry",
  components: {
    // inquiry_title,
    // text_box,
    // inquiry_record,
    tabs,
    // inquiry_navigation_doc,
  },
  data() {
    return {
      num: null,
    };
  },
  created() {
    getDocInfoData({
      id: this.$store.state.inquiry.doctorId,
    })
      .then((res) => {
        let temp = res.result.picture_url;
        if (temp.length == 32) {
          this.num = res.result.picture_url.substring(27, 28);
        } else {
          this.num = res.result.picture_url.substring(27, 29);
        }
        this.num = temp;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    quit() {
      clearInterval(this.$store.state.inquiry.chatroomId); //停止轮询
      this.$router.push("/userhome2"); //退出，跳转到主页
    },
  },
};
</script>
<style scoped>
.navigation {
  padding-top: 10px;
  /*top:10px;*/
  width: 100%;
  background: RGB(70, 80, 105);
  text-align: right;
  /*background: RGB(236,245,255);*/
}
.btn {
  margin-right: 1%;
}
.text {
  position: absolute;
  top: 0;
  left: 64px;
  bottom: 0;
  width: 65%;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}
.chatroom {
  position: absolute;
  padding: 0;
  margin: 0;
  left: 0;
  width: 70%;
  height: 100%;
  border: 0;
  overflow: hidden;

}
.ope{
  display: flex;
  justify-content: space-between;
}
.tab_pos {
  position: absolute;
  padding: 0;
  margin: 0;
  right: 0;
  width: 30%;
  height: 100%;
  border: 0;
  overflow: hidden;
}
/* .tab_pos {
  position: relative;
  margin: auto;
  top: 15px;
  left: 20px;
  overflow: hidden;
} */
</style>
