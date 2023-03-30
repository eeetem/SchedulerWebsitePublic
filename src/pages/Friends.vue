<script setup>
import Navbar from '../components/Navbar.vue'
</script>
<script>
import {getAuth} from "firebase/auth";
import FriendsList from "@/components/FriendsList.vue";
import {httpsCallable, getFunctions} from "firebase/functions";
import app from "@/api/firebase";

const functions = getFunctions(app);
const auth = getAuth(app);
const user = auth.currentUser

export default {
  name: "app",
  created() {
    this.getUserData()
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (!user) {
      //we're not logged in so go to log in screen
      this.$router.push('/login');
    }
  },
  components: {
    FriendsList,
  },
  data() {
    return {}
  },
  methods: {
    getUserData() {
      const dataRequest = httpsCallable(functions, 'GetUserData');
      dataRequest().then((result) => {
        const userdata = result.data;
        console.log(userdata);

        let userID = userdata['username'];
        let userPFP = userdata['pfpURL'];
        let courseCode = userdata['courseCode'];
        let userYear = userdata['year'];
        let userBio = userdata['bio'];
        let userTimetable = userdata['timetable'];

        let userName = '<h3 style="padding: 10px;">' + userID + '</h3>';
        let pfp = '<div style="padding-left: 10px;">' + '<img src = "' + userPFP + '" style="width: 80px; height: 80px; border: solid" class="rounded-circle">' + '</div>';
        let course = '<div class="row" style="padding: 10px; display: inline-block; color:black;">' + '<strong>' + "Course:" + '</strong>' + '<div style="margin-left: 5px;">' + courseCode + '</div>' + '</div>';
        let year = '<div class="row" style="padding: 10px; display: inline-block; color:black;">' + '<strong>' + "Year:" + '</strong>' + '<div style="margin-left: 5px;">' + userYear + '</div>' + '</div>';
        let bio = '<div class="row" style="padding: 10px; display: inline-block; color:black;">' + '<strong>' + "Bio:" + '</strong>' + '<div style="margin-left: 5px;">' + userBio + '</div>' + '</div>';

        document.getElementById('username').innerHTML = userName;
        document.getElementById('pfp').innerHTML = pfp;
        document.getElementById('pCourse').innerHTML = course;
        document.getElementById('pYear').innerHTML = year;
        document.getElementById('pBio').innerHTML = bio;
        document.getElementById("timetable").innerHTML = userTimetable;
        



      });

    },

    addFriend() {

    }
    ,
    removeFriend() {

    }
  },
}

</script>
<template>
  <header>
    <Navbar/>
  </header>
  <div className="container-fluid">
    <div className="row row-no-gutters">
      <div className="col-lg-2 profile">
        <h2 style="padding: 10px" class="display-6">My Profile</h2>
        <div id="pfp">

        </div>
        <h5 id="username"></h5>
        <div style="padding: 10px">
          <div id="pCourse"
               style="border: solid; color:lightgray; border-radius: 5px;">
          </div>
        </div>

        <div style="padding: 10px">
          <div id="pYear" style="border: solid; color:lightgray; border-radius: 5px;">
          </div>
        </div>

        <div style="padding: 10px">
          <div id="pBio" style="border: solid; color:lightgray; border-radius: 5px;">
          </div>
        </div>
        <router-link to="/settings" className="btn btn-secondary" align="right" style=" margin-left: 10px; margin-top: 20px">Edit
        </router-link>
        <br>


      </div>

      <div className="col-lg-8 whoOn" align="left" style="padding: 20px">
        <h3 style="padding-bottom: 10px; padding-left: 60px">Your Timetable</h3>
        <blockquote style="padding-bottom: 10px; padding-left: 60px">-To edit your Timetable navigate to the Timetable tab</blockquote>
        <table class="table table-striped-columns table-responsive center" id="timetable"
               style="width: 800px; margin: auto">

        </table>
      </div>

      <div className="col-lg-2 friends " align="left">
        <h2 style="padding: 10px">Friends</h2>
        <div id="app">
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

.whoOn {
  border-left: 1px solid rgb(197, 197, 197);
  padding: 10px;
  height: 700px
}


.friends {
  border-left: 1px solid rgb(197, 197, 197);
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