<template>
  <div class="home_container">
    <UserHomeNav></UserHomeNav>
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
          <el-menu-item
            index="/userhome1/esseninfo"
            @click="saveNavState('/esseninfo')"
          >
            <i class="el-icon-date" style="color: #dcdcdc"></i>
            <span slot="title">基本信息</span>
          </el-menu-item>
          <el-menu-item
            index="/userhome1/accmanage"
            @click="saveNavState('/accmanage')"
          >
            <i class="el-icon-document" style="color: #dcdcdc"></i>
            <span slot="title">账号管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!--右侧主体区-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <!-- 个人信息部分 -->
    <!-- <div class="Info" style="color:#909399">
            <strong> 姓名：</strong>{{ userInfo.name }} <br />
            <strong>身份证号：</strong>{{ userInfo.number }} <br />
            <strong>出生日期：</strong>{{ userInfo.borndate }} <br />
            <strong>性别：</strong>{{ userInfo.gender }} <br />
            <strong>邮箱：</strong>{{ userInfo.mail }} <br />
            <strong>身高：</strong>{{ userInfo.height }} <br />
            <strong>体重：</strong>{{ userInfo.weight }} <br />
            <strong>血压：</strong>{{ userInfo.bloodpressure }} <br />
            <strong>心率：</strong>{{ userInfo.heartrate }} 
          </div> -->
  </div>
</template>

<script>
import UserHomeNav from "@/components/userhomenav.vue";

export default {
  name: "UserHome1",
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
</style>
