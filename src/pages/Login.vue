<script setup>
import Navbar from '../components/Navbar.vue'
</script>
<template>
  <header>
    <Navbar/>
  </header>
  <div class="login">
    <h3 class="text-center lead " style="font-size:40px; padding: 30px">Welcome</h3>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Username</span>
      <input type="text" class="form-control" placeholder="Username" aria-label="Username"
             aria-describedby="basic-addon1">
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Password</span>
      <input type="text" class="form-control" placeholder="Password" aria-label="Password"
             aria-describedby="basic-addon1">
    </div>
    <div>
      <button type="button" class="btn btn-secondary">Login</button>
    </div>
  </div>
</template>

<style scoped>
.login{
  margin: auto;
  margin-top: 10%;
  width:30%;
  padding: 10px;
}
.welcome{
  margin:auto;
  margin-top: 30px;
  width:30%;

}
</style>