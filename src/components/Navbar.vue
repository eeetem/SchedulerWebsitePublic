<script>
import app from "../api/firebase";
import {getAuth, signOut} from "firebase/auth";
import { getFunctions} from 'firebase/functions';
const functions = getFunctions(app);
const auth = getAuth(app);
const user = auth.currentUser;

export default {
  data() {
  },
  methods: {
    logout(){
      console.log("loggin out")
      signOut(auth).then(() => {
        this.$router.push('/');
      }).catch((error) => {
        console.log("error: "+error)
        // An error happened.
      });
    },
  }

}
</script>

<template>
  <h1>
    <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Scheduler</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/home" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/friends" class="nav-link" >Friends</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/timetable" class="nav-link" >Timetable</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/settings" class="nav-link" >Settings</router-link>
            </li>
          </ul>
          <div class="btn-group">
            <button @click="logout" class="btn btn-light">Log Out</button>
          </div>
        </div>
      </div>
    </nav>
  </h1>
</template>

<style scoped>
.navbar-brand {
 font-size: 40px;
  color: white;

}

.nav-item{
  margin-left:10px;
  font-size: 20px;
  color: white;
}
nav-link{
  color:white;
}

.d-flex{
  margin-right:10%;
}
</style>
