<script setup>
import Navbar from '../components/Navbar.vue'
</script>
<script>
import app from "../api/firebase";
import {getAuth} from "firebase/auth";
import {getFunctions, httpsCallable} from 'firebase/functions';
import FriendsList from "@/components/FriendsList.vue";

const auth = getAuth(app);
const user = auth.currentUser;

const functions = getFunctions(app);
export default {
  name: "app",
  components: {
    FriendsList,
  },
  methods: {
    setUserData() {
      let username = document.getElementById("username");
      username.innerHTML = user.email;
    },
    mounted() {
      this.setUserData()
    },
    created()
      {
        const auth = getAuth(app);
        const user = auth.currentUser;
        if (!user) {
          //we're not logged in so go to log in screen
          this.$router.push('/login');
          return;
        }
        const friendsRequest = httpsCallable(functions, 'GetFirends');
        friendsRequest().then((result) => {
          // Read result of the Cloud Function.
          const friendList = result.data;
          for (const friendListKey in friendList) {
            const dataRequest = httpsCallable(functions, 'GetUserData');
            dataRequest({user}).then((result) => {
              // Read result of the Cloud Function.
              const userdata = result.data;
              console.log(userdata);
            });
          }
        });
      }
  },
  addFriend() {

  },
  removeFriend() {

  }
};

</script>
<template>
  <header>
    <Navbar/>
  </header>
  <div className="container-fluid">
    <div className="row row-no-gutters">
      <div className="col-lg-3 profile">
        <h2>Your Profile</h2>
        <img src="../assets/Grannygun.jpg" className="profile_pics rounded-circle" alt="Chania">
        <h5 id="username">
          Stephen O'Connor
        </h5>
        <router-link to="" className="btn btn-light" align="right">Edit Profile</router-link>
        <p>Friends:<br>
          Course: BCT<br>
          Year: 2<br>
        </p>data
      </div>
      <div className="col-lg-6 whoOn" align="left">
        <div id="app">
          <h2>Friends</h2>
          <ul>
            <friends-list></friends-list>
          </ul>
        </div>

      </div>
      <div className="col-lg-3 friends " align="left">
        <div>
          <h2>Recommended Friends</h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item list-group-item-action"><img src="../assets/default-profile.jpg"
                                                                        className="profile_pics rounded-circle"
                                                                        alt="Chania">
              John Murphy
            </li>
            <li className="list-group-item list-group-item-action"><img src="../assets/default-profile.jpg"
                                                                        className="profile_pics rounded-circle"
                                                                        alt="Chania">
              Mary Jane
            </li>
            <li className="list-group-item list-group-item-action"><img src="../assets/default-profile.jpg"
                                                                        className="profile_pics rounded-circle"
                                                                        alt="Chania">
              Jon Doe
            </li>
            <li className="list-group-item list-group-item-action"><img src="../assets/default-profile.jpg"
                                                                        className="profile_pics rounded-circle"
                                                                        alt="Chania">
              Harry Barry
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.whoOn {
  outline: 1px solid rgb(197, 197, 197);
}

.profile {
  outline: 1px solid rgb(197, 197, 197);
}

.friends {
  outline: 1px solid rgb(197, 196, 196);
}

.profile_pics {
  height: 75px;
  width: 75px;
}

.pills {
  color: #312e2e;
}

.pills {
  background-color: #e80d0d;
  width: 100px;
}


</style>