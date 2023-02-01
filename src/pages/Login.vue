<script setup>
import Navbar from '../components/Navbar.vue'

</script>
<script>
import app from "../api/firebase";
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
const auth = getAuth(app);
const user = auth.currentUser;

if (user) {
  //we're logged in so redirect to the home page
  this.$router.push('/Home');
}
export default {
  data() {
    return {
      email:"",
      password:"",
    }
  },
  methods: {
    create() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("success, user created with email:"+user.email);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode+errorMessage)
            // ..
          });
    },
    login() {
      signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("logged in as "+user.email)
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode+errorMessage);
          });
    }
  }
}

</script>
<template>

  <header>
    <Navbar/>
  </header>
  <div class="login">
    <h3 class="text-center lead " style="font-size:40px; padding: 30px">Welcome</h3>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Username</span>
      <input v-model="email" type="text" class="form-control" placeholder="Username" aria-label="Username"
             aria-describedby="basic-addon1">
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Password</span>
      <input v-model="password" type="text" class="form-control" placeholder="Password" aria-label="Password"
             aria-describedby="basic-addon1">
    </div>
    <div>
      <button type="button" class="btn btn-secondary" @click="login">Login</button>
      <button type="button" class="btn btn-secondary" style="margin-left: 5px" @click="create">Register</button>
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
</style>