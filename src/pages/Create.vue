<script setup>
import Navbar from '../components/Navbar.vue'
</script>
<script>
import UserDetails from '../components/UserDetails.vue'
import CourseDetails from '../components/CourseDetails.vue'

export default {
  components: {
    'userDetails': UserDetails,
    'courseDetails': CourseDetails
  },
  data() {
    return {
      component: 'userDetails'
    }
  }
}
</script>
<template>
  <header>
    <Navbar/>
  </header>
  <div class="row">
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
  <div class="col" style="padding-top: 10px; margin-left: 25%">
    <button v-on:click="component='courseDetails'" class="btn btn-dark" type="create">Continue</button>
  </div>
</template>
<style scoped>
</style>