<template>
  <el-container>
    <el-header id="header" >
        <el-row :gutter="20" type="flex">
             <el-col :span="5">
               <img id="logo" alt="logo" src="~@/assets/ji.png" width="250px"/>
               </el-col>

        <el-col :span="4">
      <el-menu 
      class="top-nav" 
      mode="horizontal"
      router
      :default-active="this.$route.path"
      >
  <el-menu-item index="/" >首页</el-menu-item>
  <el-menu-item index="/SearchList/" >分类</el-menu-item>
</el-menu>

        </el-col>
        <el-col :span="5">
            <el-input
  placeholder="搜索演出、电影"
  v-model="input"
  clearable style="width:250px" maxlength="15">
</el-input>
        </el-col>
<el-col :span="1">
    <el-button circle icon="el-icon-search" @click="handleSearch()"></el-button>
</el-col>
<el-col :span="5">
  <el-dropdown v-if="isLogin">
    <span>
      <el-avatar icon="el-icon-user-solid" id="userimage" src="https://perico.damai.cn/userheadphotos/577160/115432124.jpg?r=0.5669333114520436">

        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/></el-avatar> <!--以后要换成用户头像-->
    </span>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="gotoLink('/CustomerInfoCenter/'+id)">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="gotoLink('/Orders/'+id)"> 订单管理</el-dropdown-item>
          <el-dropdown-item @click.native="gotoLink('/NoticeBoard/'+id)">查看通知</el-dropdown-item>
          <el-dropdown-item id="logout" @click.native="logout()">退出</el-dropdown-item>
        </el-dropdown-menu>
  </el-dropdown>
  <user-reg-login v-else></user-reg-login>
</el-col>
        </el-row>
    </el-header>
    <el-main>
         <router-view></router-view>
    </el-main>

    <el-footer>
        小麦网 Copyright 2021 DB Principle Project
        <el-button type="text" @click="gotoLink('/BackendLogin')">后台登录/注册</el-button>
    </el-footer>
  </el-container>
</template>

<script>
import axios from 'axios'
// import UserRegLogin from "@/views/CusRegLogin/userRegLogin"
// import {Base64} from "js-base64";
export default {
// name:"CustomerIndex",
//   components: {UserRegLogin},
//   data() {
//       return {
//           input: '',
//       }
//     },
//     created:function()
//     {
//       console.log(Base64.decode("aHR0cHM6Ly9pbWFnZS5iYWlkdS5jb20vc2VhcmNoL2RldGFpbD9jdD01MDMzMTY0ODAmej0wJmlwbj1kJndvcmQ9JUU3JUJBJUEyJUU4JTg4JUI5JTIwJUU3JTk0JUI1JUU1JUJEJUIxJnN0ZXBfd29yZD0maHM9MCZwbj0yJnNwbj0wJmRpPTc0ODAwJnBpPTAmcm49MSZ0bj1iYWlkdWltYWdlZGV0YWlsJmlzPTAlMkMwJmlzdHlwZT0yJmllPXV0Zi04Jm9lPXV0Zi04JmluPSZjbD0yJmxtPS0xJnN0PS0xJmNzPTEyNzg0MjQwMDklMkMxMDU4OTE3MzImb3M9Mzc3OTE5NDA3NyUyQzI5NjkxNzE2NzEmc2ltaWQ9MCUyQzAmYWRwaWNpZD0wJmxwbj0wJmxuPTYzNCZmcj0mZm1xPTE2MjYxODAxMjQwOTFfUiZmbT1yZXN1bHQmaWM9JnM9dW5kZWZpbmVkJmhkPTAmbGF0ZXN0PTAmY29weXJpZ2h0PTAmc2U9JnNtZT0mdGFiPTAmd2lkdGg9JmhlaWdodD0mZmFjZT11bmRlZmluZWQmaXN0PSZqaXQ9JmNnPSZiZHR5cGU9MCZvcmlxdWVyeT0mb2JqdXJsPWh0dHBzJTNBJTJGJTJGZ2ltZzIuYmFpZHUuY29tJTJGaW1hZ2Vfc2VhcmNoJTJGc3JjJTNEaHR0cCUzQSUyRiUyRmkxLmdvMnlkLmNvbSUyRmltYWdlLnBocCUzRnR5cGUlM0R0aHVtYm5haWxfMzc1eDAwMCUyNnVybCUzRGh0dHBzJTI1M0ElMjUyRiUyNTJGc2kxLmdvMnlkLmNvbSUyNTJGZ2V0LWltYWdlJTI1MkYwcThXcXkzOEtTYyUyNnJlZmVyJTNEaHR0cCUzQSUyRiUyRmkxLmdvMnlkLmNvbSUyNmFwcCUzRDIwMDIlMjZzaXplJTNEZjk5OTklMkMxMDAwMCUyNnElM0RhODAlMjZuJTNEMCUyNmclM0QwbiUyNmZtdCUzRGpwZWclM0ZzZWMlM0QxNjI4NzcyMTI4JTI2dCUzRGQ4Zjc3MTk4NWY3NWM0OTgzY2Q0NDRjMzEyYzBmOWY2JmZyb211cmw9aXBwcl96MkMlMjRxQXpkSDNGQXpkSDNGb29vX3olMjZlM0J5dDF0d2d6dHg3Z196JTI2ZTNCdjU0QXpkSDNGdzZwdHZzakF6ZEgzRmFVbXJ3cUZEJTNGZiUzRHk3ZzVmJmdzbT00JnJwc3RhcnQ9MCZycG51bT0wJmlzbGlzdD0mcXVlcnlsaXN0PSZub2pjPXVuZGVmaW5lZA=="))
//       this.checkLogin()
//       this.getVIP()
//     },
//     methods:
//     {
//      async checkLogin()
//       {
//         await axios.post(this.checkURL).then(
//           (response)=>
//           {
//             if(response.status===200)
//             return true
//           }
//         ).catch(
//           (err) =>
//           {
//             console.log(err)
//              return false
//           }
//         )
//       },
//       async getVIP(){
//         axios.get("/VIPInfo/"+sessionStorage.getItem('cusId')).then(res=>{
//           if(res.status===200){
//             sessionStorage.setItem("discount",res.data.value.discount)
//             sessionStorage.setItem("level",res.data.value.level)
//             sessionStorage.setItem("point",res.data.value.point)
//           }
//         }).catch(e=>{
//             sessionStorage.setItem("level",0)
//             sessionStorage.setItem("point",0)
//             sessionStorage.setItem("discount",1)
//           console.log(e)
//         })
//       },

//       gotoLink(r)
//       {
//         this.$router.push(r)
//       },
//       handleSearch()
//       {
//         this.gotoLink("/SearchList/"+this.input.toString())
//       },
//       logout()
//       {
//         sessionStorage.clear()
//         this.$router.push('/')
//         location.reload()
//       }
//     },
//   computed:{
//     id:function () {
//       return sessionStorage.getItem("cusId")
//     },
//     isLogin:function ()
//     {
//       return sessionStorage.getItem("isLogin")
//     },
//     checkURL:function () {
//       return '/MainLogin?_token='+sessionStorage.getItem("token")
//     },
//     avatar:function () {
//       return sessionStorage.getItem("image")
//     }
//   }
}
</script>

<style>
.el-header {
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .el-footer {
    text-align: center;
    line-height: 60px;
    font-size: 7px;
  }
  .el-main{
    height: 650px;
  }
  #logout{
    color:red;
  }
  #destroy{
    color:red;
  }
  #logo{
    padding-bottom: 15px;
    height: 60px;
  }
  #header{
    height: 70px;
  }

  #userimage{
    margin-top: 10px;
  }
</style>