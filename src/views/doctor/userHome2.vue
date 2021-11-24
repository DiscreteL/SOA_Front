<template>
  <div class="container">
    <Navigation></Navigation>
    <docHomeNav></docHomeNav>
  <div class="content">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import Navigation from "@/components/navigation.vue";
import docHomeNav from "@/components/docHomeNav.vue";

export default {
  name: "UserHome2",
  components: {
    Navigation,
    docHomeNav,
  },
};
</script>

<style scoped>
.content{
  left: 0;
  right: 0;
  margin-top: 25%;
  bottom: 0;
  overflow-y: scroll;
}
</style>