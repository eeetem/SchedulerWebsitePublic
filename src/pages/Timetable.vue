<script setup>
import Navbar from '../components/Navbar.vue'
</script>
<template>
  <header>
    <Navbar/>
  </header>
  <body onload="loadTimetable()">
  <div class="float-container">
    <div class="float-child" style="width: 25%; padding: 10px;">
      <h3>Friends Online</h3>
      <ul class="list-group list-group-flush">
        <li class="list-group-item list-group-item-action"><img src="../assets/img_chania.jpg"
                                                                class="profile_pics rounded-circle" alt="Chania">Dennis
        </li>
        <li class="list-group-item list-group-item-action"><img src="../assets/egg.jpg"
                                                                class="profile_pics rounded-circle" alt="Chania">Aaron
        </li>
        <li class="list-group-item list-group-item-action"><img src="../assets/Grannygun.jpg"
                                                                class="profile_pics rounded-circle" alt="Chania">Tom
        </li>
        <li class="list-group-item list-group-item-action"><img src="../assets/Grannygun.jpg"
                                                                class="profile_pics rounded-circle" alt="Chania">Seamus
        </li>
      </ul>
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
            <button class="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#moduleOptions"
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
            <div class="input-group mb-3">
              <button class="btn btn-secondary" style="padding:5px; margin-top: 15px; width: 50px" type="button"
                      data-bs-toggle="collapse" data-bs-target="#moduleOptions"
                      aria-expanded="false" aria-controls="moduleOptions" @click="removeModule">Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </body>
</template>
<script>

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
      let slot = time + day;
      console.log("Table slot ID: " + slot);
      if (input !== "" && day !== "" && time !== "") {
        let moduleList = document.querySelector("#moduleList");
        console.log(moduleList);
        moduleList.innerHTML += '<li class="list-group-item">\n' +
            '<input class="form-check-input me-1" type="checkbox" id="firstCheckbox">\n' +
            '<label class="form-check-label" for="firstCheckbox">' + input + '</label>\n' +
            '<button class="btn btn-outline delete" type="button" style="float:right;" @click="removeModule">X</button>' +
            '</li>';

        let tableSlot = document.getElementById(slot);
        console.log("Get Slot:" + tableSlot);
        tableSlot.innerText = input;
        this.saveTimetable(input, slot);
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

    loadTimetable() {
      console.log("Loading")
      let moduleList = document.querySelector("#moduleList");
      fetch("timetable.json") //Gets data from this json file.(Not linked to server)
          .then(response => response.json())
          .then(data => {
            for (var i = 0; i < data.length; i++) {
              let tableSlot = document.getElementById(data[i].slot);
              console.log("Name:" + data[i].moduleName);
              moduleList.innerHTML += '<li class="list-group-item">\n' +
                  '<input class="form-check-input me-1" type="checkbox" id="firstCheckbox">\n' +
                  '<label class="form-check-label" for="firstCheckbox">' + data[i].moduleName + '</label>\n' +
                  '<button class="btn btn-outline delete" type="button" style="float:right;" @click="removeModule">X</button>' +
                  '</li>';

              tableSlot.innerHTML = data[i].moduleName;
            }
          })
    },

    //Remove method Doesnt work dynamically for some reason(Worked when it was hardcoded)
    removeModule() {
      let moduleSelect = document.querySelectorAll("#moduleList .delete");
      console.log(moduleSelect);
      Array.from(moduleSelect).forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          const li = e.target.parentElement;
          li.parentNode.removeChild(li);
        });
      });
    },

    //Will dipslay selected modules in list
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
.table {
  table-layout: fixed;
}

.float-child {
  float: left;
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
}

.pills {
  color: #312e2e;
}

</style>