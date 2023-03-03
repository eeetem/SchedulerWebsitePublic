<script setup>
import Navbar from '../components/Navbar.vue'
</script>
<script>
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
  }
}
</script>

<template>
  <header>
    <Navbar/>
  </header>
  <div>
  <div class="container-fluid">
    <div class="row row-no-gutters" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <div class="col-md-2 profile">
        <h2>Settings</h2>
          <div>
          <ul class="nav flex-column nav-pills">
            <li class="nav-item pills">
              <button @click="swapContent('changeDetails')" class="nav-link " id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="false">Settings</button>
            </li>
            <li class="nav-item pills">
              <button @click="swapContent('changeProfile')" class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</button>
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
      <div @load="swapContent('changeDetails')" class="col-md-10 main " id="main">

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
              <div >
                <label class="form-label">Password</label>
                <input id="password" class="form-control">
              </div>
              <div >
                <label class="form-label">New Password</label>
                <input id="passwordConfirm" class="form-control">
              </div>
              <div >
                <label class="form-label">Confirm New Password</label>
                <input id="passwordConfirm" class="form-control">
              </div>
              <br>
              <div >
                <button type="button" class="btn btn-secondary">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
    <div style="display: none">
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
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Year</button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item">1st</a></li>
                <li><a class="dropdown-item">2nd</a></li>
                <li><a class="dropdown-item">3rd</a></li>
                <li><a class="dropdown-item">4th</a></li>
                <li><a class="dropdown-item">Postgrad</a></li>
              </ul>
            </div>
          <div class="row">
          <div class="col">
            <label for="bio" class="form-label">Bio</label>
            <textarea id="bio" class="form-control" placeholder="bio"></textarea>
          </div>

            <div>
              <br>
              <button type="button" class="btn btn-secondary">Save</button>
            </div>
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