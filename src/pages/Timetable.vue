<script setup>
import Navbar from '../components/Navbar.vue'
</script>
<template>
  <header>
    <Navbar/>
  </header>
  <body onload="onLoadFunc()">
  <div class="float-container">
    <div class="float-child" style="width: 25%; padding: 10px;">
      <div> Add Friends Component Here</div>
    </div>

    <div class="float-child" style="width: 50%; padding: 10px">
      <table class="table table-striped-columns" id="timetable">
        <thead>
        <tr>
          <th scope="col">Time</th>
          <th scope="col">Monday</th>
          <th scope="col">Tuesday</th>
          <th scope="col">Wednesday</th>
          <th scope="col">Thursday</th>
          <th scope="col">Friday</th>
        </tr>
        </thead>
        <tbody class="table-group-divider">
        <tr>
          <td>9:00</td>
          <td>
            <div id="softEng">Software Engineering</div>
          </td>
          <td>Software Engineering</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>10:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>11:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>12:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>13:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>14:00</td>
          <td></td>
          <td></td>
          <td>Database Systems</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>15:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>16:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>17:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>18:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="1" style="border: hidden">
            <button class="btn btn-dark" type="button" data-bs-toggle="collapse" data-bs-target="#moduleOptions"
                    aria-expanded="false" aria-controls="moduleOptions">Edit
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="float-child" id="checkBoxes" style="width: 25%; float:right">
      <div class=" collapse" id="moduleOptions">
        <div class=" card card-body">
          <h3>Module Options</h3>
          <p>Select modules you want to display</p>
          <ul class="list-group">
            <li class="list-group-item">
              <input class="form-check-input me-1" type="checkbox" id="firstCheckbox">
              <label class="form-check-label" for="firstCheckbox">Software Engineering</label>
            </li>
            <li class="list-group-item">
              <input class="form-check-input me-1" type="checkbox" value="Oop">
              <label class="form-check-label" for="secondCheckbox">Object Oriented Programming</label>
            </li>
            <li class="list-group-item">
              <input class="form-check-input me-1" type="checkbox" value="database">
              <label class="form-check-label" for="thirdCheckbox">Database Systems</label>
            </li>
            <li class="list-group-item">
              <input class="form-check-input me-1" type="checkbox" value="linearAlgebra">
              <label class="form-check-label" for="thirdCheckbox">Linear Algebra</label>
            </li>
            <li class="list-group-item">
              <input class="form-check-input me-1" type="checkbox" value="networks">
              <label class="form-check-label" for="thirdCheckbox">Networks</label>
            </li>
          </ul>
          <button class="btn btn-dark"  style="padding:5px; margin-top: 15px; width: 50px" type="button" data-bs-toggle="collapse" data-bs-target="#moduleOptions"
                  aria-expanded="false" aria-controls="moduleOptions">Exit</button>
        </div>
      </div>
    </div>
  </div>
  </body>
</template>

<script>
function onLoadFunc() {
  const softwareEngineering = document.querySelectorAll('#softEng');

  const hideModule = document.querySelector('#firstCheckbox');
 //Wont register Change in checkbox
  hideModule.addEventListener("change", function (e) {
    console.log(hideModule.checked);
    if (hideModule.checked) {
      softwareEngineering.style.display = "initial";
      console.log("Box is checked");
    } else {
      softwareEngineering.style.display = "none";
    }
  });
}

</script>

<style scoped>
.table {
  table-layout: fixed;
}

.float-child {
  float: left;
}
</style>