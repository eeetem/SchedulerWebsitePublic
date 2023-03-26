<script setup>
import Navbar from '../components/Navbar.vue'
</script>
<script>
import FriendsList from "@/components/FriendsList.vue";

export default {
  name: "app",
  components: {
    FriendsList,
  }
}
</script>
<template>
  <header>
    <Navbar/>
  </header>
  <div class="container-fluid">
    <div class="row row-no-gutters">
      <div class="col-sm-4 col-md-4 col-lg-3 profile">
        <h1>Profile</h1>
        <ul class="nav nav-pills flex-column">
          <li class="nav-item">
            <router-link class="nav-link active pills" aria-current="page" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/Friends">Friends</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/settings">Settings</router-link>
          </li>
        </ul>
      </div>
      <div class="col-sm-4 col-md-4 col-lg-6 whoOn">
        <h1 align="center">Who's On</h1>
        <div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item list-group-item-action">Aaron is available</li>
            <li class="list-group-item list-group-item-action">Dennis will be available in 10 minutes </li>
            <li class="list-group-item list-group-item-action">Stephen is not available today at anytime</li>
            <li class="list-group-item list-group-item-action">Paul: Next time available in 10 hours and 45 minutes</li>

          </ul>
        </div>

      </div>
      <div class="col-sm-4 col-md-4 col-lg-3 profile">
      <div id="app">
        <h2>Friends</h2>
        <ul className="list-group list-group-flush">
          <div class="d-flex justify-content-center" id="spinner">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <friends-list></friends-list>
        </ul>
      </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

.whoOn{
  outline: 1px solid rgb(197, 197, 197);
}
.profile{
  outline: 1px solid rgb(197, 197, 197);
}

.friends{
  outline:1px solid rgb(197, 197, 197);
}
.profile_pics{
  height: 75px;
  width: 75px;
}
.pills{
  background-color: #e80d0d;
  width: 100px;
}

.nav-pills .nav-link.active, .nav-pills .show>.nav-link {
  color: #ffffff;
  background-color: #6b747d;
}

.nav-link{
  color: #181818;
}

</style>