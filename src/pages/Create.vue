<template>
  <header>
    <h1>
      <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Scheduler</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
          </div>
        </div>
      </nav>
    </h1>
  </header>
  <div id="userDetails">
    <h1 class="mb-3" style="text-align: center">Create User</h1>
    <form class="row g-3 needs-validation" novalidate>
      <div class="input mb-3">
        <div class="col">
          <h4>User Details</h4>
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
        <div class="col-md-6">
          <label class="form-label">Password</label>
          <input id="password" class="form-control">
        </div>
        <div class="col-md-6">
          <label class="form-label">Confirm Password</label>
          <input id="passwordConfirm" class="form-control">
        </div>
      </div>
    </form>
  </div>
  <div id="courseDetails" style="display: none;">
    <h1 class="mb-3" style="text-align: center; padding:15px">Course Details</h1>
    <form class="row g-3">
      <div class="input mb-3">
        <div class="col">
          <h4 style="padding: 5px">Please fill in details below</h4>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="inputCity" class="form-label">Course</label>
            <input type="text" class="form-control" id="inputCity">
          </div>
          <div class="col-md-4">
            <label for="inputState" class="form-label">Year</label>
            <select id="inputState" class="form-select">
              <option selected>Select Year</option>
              <option>...</option>
            </select>
          </div>
          <div style="margin-left: 3px; padding: 10px">
            <div class="form-check">
              <input class="form-check-input"  type="checkbox" value="option1">
              <label class="form-check-label" for="exampleRadios1">Object Oriented Programming</label>
            </div>
            <div class="form-check">
              <input class="form-check-input"  type="checkbox" value="option2">
              <label class="form-check-label" >Software Engineering</label>
            </div>
            <div class="form-check">
              <input class="form-check-input"  type="checkbox" value="option3">
              <label class="form-check-label" value="option3">Linear Algebra</label>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
  <div>

  </div>
  <div class="col" style="padding-top: 10px; margin-left: 25%">
    <button class="btn btn-dark" @click="checkDetails" type="submit">Continue</button>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    checkDetails() {
      let checked = 0;

      let firstName = document.getElementById("firstName");
      let surname = document.getElementById("surname");
      let username = document.getElementById("username");
      let email = document.getElementById("email");
      let password = document.getElementById("password");
      let passwordConfirm = document.getElementById("passwordConfirm");

      if (firstName.value !== "") {
        checked++;
        firstName.classList.remove("is-invalid")
        firstName.classList.add("is-valid")
      } else {
        firstName.classList.remove("is-valid")
        firstName.classList.add("is-invalid")
      }

      if (surname.value !== "") {
        checked++;
        surname.classList.remove("is-invalid")
        surname.classList.add("is-valid")
      } else {
        surname.classList.remove("is-valid")
        surname.classList.add("is-invalid")
      }

      if (username.value !== "") {
        checked++;
        username.classList.remove("is-invalid")
        username.classList.add("is-valid")
      } else {
        username.classList.remove("is-valid")
        username.classList.add("is-invalid")
      }

      if (email.value !== "") {
        checked++;
        email.classList.remove("is-invalid")
        email.classList.add("is-valid")
      } else {
        email.classList.remove("is-valid")
        email.classList.add("is-invalid")
      }

      if (password.value !== "") {
        password.classList.remove("is-invalid")
        password.classList.add("is-valid")
        if (passwordConfirm.value !== "") {
          if (password.value === passwordConfirm.value) {
            checked++;
            passwordConfirm.classList.remove("is-invalid")
            passwordConfirm.classList.add("is-valid")
          } else {
            passwordConfirm.classList.remove("is-valid")
            passwordConfirm.classList.add("is-invalid")
          }
        } else {
          passwordConfirm.classList.remove("is-valid")
          passwordConfirm.classList.add("is-invalid")
        }
      } else {
        password.classList.remove("is-valid")
        password.classList.add("is-invalid")
      }
      console.log("CHECK: " + checked)
      if (checked == 5) {
        let courseDetails = document.getElementById("courseDetails");
        let userDetails = document.getElementById("userDetails")
        userDetails.style.display = 'none';
        courseDetails.style.display = 'block';

      }
    },
  }
}
</script>
<style scoped>
.input {
  margin: auto;
  width: 50%;
}
.navbar-brand {
  font-size: 40px;
  color: white;

}

.nav-item{
  margin-left:10px;
  font-size: 20px;
  color: white;
}
nav-link{
  color:white;
}

.d-flex{
  margin-right:10%;
}
</style>