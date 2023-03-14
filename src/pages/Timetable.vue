<script setup>
import Navbar from '../components/Navbar.vue'
</script>
<template>
  <header>
    <Navbar/>
  </header>
  <body onload="loadTimetable()">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6" style=" width: 18%; padding: 10px;">
        <nav class="navbar">
        <h3>Friends Online</h3>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#friendsList"
                  aria-controls="friendsList" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div id="friendsList">
            <ul class="list-group list-group-flush navbar-nav me-auto mb-4 mb-lg-0">
              <li class="list-group-item list-group-item-action col nav-item"><img src="../assets/img_chania.jpg"
                                                                          class="profile_pics rounded-circle"
                                                                          alt="Chania">Dennis
              </li>
              <li class="list-group-item list-group-item-action col nav-item"><img src="../assets/egg.jpg"
                                                                          class="profile_pics rounded-circle"
                                                                          alt="Chania">Aaron
              </li>
              <li class="list-group-item list-group-item-action col nav-item"><img src="../assets/Grannygun.jpg"
                                                                          class="profile_pics rounded-circle"
                                                                          alt="Chania">Tom
              </li>
              <li class="list-group-item list-group-item-action col nav-item"><img src="../assets/Grannygun.jpg"
                                                                          class="profile_pics rounded-circle"
                                                                          alt="Chania">Seamus
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="col-md-6" style="width: 56%; margin-left:30px; padding: 20px; padding: 15px; overflow-x: auto ">
        <table class="table table-striped-columns table-responsive center" id="timetable">
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
            <td class="9">9:00</td>
            <td id="9monday"></td>
            <td id="9tuesday"></td>
            <td id="9wednesday"></td>
            <td id="9thursday"></td>
            <td id="9friday"></td>
          </tr>
          <tr>
            <td>10:00</td>
            <td id="10monday"></td>
            <td id="10tuesday"></td>
            <td id="10wednesday"></td>
            <td id="10thursday"></td>
            <td id="10friday"></td>
          </tr>
          <tr>
            <td>11:00</td>
            <td id="11monday"></td>
            <td id="11tuesday"></td>
            <td id="11wednesday"></td>
            <td id="11thursday"></td>
            <td id="11friday"></td>
          </tr>
          <tr>
            <td>12:00</td>
            <td id="12monday"></td>
            <td id="12tuesday"></td>
            <td id="12wednesday"></td>
            <td id="12thursday"></td>
            <td id="12friday"></td>
          </tr>
          <tr>
            <td>13:00</td>
            <td id="13monday"></td>
            <td id="13tuesday"></td>
            <td id="13wednesday"></td>
            <td id="13thursday"></td>
            <td id="13friday"></td>
          </tr>
          <tr>
            <td>14:00</td>
            <td id="14monday"></td>
            <td id="14tuesday"></td>
            <td id="14wednesday"></td>
            <td id="14thursday"></td>
            <td id="14friday"></td>
          </tr>
          <tr>
            <td>15:00</td>
            <td id="15monday"></td>
            <td id="15tuesday"></td>
            <td id="15wednesday"></td>
            <td id="15thursday"></td>
            <td id="15friday"></td>
          </tr>
          <tr>
            <td>16:00</td>
            <td id="16monday"></td>
            <td id="16tuesday"></td>
            <td id="16wednesday"></td>
            <td id="16thursday"></td>
            <td id="16friday"></td>
          </tr>
          <tr>
            <td>17:00</td>
            <td id="17monday"></td>
            <td id="17tuesday"></td>
            <td id="17wednesday"></td>
            <td id="17thursday"></td>
            <td id="17friday"></td>
          </tr>
          <tr>
            <td>18:00</td>
            <td id="18monday"></td>
            <td id="18tuesday"></td>
            <td id="18wednesday"></td>
            <td id="18thursday"></td>
            <td id="18friday"></td>
          </tr>
          <tr>
            <td colspan="1" style="border: hidden">
              <button class="btn btn-secondary" type="button" data-bs-toggle="collapse"
                      data-bs-target="#moduleOptions"
                      aria-expanded="false" aria-controls="moduleOptions">Edit
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="col-md-6" id="checkBoxes" style="width: 23%; padding-left: 10px">
        <div class=" collapse" id="moduleOptions">
          <div class="card card-body">
            <h3>Module Options</h3>
            <p>Select modules you want to display</p>
            <ul class="list-group" id="moduleList">
            </ul>
            <div class="input-group mb-3 timeSelect" style="margin-top:20px">
              <label class="input-group-text" for="timeInput">Time</label>
              <select class="form-select" id="timeInput">
                <option selected>Choose...</option>
                <option value="9">9:00</option>
                <option value="10">10:00</option>
                <option value="11">11:00</option>
                <option value="12">12:00</option>
                <option value="13">13:00</option>
                <option value="14">14:00</option>
                <option value="15">15:00</option>
                <option value="16">16:00</option>
                <option value="17">17:00</option>
                <option value="18">18:00</option>
              </select>
            </div>
            <div class="input-group mb-3 daySelect">
              <label class="input-group-text" for="dayInput">Day</label>
              <select class="form-select" id="dayInput">
                <option selected>Choose...</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thurday</option>
                <option value="friday">Friday</option>
              </select>
            </div>
            <div class="input-group mb-3" style="margin-top:1px">
              <button class="btn btn-secondary" type="button" id="button-addon1" @click="addModule">Add</button>
              <input type="text" class="form-control" id="addModuleInput">
            </div>
            <div class="input-group mb-3" style="margin-top:1px">
              <button class="btn btn-secondary" type="button" id="button-addon1" @click="removeModule">Remove</button>
              <select class="form-select" id="selectRemove">
                <option selected>Choose</option>
              </select>
            </div>
            <div class="input-group mb-3">
              <div class="row">
                <div class="col">
                  <button class="btn btn-secondary" style="padding:5px; margin-top: 15px; width: 50px" type="button"
                          data-bs-toggle="collapse" data-bs-target="#moduleOptions"
                          aria-expanded="false" aria-controls="moduleOptions" @click="saveTimetable">Exit
                  </button>
                </div>
                <div class="col">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </body>
</template>
<script>
let totalModuleCount;

export default {
  data() {
    return {}
  },
  mounted() {
    this.loadTimetable(); //Loads timetable with page
  },
  methods: {

    addModule() {
      const input = document.getElementById("addModuleInput").value;
      let day = document.getElementById("dayInput").value;
      let time = document.getElementById("timeInput").value;
      let moduleList = document.querySelector("#moduleList");
      let moduleOption = document.getElementById("selectRemove");
      let slot = time + day;
      let tableSlot = document.getElementById(slot);

      let module = slot + "Opt";
      let list = slot + "List";
      let moduleListed = document.getElementById(module);
      let listedModule = document.getElementById(list);

      console.log("Table slot ID: " + slot);
      if (input !== "" && day !== "" && time !== "") {
        if (document.getElementById(slot).innerHTML == "") {
          moduleList.innerHTML += '<div id="' + slot + 'Opt"' + '>' + '<li class="list-group-item">' +
              '<label class="form-check-label">' + input + '</label>' +
              '</li>' + '</div>';

          moduleOption.innerHTML += '<option value=' + slot + ' id=' + slot + 'List' + '>' + input + '</option>';

          tableSlot.innerText = input;
          this.saveTimetable(input, slot);
        } else {
          console.log("NOT Clear")
          moduleListed.parentNode.removeChild(moduleListed)
          listedModule.parentNode.removeChild(listedModule)
          console.log("Clear")
          console.log(moduleList);
          moduleList.innerHTML += '<div id="' + slot + 'Opt"' + '>' + '<li class="list-group-item">' +
              '<label class="form-check-label">' + input + '</label>' +
              '</li>' + '</div>';

          moduleOption.innerHTML += '<option value=' + slot + ' id=' + slot + 'List' + '>' + input + '</option>';

          console.log("Get Slot:" + tableSlot);
          tableSlot.innerText = input;
          this.saveTimetable(input, slot);
        }
      }
    },

    saveTimetable(moduleName, timeSlot) {
      console.log("Saving")
      const data = {
        slot: timeSlot,
        name: moduleName
      }
      console.log(data)

      const fs = require('fs');
      const saveData = (data) => {
        const finsihed = (error) => {
          if (error) {
            console.error(error)
            return;
          }
        }

        const timetableData = JSON.stringify(data, null, 2)
        console.log(timetableData);
        fs.writeFile('timetable.json', timetableData, finsihed)
      }
    },

    removeModule() {
      let selectedModule = document.getElementById("selectRemove").value
      let module = selectedModule + "Opt";
      let list = selectedModule + "List";
      let moduleListed = document.getElementById(module);
      let listedModule = document.getElementById(list);
      console.log("CHOOSEN:" + selectedModule);
      let timetableSlot = document.getElementById(selectedModule);
      timetableSlot.innerHTML = ""
      moduleListed.parentNode.removeChild(moduleListed)
      listedModule.parentNode.removeChild(listedModule)
    },

    loadTimetable() {
      console.log("Loading")
      let moduleList = document.querySelector("#moduleList");
      let moduleOption = document.getElementById("selectRemove");
      fetch("timetable.json") //Gets data from this json file.(Not linked to server)
          .then(response => response.json())
          .then(data => {
            for (var i = 0; i < data.length; i++) {
              let tableSlot = document.getElementById(data[i].slot);
              console.log("Name:" + data[i].moduleName);
              moduleList.innerHTML += '<div id="' + data[i].slot + 'Opt"' + '>' + '<li class="list-group-item">' +
                  '<label class="form-check-label">' + data[i].moduleName + '</label>' +
                  '</li>' + '</div>';

              moduleOption.innerHTML += '<option value=' + data[i].slot + ' id=' + data[i].slot + 'List' + '>' + data[i].moduleName + '</option>'
              //" id="' + data[i].slot + 'List"' +
              totalModuleCount = data.length;
              tableSlot.innerHTML = data[i].moduleName;
            }
          })
    },

    displayModule() {
      if (document.getElementById("Software").checked) {
        console.log("Checked");
      } else {
        console.log("Checked");
      }
    }
  }
}
</script>

<style scoped>
table {
  table-layout: fixed;
}

th {
  width: 100px;
}

.float-child {
  float: left;
}
.center{
  margin-left: auto;
  margin-right: auto;
}
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
  height: 55px;
  width: 55px;
  padding: 5px;
}

.pills {
  color: #312e2e;
}

</style>