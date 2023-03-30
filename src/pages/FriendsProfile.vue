<script setup>
import Navbar from '../components/Navbar.vue'
</script>
<script>
import {getAuth} from "firebase/auth";
import FriendsList from "@/components/FriendsList.vue";
import {httpsCallable,getFunctions,connectFunctionsEmulator} from "firebase/functions";
import app from "@/api/firebase";
const functions = getFunctions(app);
const auth = getAuth(app);
const user = auth.currentUser;
connectFunctionsEmulator(functions,"localhost",5001)

export default {
  name: "app",
  created() {
    console.log(this.getUserName());
    this.getUserData(this.getUserName());
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
    getUserData(username) {
      const dataRequest = httpsCallable(functions, 'GetUserData');
      dataRequest({username: username}).then((result) => {
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

        let timetable = document.getElementById('timetable');
        timetable.innerHTML = userdata['timetable'];
      });
    },
    getUserName(){
      const params = window.location.search;
      let newparams = params.replace("?","");
      return newparams;
    },
    addFriend() {

    }
    ,
    removeFriend() {

    }
}
}

</script>
<template>
  <header>
    <Navbar/>
  </header>
  <div className="container-fluid">
    <div className="row row-no-gutters">
      <div className="col-lg-3">
        <img id="pfp" src="" className="profile_pics rounded-circle">
        <h5 id="username"></h5>

        <div id="pCourse">
        </div>
        <div id="pYear">
        </div>
        <div id="pBio">
        </div>
      </div>

        <div class="col-lg-6" style="width: 56%; margin-left:30px; padding: 20px; padding: 15px; overflow-x: auto ">
          <table class="table table-striped-columns table-responsive center" id="timetable"></table>
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
  height: 250px;
  width: 250px;
}

.pills {
  color: #312e2e;
}

.pills {
  background-color: #e80d0d;
  width: 100px;
}
</style>