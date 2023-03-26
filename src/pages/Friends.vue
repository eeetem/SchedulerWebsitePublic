<script setup>
import Navbar from '../components/Navbar.vue'
</script>
<script>
import {getAuth} from "firebase/auth";
import FriendsList from "@/components/FriendsList.vue";
import {httpsCallable,getFunctions} from "firebase/functions";
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
    return{}
  },
  methods: {
    getUserData(){
      const dataRequest = httpsCallable(functions, 'GetUserData');
      dataRequest().then((result) => {
        const userdata = result.data;
        console.log(userdata);
        document.getElementById('username').innerHTML = userdata['username'];
        document.getElementById('pfp').src = userdata['pfpURL'];

        let course = document.createElement('p');
        course.appendChild(document.createTextNode('Course: '));
        course.appendChild(document.createTextNode(userdata['courseCode']));
        document.getElementById('pCourse').appendChild(course);

        let year = document.createElement('p');
        year.appendChild(document.createTextNode('Year: '));
        year.appendChild(document.createTextNode(userdata['year']));
        document.getElementById('pYear').appendChild(year);

        let bio = document.createElement('p');
        bio.appendChild(document.createTextNode('Bio: '));
        bio.appendChild(document.createTextNode(userdata['bio']));
        document.getElementById('pBio').appendChild(bio);
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
      <div className="col-lg-3 profile">
        <h2>My Profile</h2>
        <img id="pfp" src="../assets/Grannygun.jpg" className="profile_pics rounded-circle" alt="Chania">
        <h5 id="username"></h5>

        <div id="pCourse">
        </div>
        <div id="pYear">
        </div>
        <div id="pBio">
        </div>

        <router-link to="/settings" className="btn btn-light" align="right">Edit</router-link><br>


      </div>
      <div className="col-lg-6 whoOn" align="left">
        <div id="app" >
          <h2>Friends</h2>
          <ul className="list-group list-group-flush">
            <div class="d-flex justify-content-center" id="spinner">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <keep-alive> <friends-list></friends-list> </keep-alive>
          </ul>
        </div>

      </div>
      <div className="col-lg-3 friends " align="left">
        <div>
          <h2>Recommended Friends</h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item list-group-item-action"><img src="../assets/default-profile.jpg"
                                                                        className="profile_pics rounded-circle">
              John Murphy
            </li>
            <li className="list-group-item list-group-item-action"><img src="../assets/default-profile.jpg"
                                                                        className="profile_pics rounded-circle">
              Mary Jane
            </li>
            <li className="list-group-item list-group-item-action"><img src="../assets/default-profile.jpg"
                                                                        className="profile_pics rounded-circle">
              Jon Doe
            </li>
            <li className="list-group-item list-group-item-action"><img src="../assets/default-profile.jpg"
                                                                        className="profile_pics rounded-circle">
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