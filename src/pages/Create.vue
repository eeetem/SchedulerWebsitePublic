<template>
  <header>
    <h1>
      <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Scheduler</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          </button>
        </div>
      </nav>
    </h1>
  </header>
  <div id="userDetails">
    <h1 class="mb-3" style="text-align: center; padding: 20px">Create User</h1>
    <form class="row g-3 needs-validation" novalidate>
      <div class="input mb-3">
        <div class="col">
          <p class="lead">Enter user details</p>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="firstName" class="form-label">First Name</label>
            <input id="firstName" class="form-control" placeholder="First name" required>
          </div>
          <div class="col-md-6">
            <label for="surname" class="form-label">Surname</label>
            <input id="surname" class="form-control" placeholder="Surname">
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label class="form-label">Username</label>
            <input id="username" class="form-control" placeholder="Username">
          </div>
          <div class="col-md-6">
            <label for="email" class="form-label">Email</label>
            <input id="email" class="form-control" placeholder="Email">
          </div>
        </div>
        <div class="row" style="width: 60%; text-align: left">
          <div class="col-md-6">
            <label for="dob" class="form-label">Date of Birth</label>
            <input id="dob" class="form-control" placeholder="01/02/2003">
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="password" class="form-label">Password</label>
            <input id="password" class="form-control" placeholder="Password">
            <div id="passwordHelp"  class="col-md-6" style="display: none">
              <div class="alert alert-danger errorMessage" role="alert" style="height: 40px; padding:5px; text-align: center">
                Minimum 6 characters
              </div>
            </div>
          </div>
        </div>
        <div class="row">
        <div class="col-md-6">
          <label class="form-label">Confirm Password</label>
          <input id="passwordConfirm" class="form-control" placeholder="Re-type Password">
          <div id="passwordNoMatch" class="errorMessage" style="display: none">
            <div class="alert alert-danger" role="alert" style="height: 40px; padding: 5px; text-align: center">
              Password doesnt match
            </div>
        </div>
        </div>
        </div>
      </div>
    </form>
    <div class="col" style="padding-top: 10px; padding-bottom: 30px; margin-left: 25%">
      <button class="btn btn-dark" @click="nextPage" type="submit">Continue</button>
    </div>
  </div>
  <div id="courseDetails" style="display: none;">
    <h1 class="mb-3" style="text-align: center; padding: 15px">Course Details</h1>
    <form class="row g-3">
      <div class="input mb-3">
        <div class="col mb-3">
          <h5 class="lead">Enter course details</h5>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="inputCity" class="form-label">Course</label>
            <input type="text" class="form-control" id="courseCode">
          </div>
          <div class="col-md-6">
            <label for="inputState" class="form-label">Year</label>
            <select id="courseYear" class="form-select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </div>
      </div>
    </form>
    <div class="row">
      <div class="col" style="padding-top: 30px; padding-bottom: 30px; width: 30%; margin-left:25%">
        <button class="btn btn-dark" @click="previousPage" type="submit">Back</button>
      </div>
      <div class="col" style="padding-top: 30px; padding-bottom: 30px; width: 30%; text-align: right; margin-right: 20%">
        <button class="btn btn-dark" @click="nextPage" type="submit">Continue</button>
      </div>
    </div>
  </div>
  <div id="finalConfirm" class="input" style="display: none">
    <h1 style="text-align: center; padding: 20px; margin-right:25%">Account Details</h1>
    <p class="lead">Overview</p>
    <form>
      <fieldset disabled>
        <div class="row">
          <div class="col-md-6">
            <label for="disabledTextInput" class="form-label">Name</label>
            <input type="text" id="disabledTextInput namePlaceholder" class="form-control" placeholder="">
          </div>
          <div class="col-md-6">
            <label for="disabledTextInput" class="form-label">Surname</label>
            <input type="text" id="disabledTextInput surnamePlaceholder" class="form-control">
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="disabledTextInput" class="form-label">Username</label>
            <input type="text" id="disabledTextInput usernamePlaceholder" class="form-control">
          </div>
          <div class="col-md-6">
            <label for="disabledTextInput" class="form-label">Email</label>
            <input type="text" id="disabledTextInput emailPlaceholder" class="form-control">
          </div>
        </div>
        <div class="row" style="text-align: left; width: 60%">
          <div class="col-md-6">
            <label for="disabledTextInput" class="form-label">Date of Birth</label>
            <input type="text" id="disabledTextInput dobPlaceholder" class="form-control ">
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="disabledTextInput" class="form-label">Course</label>
            <input type="text" id="disabledTextInput coursePlaceholder" class="form-control ">
          </div>
          <div class="col-md-6">
            <label for="disabledTextInput" class="form-label">Year</label>
            <input type="text" id="disabledTextInput yearPlaceholder" class="form-control">
          </div>
        </div>
      </fieldset>
    </form>
    <div class="row">
      <div class="col-md-6" style="padding-top: 30px; padding-bottom: 30px; width: 30%">
        <button class="btn btn-dark" @click="previousPage" type="submit">Back</button>
      </div>
      <div class="col-md" style="padding-top: 30px; padding-bottom: 30px; width: 30%; text-align: right; margin-right: 20% ">
        <button class="btn btn-dark" @click="nextPage" type="submit">Create</button>
      </div>
    </div>
  </div>
  <div>
  </div>
</template>
<script>
import app from "../api/firebase";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {getFunctions, httpsCallable} from 'firebase/functions';

const functions = getFunctions(app);
const auth = getAuth(app);
const user = auth.currentUser;

let userCheck = false;
let courseCheck = false;
let pageIndex = 1;

let firstName;
let surname;
let username;
let email;
let dob;
let password;
let passwordConfirm;

let courseCode;
let year;

export default {
  data() {
    return {}
  },
  methods: {

    currentPage() {
      let userDetails = document.getElementById("userDetails")
      let courseDetails = document.getElementById("courseDetails");
      let confirmDetails = document.getElementById("finalConfirm");

      if (pageIndex === 1) {
        userDetails.style.display = 'block';
        courseDetails.style.display = 'none';
        confirmDetails.style.display = 'none';
      }
      if (pageIndex === 2) {
        userDetails.style.display = 'none';
        courseDetails.style.display = 'block';
        confirmDetails.style.display = 'none';
      }
      if (pageIndex === 3) {
        userDetails.style.display = 'none';
        courseDetails.style.display = 'none';
        confirmDetails.style.display = 'block';
      }
    },

    nextPage() {
      if (pageIndex === 1) {
        this.checkUserDetails()
        if (userCheck) {
          pageIndex++;
        }
      }
      if (pageIndex === 2) {
        this.checkCourseDetail()
        if (courseCheck) {
          pageIndex++;
        }
      }
      if (pageIndex === 3) {
        this.create()
        this.login()
      }
      this.currentPage();
    },

    previousPage() {
      if (pageIndex > 1) {
        pageIndex--;
      }
      this.currentPage();
    },

    checkUserDetails() {
      let checked = 0;

      firstName = document.getElementById("firstName");
      surname = document.getElementById("surname");
      username = document.getElementById("username");
      email = document.getElementById("email");
      dob = document.getElementById("dob");
      password = document.getElementById("password");
      passwordConfirm = document.getElementById("passwordConfirm");

      if (firstName.value !== "") {
        checked++;
        firstName.classList.remove("is-invalid")
        firstName.classList.add("is-valid")
        document.getElementById("disabledTextInput namePlaceholder").placeholder = firstName.value;
      } else {
        firstName.classList.remove("is-valid")
        firstName.classList.add("is-invalid")
      }

      if (surname.value !== "") {
        checked++;
        surname.classList.remove("is-invalid")
        surname.classList.add("is-valid")
        document.getElementById("disabledTextInput surnamePlaceholder").placeholder = surname.value;
      } else {
        surname.classList.remove("is-valid")
        surname.classList.add("is-invalid")
      }

      if (username.value !== "") {
        checked++;
        username.classList.remove("is-invalid")
        username.classList.add("is-valid")
        document.getElementById("disabledTextInput usernamePlaceholder").placeholder = username.value;
      } else {
        username.classList.remove("is-valid")
        username.classList.add("is-invalid")
      }

      if (email.value !== "") {
        let emailVerify = false;
        for (let i = 0; i < email.value.length; i++) {
          if (email.value.charAt(i) === "@") {
            emailVerify = true;
            console.log("Email Verified")
          }
        }
        if (emailVerify) {
          checked++;
          email.classList.remove("is-invalid")
          email.classList.add("is-valid")
          document.getElementById("disabledTextInput emailPlaceholder").placeholder = email.value;
        } else {
          email.classList.remove("is-valid")
          email.classList.add("is-invalid")
          console.log("Invalid")
        }
      }

      if (dob.value !== "" && dob.value.length === 10) {
        checked++;
        dob.classList.remove("is-invalid")
        dob.classList.add("is-valid")
        document.getElementById("disabledTextInput dobPlaceholder").placeholder = dob.value;
      } else {
        dob.classList.remove("is-valid")
        dob.classList.add("is-invalid")
      }

      if (password.value !== "" && password.value.length >= 6) {
        document.getElementById("passwordHelp").style.display = 'none';
        password.classList.remove("is-invalid")
        password.classList.add("is-valid")
        if (passwordConfirm.value !== "") {
          if (password.value === passwordConfirm.value) {
            checked++;
            passwordConfirm.classList.remove("is-invalid")
            passwordConfirm.classList.add("is-valid")
            document.getElementById("passwordNoMatch").style.display = 'none';
          } else {
            passwordConfirm.classList.remove("is-valid")
            passwordConfirm.classList.add("is-invalid")
            document.getElementById("passwordNoMatch").style.display = 'block';
          }
        }
        else{
          passwordConfirm.classList.remove("is-valid")
          passwordConfirm.classList.add("is-invalid")
        }
      } else {

        password.classList.remove("is-valid")
        password.classList.add("is-invalid")

        document.getElementById("passwordHelp").style.display = 'block';
      }

      if (checked === 6) {
        userCheck = true;
      }
    },

    checkCourseDetail() {
      let checked = 0;

      courseCode = document.getElementById("courseCode");
      year = document.getElementById("courseYear");

      if (courseCode.value !== "") {
        checked++;
        courseCode.classList.remove("is-invalid")
        courseCode.classList.add("is-valid")
        document.getElementById("disabledTextInput coursePlaceholder").placeholder = courseCode.value;
      } else {
        courseCode.classList.remove("is-valid")
        courseCode.classList.add("is-invalid")
      }
      if (year.value !== "") {
        checked++;
        document.getElementById("disabledTextInput yearPlaceholder").placeholder = year.value;
      }

      if (checked === 2) {
        courseCheck = true;
      }
    }
    ,
    create() {
      createUserWithEmailAndPassword(auth, email.value, password.value)
          .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("success, user created with email:" + user.email);
            // ...
            var userData = {};
            userData["firstName"] = firstName.value
            userData["surName"] = surname.value
            userData["dob"] = dob.value
            userData["courseCode"] = courseCode.value
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
    }
    ,
    login() {
      signInWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("logged in as " + user.email)
            console.log(user);
            this.$router.push('/home');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage);
          });
    }
    ,
  }
}
</script>
<style scoped>
.input {
  margin-left: 25%;
  width: 60%;
}

.navbar-brand {
  font-size: 40px;
  color: white;
  text-align: left;
}

nav-link {
  color: white;
}

.form-label{
  font-style: initial;
  color: black;
}

.col-md-6{
  width: 360px;
  padding-top: 10px;
}
.errorMessage{
  width: 340px;
}
</style>