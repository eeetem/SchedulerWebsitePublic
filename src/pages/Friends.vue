<script setup>
import Navbar from '../components/Navbar.vue'
</script>
<script>
import app from "../api/firebase";
import {getAuth} from "firebase/auth";
import { getFunctions , httpsCallable} from 'firebase/functions';
const functions = getFunctions(app);
export default {
  created() {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (!user) {
      //we're not logged in so go to login screen
      this.$router.push('/login');
      return;
    }
    //otherwise get friend list
    const dataRequest = httpsCallable(functions, 'GetUserData');
    dataRequest({userid:user.uid}).then((result) => {
      // Read result of the Cloud Function.
      const friendList = result.data;
      console.log(friendList);
      //todo use the friendlist varible to generate the list of friends

    });
    const firendsRequest = httpsCallable(functions, 'GetFirends');
    firendsRequest().then((result) => {
      // Read result of the Cloud Function.
      const friendList = result.data;
      console.log(friendList);
      //todo use the friendlist varible to generate the list of friends

    });
  },
  addFriend() {

  },
  removeFriend(){

  },
};

</script>
<template>
  <header>
    <Navbar/>
  </header>

  <div class="container-fluid">
    <div class="row row-no-gutters">
      <div class="col-sm-4 col-md-4 col-lg-3 profile">
        <h2>Your Profile</h2>
        <img src="../assets/Grannygun.jpg" class="profile_pics rounded-circle" alt="Chania" >
        <h5>Stephen O'Connor <router-link to="" class="btn btn-light" align="right">Edit Profile</router-link></h5>
        <p>Friends: 53<br>
           Course: BCT<br>
           Year: 2<br>
        </p>data
      </div>
      <div class="col-sm-4 col-md-4 col-lg-6 whoOn" align="left">
        <div>
          <h2>Friends</h2>
          <ul class="list-group list-group-flush" >
            <li class="list-group-item list-group-item-action"> <img src="../assets/img_chania.jpg" class="profile_pics rounded-circle" alt="Chania">Dennis</li>
            <li class="list-group-item list-group-item-action"><img src="../assets/egg.jpg" class="profile_pics rounded-circle" alt="Chania">Aaron</li>
            <li class="list-group-item list-group-item-action"> <img src="../assets/Grannygun.jpg" class="profile_pics rounded-circle" alt="Chania">Tom</li>
            <li class="list-group-item list-group-item-action"><img src="../assets/Grannygun.jpg" class="profile_pics rounded-circle" alt="Chania">Seamus</li>
          </ul>
        </div>

      </div>
      <div class="col-sm-4 col-md-4 col-lg-3 friends " align="left">
        <div>
          <h2>Recommended Friends</h2>
          <ul class="list-group list-group-flush" >
            <li class="list-group-item list-group-item-action"> <img src="../assets/default-profile.jpg" class="profile_pics rounded-circle" alt="Chania"> John Murphy</li>
            <li class="list-group-item list-group-item-action"><img src="../assets/default-profile.jpg" class="profile_pics rounded-circle" alt="Chania"> Mary Jane</li>
            <li class="list-group-item list-group-item-action"> <img src="../assets/default-profile.jpg" class="profile_pics rounded-circle" alt="Chania"> Jon Doe</li>
            <li class="list-group-item list-group-item-action"><img src="../assets/default-profile.jpg" class="profile_pics rounded-circle" alt="Chania"> Harry Barry</li>
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
  outline:1px solid rgb(197, 196, 196);
}
.profile_pics{
  height: 75px;
  width: 75px;
}
.pills{
  color: #312e2e;
}


</style>