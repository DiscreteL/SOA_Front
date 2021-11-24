<template>
  <div class="container">
    <div class="head">
      <div class="background">
        <img src="@/assets/back.jpg" alt="" width="100%" height="100%" />
      </div>
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
          <template slot="title">
            <span> {{ item.navItem }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "docHomeNav",
  data() {
    return {
      //   userID: window.sessionStorage.getItem("id"),
      userName: "sxg",
      navList: [
        { name: "/docInfo", navItem: "个人信息" },
        { name: "/messagemanage", navItem: "创作中心" },
        { name: "/consult", navItem: "问诊" },
      ],
    };
  },
};
</script>

<style scoped>
.head {
  position: absolute;
  top: 16%;
  height: 180px;
  width: 100%;
}
.background {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
}
.navBar {
  position: absolute;
  top: 41%;
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
.el-menu-item span {
  margin: 200px;
}
</style>