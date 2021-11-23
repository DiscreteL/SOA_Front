<template>
  <div class="container">
    <Navigation></Navigation>
    <div class="head">
        <img src="@/assets/bg.png" alt="">
        头像 用户名
        </div>
    <el-container>
      <el-header>头部</el-header>
      <el-aside>aside</el-aside>
      <el-main>main</el-main>
    </el-container>
  </div>
</template>

<script>
import Navigation from "@/components/navigation.vue";

export default {
  name: "UserHome1",
  components: {
    Navigation,
  },
};
</script>

<style scoped>
</style>