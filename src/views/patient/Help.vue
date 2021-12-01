<template>
  <div class="home_container">
    <UserHomeNav></UserHomeNav>
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
          <!-- :unique-opened="true"->只允许展开一个菜单 -->
          <!-- :collapse-transition="false" -> 关闭动画 -->
          <!-- router -> 导航开启路由模式 -->

          <el-menu-item index="/help/faq" @click="saveNavState('/faq')">
            <i class="el-icon-s-help" style="color: #dcdcdc"></i>
            <span slot="title">常见问题</span>
          </el-menu-item>

          <el-menu-item
            index="/help/releaseq"
            @click="saveNavState('/releaseq')"
          >
            <i class="el-icon-circle-plus-outline" style="color: #dcdcdc"></i>
            <span slot="title">反馈问题</span>
          </el-menu-item>
          <!-- <el-menu-item index="/help/myq" @click="saveNavState('/myq')">
            <i class="el-icon-document" style="color: #dcdcdc"></i>
            <span slot="title">我的反馈</span>
          </el-menu-item> -->
                    <el-submenu>
            <template slot="title">
              <i class="el-icon-document" style="color: #dcdcdc"></i>
              <span>我的反馈</span>
            </template>
            <el-menu-item index="totalq">全部</el-menu-item>
            <el-menu-item index="waitq">待处理</el-menu-item>
            <el-menu-item index="successq">已处理</el-menu-item>
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
import UserHomeNav from "@/components/userhomenav.vue";

export default {
  name: "Help",
  components: {
    UserHomeNav,
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
    this.getMenuList();
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
</style>
