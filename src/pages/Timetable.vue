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

      <div class="col-md-6" id="checkBoxes" style="width: 300px; padding-left: 10px; margin-left: 40px;">
        <div class=" collapse" id="moduleOptions">
          <div class="card card-body">
            <h3>Module Options</h3>
            <p>Enter details:</p>
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
            <div id="moduleColor" class="mb-3">
              <p><em>Choose a Colour:</em></p>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                       value="lightskyblue" checked>
                <label class="form-check-label" for="inlineRadio1"
                       style="width: 20px; height: 20px; border:solid; background-color: lightskyblue;"></label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                       value="lightyellow">
                <label class="form-check-label" for="inlineRadio2"
                       style="width: 20px; height: 20px; border:solid; background-color: lightyellow;"></label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3"
                       value="palegreen">
                <label class="form-check-label" for="inlineRadio3"
                       style="width: 20px; height: 20px; border:solid; background-color: palegreen;"></label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4"
                       value="lightpink">
                <label class="form-check-label" for="inlineRadio4"
                       style="width: 20px; height: 20px; border:solid; background-color: lightpink;"></label>
              </div>
            </div>
            <div class="input-group mb-3" style="margin-top:1px">
              <button class="btn btn-secondary" type="button" id="addModuleButton" @click="addModule">
                Add
              </button>
              <input type="text" class="form-control" placeholder="Module Name" id="addModuleInput">
            </div>
            <div class="input-group mb-3" style="margin-top:1px">
              <button class="btn btn-secondary" type="button" id="button-addon1" @click="removeModule">Remove</button>
              <select class="form-select" id="selectRemove">
                <option selected>Choose...</option>
              </select>
            </div>
            <div class="input-group mb-3">
              <div class="row">
                <div class="col">
                  <button class="btn btn-secondary" style="padding:7px; margin-top: 15px; width: 50x" type="button"
                          data-bs-toggle="collapse" data-bs-target="#moduleOptions"
                          aria-expanded="false" aria-controls="moduleOptions" @click="newSave">Save
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
import {httpsCallable, getFunctions} from "firebase/functions";
import app from "@/api/firebase";
import {getAuth, updateProfile} from "firebase/auth";

const functions = getFunctions(app);
const auth = getAuth(app);
const user = auth.currentUser;

let totalModuleCount;

export default {
  data() {
    return {}
  },
  mounted() {
    this.loadTimetable() //Loads timetable with page
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
      const colorOptions = document.querySelectorAll('input[name="inlineRadioOptions"]');

      let selectedColour;

      console.log("Table slot ID: " + slot);
      if (input !== "" && day !== "" && time !== "") {
        if (document.getElementById(slot).innerHTML == "") {
          moduleList.innerHTML += '<div id="' + slot + 'Opt"' + '>' + '<li class="list-group-item">' +
              '<label>' + input + '</label>' +
              '</li>' + '</div>';

          moduleOption.innerHTML += '<option value=' + slot + ' id=' + slot + 'List' + '>' + input + '</option>';

          tableSlot.innerText = input;

          for (const colorOption of colorOptions) {

            if (colorOption.checked) {
              tableSlot.style.backgroundColor = colorOption.value;
              break;
            }
          }
          this.newSave();
        } else {
          console.log("NOT Clear")
          moduleListed.parentNode.removeChild(moduleListed)
          listedModule.parentNode.removeChild(listedModule)
          console.log("Clear")
          console.log(moduleList);
          moduleList.innerHTML += '<div id="' + slot + 'Opt"' + '>' + '<li class="list-group-item">' +
              '<label>' + input + '</label>' +
              '</li>' + '</div>';

          moduleOption.innerHTML += '<option value=' + slot + ' id=' + slot + 'List' + '>' + input + '</option>';

          console.log("Get Slot:" + tableSlot);
          tableSlot.innerText = input;

          for (const colorOption of colorOptions) {

            if (colorOption.checked) {
              tableSlot.style.backgroundColor = colorOption.value;
              break;
            }
          }
          console.log("Colour: " + selectedColour);
          this.newSave();
        }
        this.newSave();
      }
    },

    newSave() {
      let moduleList = document.querySelector("#moduleList");
      let moduleRemoveOptions = document.getElementById("selectRemove");
      let timetable = document.getElementById("timetable");

      var userData = {};
      userData["moduleRemoveOptions"] = moduleRemoveOptions.innerHTML;
      userData["moduleList"] = moduleList.innerHTML;
      userData["timetable"] = timetable.innerHTML;
      const dataUpload = httpsCallable(functions, 'SubmitUserData');
      dataUpload(userData).then((result) => {
        console.log(result.data);
      });
      this.sendJSON();
    },

    sendJSON() {
      let timetableData = {};

      for (let i = 9; i < 19; i++) {
        let monday = i + "monday";
        let tuesday = i + "tuesday";
        let wednesday = i + "wednesday";
        let thursday = i + "thursday";
        let friday = i + "friday";

        console.log(monday);
        if (document.getElementById(monday).innerHTML != "") {
          console.log("Monday Check :" + monday.toString())
          timetableData[monday] = document.getElementById(monday).innerText;
        }
        if (document.getElementById(tuesday).innerHTML != "") {
          console.log("Tuesday Check")
          timetableData[tuesday] = document.getElementById(tuesday).innerText;
        }
        if (document.getElementById(wednesday).innerHTML != "") {
          console.log("Wednesday Check")
          timetableData[wednesday] = document.getElementById(wednesday).innerText;
        }
        if (document.getElementById(thursday).innerHTML != "") {
          console.log("Thursday Check")
          timetableData[thursday] = document.getElementById(thursday).innerText;
        }
        if (document.getElementById(friday).innerHTML != "") {
          console.log("Friday Check")
          timetableData[friday] = document.getElementById(friday).innerText;
        }
      }
      console.log("Saving")
      console.log(timetableData);
      timetableData =JSON.stringify(timetableData);
      var userData = {};
      userData["timetableJSON"] = timetableData;
      const dataUpload = httpsCallable(functions, 'SubmitUserData');
      dataUpload(userData).then((result) => {
        console.log(result.data);
      });
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
      timetableSlot.style.backgroundColor = "";
      moduleListed.parentNode.removeChild(moduleListed)
      listedModule.parentNode.removeChild(listedModule)
    }
    ,

    loadTimetable() {
      console.log("Loading")
      const dataRequest = httpsCallable(functions, 'GetUserData');
      dataRequest().then((result) => {
        const userData = result.data;
        let timetable = JSON.stringify(userData["timetable"]);
        let moduleList = JSON.stringify(userData["moduleList"]);
        let moduleRemove = JSON.stringify(userData["moduleRemoveOptions"]);

        if (timetable.length != "") {
          this.setTimetable(timetable, moduleList, moduleRemove)
        }
      });
    }
    ,

    setTimetable(timetable, moduleList, moduleRemove) {
      document.querySelector("#moduleList").innerHTML = JSON.parse(moduleList);
      document.getElementById("selectRemove").innerHTML = JSON.parse(moduleRemove);
      document.getElementById("timetable").innerHTML = JSON.parse(timetable);
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

.center {
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