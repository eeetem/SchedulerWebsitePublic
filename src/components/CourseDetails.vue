<template>
  <h1 class="mb-3" style="text-align: center">Course Details</h1>
  <form class="row g-3">
    <div class="input mb-3">
      <div class="col">
        <h4>Please fill in details below</h4>
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
</template>
<style scoped>
.input {
  margin: auto;
  width: 50%;
}
</style>