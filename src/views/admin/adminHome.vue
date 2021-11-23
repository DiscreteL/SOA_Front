<template>
<el-container>
    <el-header>
<!-- 头部 -->
      <div>
      <img src="~@/assets/ji.png" alt="" />
        <span>济病通后台管理</span>
      </div>
      <el-button type="primary" @click="logout">退出</el-button>
    </el-header>
    <!-- 主体部分 -->
    <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse ? '64px' : '200px'" >
        <div class="toggle-button" @click="togleCollapse">
          <span style="text-align: center;display:block;">||||</span>
        </div>
        <!-- 菜单 -->
        <el-menu

      background-color="#373f41"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="$route.path"
      :router="true"
      :collapse="isCollapse">

      <el-submenu index="1">
          <!-- 一级菜单模板 -->
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>用户管理</span>
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
          <span>帮助中心管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">问题管理</template>
          <el-menu-item index="/problemAdd">
            <i class="el-icon-edit"></i>
            <span slot="title">添加问题</span>
          </el-menu-item>
          <el-menu-item index="/problemList">
            <i class="el-icon-s-opportunity"></i>
            <span slot="title">常见问题列表</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">反馈管理</template>
          <el-menu-item index="/report">
            <i class="el-icon-s-claim"></i>
            <span slot="title">反馈列表</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-check"></i>
          <span>资讯审核</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/message">
            <i class="el-icon-chat-dot-square"></i>
            <span slot="title">资讯列表</span>
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
  data () {
    return {
      menuList: [],
      iconObj:
            {

            },
      // 选择不折叠
      isCollapse: false,
      activePath: ''
    }
  },
  created () {
    this.getMenuList()
    /* this.activePath = window.sessionStorage.getItem('activePath') */
  },
  methods: {
    logout () {
      sessionStorage.clear()
      this.$router.push('/login')
      location.reload()
    },
    // 获取菜单
    async getMenuList () {
      /* const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      // console.log(res) */
    },
    togleCollapse () {
      this.isCollapse = !this.isCollapse
    }// 菜单折叠展开
  }

}
</script>

<style  scoped>
.el-container {
  height: 100%;
}
.el-header{
  background-color: #373f41;
  display: flex;
  justify-content: space-between;
  padding-left:0;
  align-items: center;
  color: #fff;
  font-size:20px;
}
   div{
    display: flex;
    align-items: center;
  }

  img{
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

.toggle-button{
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color:#fff;

  cursor:pointer;

}

</style>
