<template>
  <div class="home_container">
    <UserHomeNav2></UserHomeNav2>
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '150px'">
        <div class="toggle-button" @click="toggleCollapse">
          <div v-if="this.isCollapse == true">
            <i class="el-icon-s-fold"></i>
          </div>
          <div v-else>
            <i class="el-icon-s-unfold"></i>
          </div>
        </div>
        <el-menu
          background-color="#5b6be5"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- :unique-opened="true"->只允许展开一个菜单 -->
          <!-- :collapse-transition="false" -> 关闭动画 -->
          <!-- router -> 导航开启路由模式 -->
          <el-menu-item index="/docInfo" @click="saveNavState('/docInfo')">
            <i class="el-icon-user" style="color: #dcdcdc"></i>
            <span slot="title">基本信息</span>
          </el-menu-item>
          <el-menu-item index="/accManage" @click="saveNavState('/accManage')">
            <i class="el-icon-s-order" style="color: #dcdcdc"></i>
            <span slot="title">账号管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!--右侧主体区-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import UserHomeNav2 from "@/components/userhomenav2.vue";

export default {
  name: "userHome2",
  components: {
    UserHomeNav2,
  },
  // data() {
  //   return {
  //     // 返回个人信息
  //     // userID: window.sessionStorage.getItem("id"),
  //     userInfo: {}, //用户个人信息
  //     item: {
  //       id: "",
  //     },
  //   };
  // },
  data() {
    return {
      // 默认不折叠
      isCollapse: false,
      // 被激活导航地址
      activePath: "",
    };
  },
  created() {
    // this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
};
</script>

<style lang="less" scoped>
// .Info {
//   text-align: left;
//   font: 15px "Microsoft YaHei";
//   align-content: center;
//   width: 80%;
//   position: relative;
// }
html,
body {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}
.home_container {
  height: 100vh;
}
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #5b6be5;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.toggle-button {
  background-color: #5b6be5;
  font-size: 15px;
  line-height: 24px;
  color: #87cefa;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  padding: 10px;
}
.logo_box {
  height: 60px;
  width: 60px;
  border: 5px #53868b;
  border-radius: 50%; /* 圆角 */
  position: relative;
  margin: 30px;
}
.port_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%; /* 圆角 */
  background-color: #53868b;
}
</style>
