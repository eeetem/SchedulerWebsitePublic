<script setup>
import Navbar from '../components/Navbar.vue'
</script>
<script>
import app from "../api/firebase";
import {getAuth} from "firebase/auth";
import { getFunctions , httpsCallable} from 'firebase/functions';
import FriendsList from "@/components/FriendsList.vue";
const functions = getFunctions(app);
export default {
  name: "app",
  components:{
    FriendsList,
  },
  created() {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (!user) {
      //we're not logged in so go to login screen
      this.$router.push('/login');
      return;
    }
    //otherwise get friend list
      const friendsRequest = httpsCallable(functions, 'GetFirends');
      friendsRequest().then((result) => {
        // Read result of the Cloud Function.
        const friendList = result.data;
        for (const friendListKey in friendList) {
          let friends = document.createElement("li");
          friends.innerHTML += friendList[friendListKey];
          document.getElementById('friends').appendChild(friends);
          console.log(friendList);
          const dataRequest = httpsCallable(functions, 'GetUserData');
          dataRequest({userid: friendListKey}).then((result) => {
            // Read result of the Cloud Function.
            const userdata = result.data;
            console.log(userdata);
          });
        }
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
      <div class="col-lg-3 profile">
        <h2>Your Profile</h2>
        <img src="../assets/Grannygun.jpg" class="profile_pics rounded-circle" alt="Chania" >
        <h5>Stephen O'Connor <router-link to="" class="btn btn-light" align="right">Edit Profile</router-link></h5>
        <p>Friends:<br>
           Course: BCT<br>
           Year: 2<br>
        </p>data
      </div>
      <div class="col-lg-6 whoOn" align="left">
        <div id="app">
          <h2>Friends</h2>
          <ul id="friends">

          </ul>
        </div>

      </div>
      <div class="col-lg-3 friends " align="left">
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
.pills{
  background-color: #e80d0d;
  width: 100px;
}


</style>