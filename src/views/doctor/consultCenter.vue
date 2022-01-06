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
              <i class="el-icon-date"></i>
              <span>我的预约</span>
            </template>
            <el-menu-item
              index="/waitApply"
              @click="saveNavState('/waitApply')"
            >
              <i tyle="color: #dcdcdc"></i>
              <span slot="title">预约申请</span>
            </el-menu-item>
            <el-menu-item
              index="/sucApply"
              @click="saveNavState('/sucApply')"
            >
              <i style="color: #dcdcdc"></i>
              <span slot="title">待问诊</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/docRecord" @click="saveNavState('/docRecord')">
            <i class="el-icon-document" style="color: #dcdcdc"></i>
            <span slot="title">问诊记录</span>
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
  name: "ConsultCenter",
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
