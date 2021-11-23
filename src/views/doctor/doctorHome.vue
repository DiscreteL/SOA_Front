<template>
  <el-container>
    <el-header>
      <!-- 头部 -->
        <div class="right-menu">
          <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
              <img src="~@/assets/ji.png" class="user-avatar" />
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
              <router-link to="/home">
                <el-dropdown-item> Home </el-dropdown-item>
              </router-link>
              <router-link to="/personalInfo">
                <el-dropdown-item> 个人信息 </el-dropdown-item>
              </router-link>
              <el-dropdown-item divided @click.native="logout">
                <span style="display: block">Log Out</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
    </el-header>
    <!-- 主体部分 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="togleCollapse">
          <span style="text-align: center; display: block">||||</span>
        </div>
        <!-- 菜单 -->
        <el-menu
          background-color="#373f41"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="$route.path"
          :router="true"
          :collapse="isCollapse"
        >
          <el-submenu index="1">
            <!-- 一级菜单模板 -->
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>个人信息管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">医生资格审核</template>
              <el-menu-item index="/docApp">
                <i class="el-icon-chat-dot-square"></i>
                <span slot="title">申请列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-edit-outline"></i>
              <span>创作中心</span>
            </template>
            <el-menu-item-group>
              <template slot="title">问题管理</template>
              <el-menu-item index="/problem">
                <i class="el-icon-s-opportunity"></i>
                <span slot="title">常见问题列表</span>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">反馈管理</template>
              <el-menu-item index="2-2">
                <i class="el-icon-chat-dot-square"></i>
                <span slot="title">待处理反馈</span>
              </el-menu-item>
              <el-menu-item index="2-3">
                <i class="el-icon-s-claim"></i>
                <span slot="title">反馈列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-check"></i>
              <span>预约中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">
                <i class="el-icon-chat-dot-square"></i>
                <span slot="title">待审核资讯</span>
              </el-menu-item>
              <el-menu-item index="/seller">
                <i class="el-icon-s-claim"></i>
                <span slot="title">历史审核记录</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menuList: [],
      iconObj: {},
      // 选择不折叠
      isCollapse: false,
      activePath: "",
    };
  },
  created() {
    this.getMenuList();
    /* this.activePath = window.sessionStorage.getItem('activePath') */
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push("/login");
      location.reload();
    },
    // 获取菜单
    async getMenuList() {
      /* const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      // console.log(res) */
    },
    togleCollapse() {
      this.isCollapse = !this.isCollapse;
    }, // 菜单折叠展开
  },
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373f41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
div {
  display: flex;
  align-items: center;
}

img {
  height: 40px;
}
span {
  margin-left: 15px;
  text-emphasis-color: #eee;
}

.el-aside {
  background-color: #333744;
}

.el-menu {
  border: none;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;

  cursor: pointer;
}


.right-menu {
  margin-right:0%;
  height: 100%;
  line-height: 50px;
  position: absolute;
    right: 0px;
  /* &:focus {
      outline: none; */
}

.right-menu-item {
  display: inline-block;
  padding: 0 8px;
  height: 100%;
  font-size: 18px;
  color: #5a5e66;
  vertical-align: text-bottom;

  /* &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      } */
}

.avatar-container {
  margin-right: 30px;
}

.avatar-wrapper {
  margin-top: 5px;
  position: relative;
}

.user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

.el-icon-caret-bottom {
  cursor: pointer;
  position: absolute;
  right: -20px;
  top: 25px;
  font-size: 12px;
}
</style>
