<script setup>
import Navbar from '../components/Navbar.vue'
</script>
<script>
import FriendsList from "@/components/FriendsList.vue";
import {getFunctions, httpsCallable} from 'firebase/functions';
import {getAuth} from "firebase/auth";
import app from "@/api/firebase";
const auth = getAuth(app);
const user = auth.currentUser;
const functions = getFunctions(app);
const upStatus = httpsCallable(functions, 'UpStatus');
upStatus(user.uid).then((result) => {
  console.log(result.data.response);
});

let friendUserID;

export default {
  name: "app",
  components: {
    FriendsList,
  },

  mounted() {
    this.friendsActivity();
  },

  methods:{
    friendsActivity(){
      let available;
      let availableNext;
      let currentActivity;
      let nextActivity;
      let nextActivityTime;

      const friendsRequest = httpsCallable(functions, 'GetFirends');
      friendsRequest().then((result) => {
        const friendList = result.data;
        if (friendList.length != 0) {
          for (const friendListKey in friendList) {
            const dataRequest = httpsCallable(functions, 'GetUserData');
            dataRequest({userid: friendList[friendListKey]}).then((result) => {
              const userdata = result.data;
              let friends = document.createElement("li");// creating the elements
              let friendsPfp = document.createElement("img");
              let friendsName = document.createTextNode(userdata['username']);
              friendUserID = friendList[friendListKey];
              friendsPfp.style.height = "30px";
              friendsPfp.style.width = "30px";
              friendsPfp.classList.add("rounded-circle");
              friendsPfp.src += userdata['pfpURL'];
              friends.classList.add("list-group-item");
              friends.classList.add("list-group-item-action");
              friends.appendChild(friendsPfp);
              friends.appendChild(friendsName);
              friends.style.paddingTop ="20px";
              document.getElementById('friendsName').appendChild(friends);

              const upStatus = httpsCallable(functions, 'UpStatus');
              upStatus(friendUserID).then((result) => {
                console.log(result.data.response);
                available = result.data.response['status'];
                availableNext = result.data.response['freeIn'];
                currentActivity = result.data.response["activity"];
                nextActivity = result.data.response["nextactivity"];
                nextActivityTime = result.data.response["busyIn"];
                console.log("Data " + available);

                let nextAvailable;
                let nextModule;

                if(available == "busy"){
                  available = currentActivity;
                }

                if(availableNext == null){
                  availableNext = "All Day";
                  nextAvailable = '<div style="padding-top: 20px">' + availableNext + '</div>'
                }
                else{
                  nextAvailable = '<div style="padding-top: 20px">' + availableNext +":00" + '</div>'
                }

                if(nextActivity == null){
                  nextActivity = "Tomorrow"
                  nextModule = '<div style="padding-top: 20px">' + nextActivity + '</div>'
                }
                else{
                  nextModule = '<div style="padding-top: 20px">' + nextActivity + " at " + nextActivityTime + ":00" + '</div>'
                }

                let statusInformation = '<div style="padding-top: 20px">' + available +
                    '<div class="rounded-circle" style="background-color: green; width: 40px; height: 40x;"></div></div>';

                document.getElementById("nextActivity").innerHTML += nextModule;
                document.getElementById('availabilityNow').innerHTML += statusInformation;
                document.getElementById("availabilityNext").innerHTML += nextAvailable;
              });
            });
          }
        } else {
            document.getElementById("noFriends").style.display = 'block';
        }
      });
    }
  }
}
</script>
<template>
  <header>
    <Navbar/>
  </header>
  <body style="height: 100%">
  <div class="container-fluid">
    <div class="row row-no-gutters">
      <div class="col-sm-4 col-md-4 col-lg-2 profile" style="height: 600px">
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
      <div class="col-sm-3 col-md-3 col-lg-7 whoOn">
        <h1 align="center">Who's Available</h1>
        <div id="friendsOnline">
          <div class="row">
            <div class="col" style="text-align: left; padding: 20px;">
              <h7 style="display: inline-block" class="navbar-brand" ><strong>Friends</strong></h7>
              <div id="friendsName" style="padding-top: 20px; margin-left:10px">
              </div>
            </div>

            <div class="col" style="text-align: center; padding: 20px">
              <h7 style="display: inline-block"><strong>Status</strong></h7>
              <div id="availabilityNow" style="padding-top: 20px">
              </div>
            </div>

            <div class="col" style="text-align: right; padding: 20px">
              <h7 style="display: inline-block;"><strong>Available</strong></h7>
              <div id="availabilityNext" style="padding-top: 20px">
              </div>
            </div>
              <div class="col" style="text-align: right; padding: 20px">
                <h7 style="display: inline-block;"><strong>Next module</strong></h7>
                <div id="nextActivity" style="padding-top: 20px">
                </div>
              </div>
            </div>
          <div id="noFriends" style="display: none; padding: 20px">
            <h3 style="text-align: center">Welcome to Scheduler</h3>
            <p style="text-align: center">This is where you can view your Friends activity</p>
            <p style="text-align: center">Add Friends to get started!</p>
          </div>
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
  <footer>
    <div style="background-color: grey">
    </div>
  </footer>
  </body>
</template>

<style scoped>

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