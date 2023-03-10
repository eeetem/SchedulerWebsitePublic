<script setup>
import Navbar from '../components/Navbar.vue'
</script>
<script>
import {httpsCallable,getFunctions} from "firebase/functions";
import app from "@/api/firebase";
import {getAuth} from "firebase/auth";
const functions = getFunctions(app);
const auth = getAuth(app);
const user = auth.currentUser;

export default {
  data() {
    return {}
  },
  methods: {
    swapContent(div_id){
      const main = document.getElementById('main');
      const div = document.getElementById(div_id);
      const clone = div.cloneNode(true);

      while (main.firstChild) main.firstChild.remove();

      main.appendChild(clone);
    },
    getUserData() {
      const dataRequest = httpsCallable(functions, 'GetUserData');
      dataRequest({userid: '5BkAXbsoGEYpGQ6mVycqof71nBD3'}).then((result) => {
        const userdata = result.data;
        console.log(userdata);
        document.getElementById('firstName').placeholder = userdata['firstName'];
        document.getElementById('surname').placeholder = userdata['surName'];
        document.getElementById('username').placeholder = userdata['username'];
        document.getElementById('dob').placeholder = userdata['dob'];
        document.getElementById('email').placeholder = userdata['email'];
        document.getElementById('bio').placeholder = userdata['bio'];
        document.getElementById('course').placeholder = userdata['courseCode'];
        document.getElementById('newPassword').placeholder = userdata['newPassword'];
        document.getElementById('passwordConfirm').placeholder = userdata['passwordConfirm'];

      });


    },
    submitUserData() {
      console.log('here');
      let userData = [];
        let password = document.getElementById('newPassword');
        let passwordConfirm = document.getElementById('passwordConfirm');
        let firstName = document.getElementById('firstName');
        let surName = document.getElementById('surName');
        let username = document.getElementById('username');
        let dob = document.getElementById('dob');
        let email = document.getElementById('email');

        if (password.value !== "" && passwordConfirm.value !== "") {
          if (password.value === passwordConfirm.value) {
            userData['password'] = document.getElementById("newPassword");
            password.classList.remove("is-invalid")
            password.classList.add("is-valid")
          }
          else {
            password.classList.remove("is-valid")
            password.classList.add("is-invalid")
          }
        }
        else {
          password.classList.remove("is-valid")
          password.classList.add("is-invalid")
        }
        if (firstName.value !== '') {
          userData['firstName'] = document.getElementById("firstName");
          firstName.classList.remove("is-invalid")
          firstName.classList.add("is-valid")
        }
        else {
          firstName.classList.remove("is-valid")
          firstName.classList.add("is-invalid")
        }
        if (surName.value !== '') {
          userData['surName'] = document.getElementById("surname");
          surName.classList.remove("is-invalid")
          surName.classList.add("is-valid")
        }
        else {
          surName.classList.remove("is-valid")
          surName.classList.add("is-invalid")
        }
        if (username.value !== '') {
          userData['username'] = document.getElementById("username");
          username.classList.remove("is-invalid")
          username.classList.add("is-valid")
        }
        else {
          username.classList.remove("is-valid")
          username.classList.add("is-invalid")
        }
        if (dob.value !== '') {
          userData['dob'] = document.getElementById("dob");
          dob.classList.remove("is-invalid")
          dob.classList.add("is-valid")
        }
        else {
          dob.classList.remove("is-valid")
          dob.classList.add("is-invalid")
        }

        if (email.value !== ''){
          userData['email'] = document.getElementById('email');
          email.classList.remove("is-invalid")
          email.classList.add("is-valid")
        }
        else {
          email.classList.remove("is-valid")
          email.classList.add("is-invalid")
        }
        console.log('Submitted');
        const dataUpload = httpsCallable(functions, 'SubmitUserData');
        dataUpload(userData).then((result) => {
          console.log(result.data);
        });
        console.log('here3');
    },
    submitProfileDetails() {
      console.log('here');
      let userData = [];
        let bio = document.getElementById('bio');
        let course = document.getElementById('course');
        console.log('here2');
        if (bio.value !== '') {
          userData['bio'] = document.getElementById("bio");
          bio.classList.remove("is-invalid")
          bio.classList.add("is-valid")
        } else {
          bio.classList.remove("is-valid")
          bio.classList.add("is-invalid")
        }
        if (course.value !== '') {
          userData['courseCode'] = document.getElementById("course");
          course.classList.remove("is-invalid")
          course.classList.add("is-valid")
        } else {
          course.classList.remove("is-valid")
          course.classList.add("is-invalid")
        }
      console.log(userData);
        const dataUpload = httpsCallable(functions, 'SubmitUserData');
        dataUpload(userData).then((result) => {
          console.log(result.data);
        });
    }
  }
}
</script>

<template>
  <header>
    <Navbar/>
  </header>
  <div class="container-fluid">
    <div class="row row-no-gutters" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <div class="col-md-2 profile">
        <h2>Settings</h2>
          <div>
          <ul class="nav flex-column nav-pills">
            <li class="nav-item pills">
              <button @click="getUserData()" class="nav-link " id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="false">Settings</button>
            </li>
            <li class="nav-item pills">
              <button @click="getUserData()" class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</button>
            </li>
            <li class="nav-item pills">
              <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Something else</button>
            </li>
            <li class="nav-item pills">
              <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Account Details</button>
            </li>
          </ul>
          </div>
      </div>
      <div class="col-md-10 main " id="main">
        <div>
          <div id="changeProfile">
            <form class="needs-validation" novalidate>
              <div class="input">
                <div class="col">
                  <h4>Change Profile Settings</h4>
                </div>
                <div class="row">
                  <div class="col">
                    <label for="course" class="form-label">Course</label>
                    <input id="course" class="form-control" placeholder="course" required>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="dropdown">
                      <label for="year" class="form-label">Year</label><br>
                      <select id="inputState" class="form-select">
                        <option selected>Year</option>
                        <option >1st</option>
                        <option >2nd</option>
                        <option >3rd</option>
                        <option >4th</option>
                      </select>
                    </div>
                    <div class="row">
                      <div class="col">
                        <label for="bio" class="form-label">Bio</label>
                        <textarea id="bio" class="form-control" placeholder="bio"></textarea>
                      </div>
                      <div>
                        <br>
                        <button type="button" class="btn btn-secondary" @click="submitProfileDetails">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
  <div style="display: none">
        <div id="changeDetails">
          <form class="needs-validation" novalidate>
            <div class="input">
              <div class="col">
                <h4>Change User Details</h4>
              </div>
              <div class="row">
                <div class="col">
                  <label for="firstName" class="form-label">First Name</label>
                  <input id="firstName" class="form-control" placeholder="First name" required>
                </div>
                <div class="col">
                  <label for="surname" class="form-label">Surname</label>
                  <input id="surname" class="form-control" placeholder="Surname">
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <label class="form-label">Username</label>
                  <input id="username" class="form-control" placeholder="Username">
                </div>
                <div class="col">
                  <label for="email" class="form-label">Email</label>
                  <input id="email" class="form-control" placeholder="Email">
                </div>
              </div>
              <div>
                <label for="dob" class="form-label">Date of Birth</label>
                <input id="dob" class="form-control" placeholder="dd/mm/yyyy">
              </div>
              <div >
                <label class="form-label">New Password</label>
                <input id="newPassword" class="form-control">
              </div>
              <div >
                <label class="form-label">Confirm New Password</label>
                <input id="passwordConfirm" class="form-control">
              </div>
              <div>
                <button type="button" class="btn btn-secondary" @click="submitUserData">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

 .input{
  margin: 5% 15% 10% 20%;
  width: 50%;
}
.navbar-brand {
  font-size: 40px;
  color: white;

}
.pills{
  width: 150px;
}

.nav-pills .nav-link.active, .nav-pills .show >.nav-link {
  color: #ffffff;
  background-color: #6b747d;
}

.nav-link{
  color: #181818;
}
</style>