<script>
</script>
<template>
  <h1 class="mb-3" style="text-align: center">Create User</h1>
  <form class="row g-3">
    <div class="input mb-3">
      <div class="col">
        <h4>User Details</h4>
      </div>
      <div class="row">
        <div class="col">
          <label class="form-label">First Name</label>
          <input type="firstName" class="form-control" placeholder="First name">
        </div>
        <div class="col">
          <label class="form-label">Surname</label>
          <input type="surname" class="form-control" placeholder="Surname">
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label class="form-label">Username</label>
          <input type="username" class="form-control" placeholder="Username">
        </div>
        <div class="col">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" placeholder="Email">
        </div>
      </div>
      <div class="col-md-6">
        <label class="form-label">Password</label>
        <input type="password" class="form-control">
      </div>
      <div class="col-md-6">
        <label class="form-label">Confirm Password</label>
        <input type="password" class="form-control">
      </div>
    </div>
  </form>
</template>

<style scoped>
.input {
  margin: auto;
  width: 50%;
}
</style>