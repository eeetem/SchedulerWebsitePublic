<script>
import app from "../api/firebase";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {getFunctions, httpsCallable} from 'firebase/functions';

const functions = getFunctions(app);
const auth = getAuth(app);
const user = auth.currentUser;

export default {
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    created() {
      if (user) {
        //we're logged in so redirect to the home page
        this.$router.push('/Home');
        this.$router.push('/Home');
      }
    },
    create() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("success, user created with email:" + user.email);
            // ...
            var userData = {};
            userData["firstName"] = "john"
            userData["surName"] = "smith"
            userData["dob"] = "03/05/2000"
            userData["courseCode"] = "gy350"
            //todo prompt the user for this data and make it look nice
            await new Promise(r => setTimeout(r, 2000));//sleep for 2 seconds in order to let the server create the user first
            const dataUpload = httpsCallable(functions, 'SubmitUserData');
            dataUpload(userData).then((result) => {
              console.log(result.data);
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage)
            // ..
          });
    },
    login() {
      let verify = document.getElementById("loginCheck")
      signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("logged in as " + user.email)
            console.log(user);
            this.$router.push('/home');
            verify.innerHTML = '<div class="alert alert-success" role="alert" style="height: 40px; padding: 5px; text-align: center">' +
                "Login Successful" + ' </div>';
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage);
            verify.innerHTML = '<div class="alert alert-danger" role="alert" style="height: 35px; padding: 5px; text-align: center">' +
                "Incorrect Details" + ' </div>';
          });
    },

  }
}

</script>
<template>
  <header>
    <h1>
      <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Scheduler</a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
          </div>
        </div>
      </nav>
    </h1>
  </header>
  <div class="login" style="text-align: center; width: 300px">
    <h3 class="lead" style="font-size:40px; padding:30px">Welcome</h3>
    <h5 style="text-align: left">Sign in</h5>
    <div class="input-group mb-3">
      <input v-model="email" type="text" class="form-control" placeholder="Username" aria-label="Username"
             aria-describedby="basic-addon1">
    </div>
    <div class="input-group mb-3">
      <input v-model="password" type="password" class="form-control" placeholder="Password" aria-label="Password"
             aria-describedby="basic-addon1">
    </div>
    <div id="loginCheck" style="position: center"></div>
    <div class="row" style="text-align: left">
      <div class="col-md">
        <button type="button" class="btn btn-secondary" @click="login">Login</button>
        <router-link to="/create" type="button" class="btn btn-secondary" style="margin-left: 5px" @click="create">
          Register
        </router-link>
      </div>
    </div>
  </div>
</template>
<style scoped>
.login {
  margin: auto;
  margin-top: 10%;
  padding: 10px;
}

.navbar-brand {
  font-size: 40px;
  color: white;

}

.nav-item {
  margin-left: 10px;
  font-size: 20px;
  color: white;
}

nav-link {
  color: white;
}
</style>