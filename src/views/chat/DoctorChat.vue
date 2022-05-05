<template>
  <div>
    <div class="navigation">
      <el-button @click="quit" type="text" class="btn">
        <i class="el-icon-back"></i>
        <span>结束</span>
      </el-button>
    </div>
    <el-card class="chatroom">
       <testvideo />
    </el-card>
    <el-card class="tab_pos">
      <tabs></tabs>
    </el-card>
  </div>
</template>

<script>
import tabs from "@/components/docChatSide.vue";
import testvideo from "./video.vue";

export default {
  name: "Inquiry",
  components: {
    tabs,
    testvideo,
  },
  data() {
    return {
      num: null,
    };
  },
  created() {
  },
  methods: {
    quit() {
      this.axios({
        url: "./oiservice/completeRequest/" + window.sessionStorage.getItem("reserveNum"),
        method: "get",
        params: {
          id: this.ID,
        },
      })
        .then((response) => {
          // console.log(response.data);
          // this.tableData = response.data;
          if(response.data==true){
           this.$message({
            type: "success",
            message: "问诊结束!",
          });
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
.ope {
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
</style>