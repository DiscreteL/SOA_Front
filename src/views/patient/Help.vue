<template>
  <div class="home-container">
    <UserHomeNav></UserHomeNav>
  </div>
</template>

<script>
import UserHomeNav from "@/components/userhomenav.vue";

export default {
  name: "Help",
  components: {
    UserHomeNav,
  },

};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

</style>
