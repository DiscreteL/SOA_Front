<template>
  <div class="home_container">
    <UserHomeNav2></UserHomeNav2>
    <!--页面主体区-->
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

          <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-upload"></i>
            <span>发布资讯</span>
          </template>
            <el-menu-item index="/uploadArticle" @click="saveNavState('/uploadArticle')">
              <i class="el-icon-date" style="color: #dcdcdc"></i>
              <span slot="title">发布文章</span>
            </el-menu-item>
            <el-menu-item index="/uploadVideo" @click="saveNavState('/uploadVideo')">
              <i class="el-icon-date" style="color: #dcdcdc"></i>
            <span slot="title">上传视频</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>资讯管理</span>
          </template>
            <el-menu-item index="/manageArticle" @click="saveNavState('/manageArticle')">
              <i class="el-icon-date" style="color: #dcdcdc"></i>
              <span slot="title">文章管理</span>
            </el-menu-item>
            <el-menu-item index="/manageVideo" @click="saveNavState('/manageVideo')">
              <i class="el-icon-date" style="color: #dcdcdc"></i>
            <span slot="title">视频管理</span>
            </el-menu-item>
          </el-submenu>
          
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
  name: "messageCenter",
  components: {
    UserHomeNav2,
  },
  data() {
    return {
      // 默认不折叠
      isCollapse: false,
      // 被激活导航地址
      activePath: "",
    };
  },
  created() {
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
html,
body {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}
.home_container{
    height: 100vh;
}
.el-container{
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
