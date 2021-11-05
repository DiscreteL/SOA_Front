<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Navigation/>
  </div>
</template>

<script>
import Navigation from '@/components/navigation.vue'

export default {
  name: 'Home',
  components: {
    Navigation,
  }
}
</script>
