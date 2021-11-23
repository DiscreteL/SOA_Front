<template>
  <div class="container">
    <Navigation></Navigation>
    <UserHomeNav></UserHomeNav>
</div>
</template>

<script>
import Navigation from "@/components/navigation.vue";
import UserHomeNav from "@/components/userhomenav.vue";

export default {
  name: "UserHome1",
  components: {
    Navigation,
    UserHomeNav,
  },
};
</script>

<style scoped>

</style>