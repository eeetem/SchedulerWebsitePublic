<script setup>
import Navbar from '../components/Navbar.vue'
</script>
<script>
import {httpsCallable, getFunctions} from "firebase/functions";
import app from "@/api/firebase";
import {getAuth, updateProfile} from "firebase/auth";

const functions = getFunctions(app);
const auth = getAuth(app);
const user = auth.currentUser;
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

const storage = getStorage();
const pfpRef = ref(storage, user.uid + "/pfp");
export default {
  data() {
    return {
      ImageFile: null
    }
  },
  mounted() {
    document.getElementById("v-pills-home-tab").click();
  },
  methods: {
    swapContent(div1, div2) {
      let divA = document.getElementById(div1);
      let divB = document.getElementById(div2);
      divA.style.display = 'block';
      divB.style.display = 'none';
    },

    getUserData() {
      const dataRequest = httpsCallable(functions, 'GetUserData');
      dataRequest().then((result) => {
        const userdata = result.data;
        console.log(userdata);
        document.getElementById('firstName').placeholder = userdata['firstName'];
        document.getElementById('surName').placeholder = userdata['surName'];
        document.getElementById('username').placeholder = userdata['username'];
        document.getElementById('dob').placeholder = userdata['dob'];
        document.getElementById('email').placeholder = user.email;
        document.getElementById('bio').placeholder = userdata['bio'];
        document.getElementById('course').placeholder = userdata['courseCode'];

      });


    },
    uploadImage(e) {
      this.ImageFile = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.ImageFile);
      reader.onload = e => {//load the image onto the page
        document.getElementById("pfp").src = e.target.result;
      };
    },
    submitUserData() {
      let userData = {};
      let password = document.getElementById('newPassword');
      let passwordConfirm = document.getElementById('passwordConfirm');
      let firstName = document.getElementById('firstName');
      let surName = document.getElementById('surName');
      let username = document.getElementById('username');
      let dob = document.getElementById('dob');
      let email = document.getElementById('email');
      let year = document.getElementById('year')

      if (password.value !== "" && passwordConfirm.value !== "") {
        if (password.value === passwordConfirm.value) {
          userData['password'] = document.getElementById("newPassword").value;
          password.classList.remove("is-invalid")
          password.classList.add("is-valid")
        } else {
          password.classList.remove("is-valid")
          password.classList.add("is-invalid")
        }
      }
      if (firstName.value !== '') {
        userData['firstName'] = document.getElementById("firstName").value;
      }
      if (surName.value !== '') {
        userData['surName'] = document.getElementById("surName").value;
      }
      if (username.value !== '') {
        userData['username'] = document.getElementById("username").value;
      }
      if (dob.value !== '') {
        userData['dob'] = document.getElementById("dob").value;
      }

      if (year.value !== '') {
        userData['year'] = document.getElementById("year").value;
      }

      if (email.value !== '') {
        userData['email'] = document.getElementById('email').value;
      }
      console.log(userData);
      const dataUpload = httpsCallable(functions, 'SubmitUserData');
      dataUpload(userData).then((result) => {
        console.log(result.data);
      });

    },
    async submitProfileDetails() {
      const dataRequest = httpsCallable(functions, 'GetUserData');
      dataRequest().then((result) => {
        const userdata = result.data;
        if (year.value !== 'Year') {
          userData['year'] = document.getElementById("inputState").value;
        } else {
          userData['year'] = userdata['year']; // returns users original year selected.
        }
      });

      let userData = {};
      let bio = document.getElementById('bio');
      let course = document.getElementById('course');
      let year = document.getElementById('year');
      if (bio.value !== '') {
        userData['bio'] = document.getElementById("bio").value;
      }
      if (course.value !== '') {
        userData['courseCode'] = document.getElementById("course").value;
      }
      if (year.value !== 'Year') {
        userData['year'] = document.getElementById("inputState").value;
      }else {
        const dataRequest = httpsCallable(functions, 'GetUserData');
        dataRequest().then((result) => {
          const userdata = result.data;
            userData['year'] = userdata['year'];
        });
      }
      console.log(userData);
      if(this.ImageFile != null){
      await uploadBytes(pfpRef, this.ImageFile).then((snapshot) => {
          getDownloadURL(pfpRef).then(async (url) => {
            await updateProfile(user, {displayName: null, photoURL: url})
            if (year.value !== '') {
              userData['year'] = document.getElementById("year").value;
            }
            console.log(userData);
            if (this.ImageFile != null) {
              await uploadBytes(pfpRef, this.ImageFile).then((snapshot) => {
                getDownloadURL(pfpRef).then((url) => {
                  updateProfile(user, {displayName: null, photoURL: url})

                  userData["pfpURL"] = url;
                  const dataUpload = httpsCallable(functions, 'SubmitUserData');
                  dataUpload(userData).then((result) => {
                    console.log(result.data);
                  });

                });
              });
            } else {
              console.log("no picture");
              const dataUpload = httpsCallable(functions, 'SubmitUserData');
              dataUpload(userData).then((result) => {
                console.log(result.data);
              });
            }
            document.getElementById("confirmSave").innerHTML = '<div class="alert alert-success" role="alert" style="margin-left: auto ;height: 40px; padding: 10px; text-align: center">' +
                "Saved" + ' </div>';

            document.getElementById("confirmSaveUser").innerHTML = '<div class="alert alert-success" role="alert" style="margin-left: auto ;height: 40px; padding: 10px; text-align: center">' +
                "Saved" + ' </div>';

            location.reload();
          })


      })

      }
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
              <button @click="swapContent('changeDetails','changeProfile'),getUserData()" class="nav-link "
                      id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button"
                      role="tab" aria-controls="v-pills-home" aria-selected="false">Settings
              </button>
            </li>
            <li class="nav-item pills">
              <button @click="swapContent('changeProfile','changeDetails'),getUserData()" class="nav-link"
                      id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button"
                      role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-10 main" id="changeDetails" style="display: none">
        <form class="needs-validation" novalidate>
          <div class="input">
            <div class="col">
              <h4>Change User Details</h4>
            </div>
            <div class="row">
              <div class="col">
                <label for="firstName" class="form-label">First Name</label>
                <input id="firstName" class="form-control" placeholder="First name">
              </div>
              <div class="col">
                <label for="surName" class="form-label">Surname</label>
                <input id="surName" class="form-control" placeholder="surName">
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
            <div>
              <label class="form-label">New Password</label>
              <input id="newPassword" class="form-control">
            </div>
            <div>
              <label class="form-label">Confirm New Password</label>
              <input id="passwordConfirm" class="form-control">
            </div>
            <div>
              <br>
              <div id="confirmSave"></div>
              <button type="button" class="btn btn-secondary" @click="submitProfileDetails">Save</button>
            </div>
          </div>
        </form>
      </div>


      <div class="col-md-10 main" style="display: none" id="changeProfile">
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
                  <select id="year" class="form-select">
                    <option selected>Year</option>
                    <option>1st</option>
                    <option>2nd</option>
                    <option>3rd</option>
                    <option>4th</option>
                  </select>
                </div>
                <div class="row">
                  <div class="col">
                    <label for="bio" class="form-label">Bio</label>
                    <textarea id="bio" class="form-control" placeholder="bio"></textarea>
                  </div>
                </div>
                <div>
                  <br>
                  <h6>Profile Picture Upload</h6>
                  <img id="pfp" src="" class="uploading-image"/>
                  <input type="file" accept="image/jpeg" @change="uploadImage">
                </div>
                <div>
                  <br>
                  <div id="confirmSaveUser"></div>
                  <button type="button" class="btn btn-secondary" @click="submitProfileDetails">Save</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

.input {
  margin: 5% 15% 10% 20%;
  width: 50%;
}

.navbar-brand {
  font-size: 40px;
  color: white;

}

.pills {
  width: 150px;
}

.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
  color: #ffffff;
  background-color: #6b747d;
}

.nav-link {
  color: #181818;
}
</style>