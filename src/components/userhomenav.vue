<template>
  <div class="container">
    <div class="head">
      <div class="background">
        <img src="@/assets/back.jpg" alt="" width="100%" height="100%" />
      </div>
      <div class="headmain">
        <div class="left">
          <!-- 头像部分 -->
          <div class="port_box">
            <img src="../assets/port.png" />
          </div>

          <!-- 个人信息部分 -->
          <div
            class="Info"
            style="color: white; font-size: 30px; font-family: 宋体"
          >
            {{ userName }}<br />
          </div>
        </div>
        <div>
          <el-button type="info" @click="returnhome">返回首页</el-button>
        </div>
      </div>
    </div>
    <div class="navBar">
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-demo"
        router
        mode="horizontal"
        active-text-color="#409EFF"
      >
        <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
          {{ item.navItem }}
        </el-menu-item>
      </el-menu>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "UserHomeNav",
  data() {
    return {
      //   userID: window.sessionStorage.getItem("id"),
      userName: "王某某",
      navList: [
        { name: "/userhome1", navItem: "个人信息" },
        { name: "/collection", navItem: "收藏中心" },
        { name: "/consult", navItem: "问诊中心" },
        { name: "/help", navItem: "帮助中心" },
      ],
    };
  },
  methods: {
    returnhome(){
      this.$router.push("/home");
    }
  },
};
</script>

<style scoped>
.head {
  height: 180px;
  width: 100%;
}
.background {
  width: 100%;
  height: 180px;
  z-index: -1;
  position: absolute;
}
.headmain {
  display: flex;
  justify-content: space-around;
  align-items: center;

}
.left {
  display: flex;
  align-items: center;
}
.port_box {
  height: 90px;
  width: 90px;
  border: 1px solid #eee;
  border-radius: 50%; /* 圆角 */
  padding: 3px; /*图片和边框之间的间距 */
  box-shadow: 0 0 10px #ddd; /*阴影 */
  position: relative;
  margin: 30px;
}
.port_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%; /* 圆角 */
  background-color: #eee;
}

.Info {
  text-align: left;
  font: 15px "Microsoft YaHei";
  margin: 30px;
  position: relative;
}
</style>