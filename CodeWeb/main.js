// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, push, onValue, set } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDIOvd62WRT3V_SimVEQCrEvctIHrhXdqU",
//     authDomain: "garden-80ba6.firebaseapp.com",
//     databaseURL: "https://garden-80ba6-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "garden-80ba6",
//     storageBucket: "garden-80ba6.appspot.com",
//     messagingSenderId: "574844418847",
//     appId: "1:574844418847:web:346ad396c04990d3934e2a"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDU_DaaczKPOcAegzPHFMAiTTrrugRwbEs",
  authDomain: "smartfarm-f1f7d.firebaseapp.com",
  projectId: "smartfarm-f1f7d",
  storageBucket: "smartfarm-f1f7d.appspot.com",
  messagingSenderId: "455537464701",
  appId: "1:455537464701:web:0615dfaa9005cf99982814"
};
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);


var temp = 0;
var humid;
var mois = 0;
  // Lay du lieu tu firebase
const database = getDatabase(app);
const temperature = ref(database, "Temperature");
const moisture = ref(database, "Moisture");
const humidity = ref(database, "Humidity");
const hose = ref(database, "Hose");

var Moisture = null;
var selectedMoisture = -1;
var compareMoisture = -1;
var check_hose = 1;
var c = true;

var temperature_value = [];
var temperature_time = [];
var dataTem = 0;

var humidity_value = [];
var humidity_time = [];
var dataHumid = 0;

var moisture_value = [];
var moisture_time = [];
var dataMois = 0;






// --------------- Circle of Temperature --------------------

function drawTem() {
  let progressBar = document.querySelector(".circle_progressTem"); 
  let valueContainer = document.querySelector(".value_containerTem");

  let progressValue = 0;
  let speed = 20;
  progressBar.style.background = `conic-gradient( 
    #4d5bf9 ${progressValue * 3.6}deg,
    #cadcff ${progressValue * 3.6}deg
    )`;
  let progress = setInterval(() => {
    progressValue++;
    if (progressValue >= temperature_value[temperature_value.length-1]) { 
      progressValue = temperature_value[temperature_value.length-1];
      clearInterval(progress);
      progressBar.style.background = `conic-gradient( 
        #4d5bf9 ${progressValue * 3.6}deg,
        #cadcff ${progressValue * 3.6}deg
        )`;
    }
    valueContainer.textContent = `${progressValue} °C`;
    progressBar.style.background = `conic-gradient( 
    #4d5bf9 ${progressValue * 3.6}deg,
    #cadcff ${progressValue * 3.6}deg
    )`;

  }, speed);
}


// --------------- Graph of Temperature --------------------
const ctx = document.getElementById('TemChart');
var chartTem = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Temperature',
      data: [],
      backgroundColor: [
          'rgba(255, 26, 104, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(0, 0, 0, 0.2)'
          ],
      borderColor: [
          'rgba(255, 26, 104, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 0, 0, 1)'
          ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// --------------- Circle of Humidity --------------------

const ctx1 = document.getElementById('HumidChart');

function drawHumid() {
  let progressBar = document.querySelector(".circle_progressHumid"); 
  let valueContainer = document.querySelector(".value_containerHumid");

  let progressValue = 0;
  let speed = 20;
  progressBar.style.background = `conic-gradient( 
    #4d5bf9 ${progressValue * 3.6}deg,
    #cadcff ${progressValue * 3.6}deg
    )`;
  let progress = setInterval(() => {
    progressValue++;
    if (progressValue >= humidity_value[humidity_value.length-1]) { 
      progressValue = humidity_value[humidity_value.length-1];
      clearInterval(progress);
      progressBar.style.background = `conic-gradient( 
        #4d5bf9 ${progressValue * 3.6}deg,
        #cadcff ${progressValue * 3.6}deg
        )`;
    }
    valueContainer.textContent = `${progressValue} %`;
    progressBar.style.background = `conic-gradient( 
    #4d5bf9 ${progressValue * 3.6}deg,
    #cadcff ${progressValue * 3.6}deg
    )`;


  }, speed);
}
  
// --------------- Graph of Humidity --------------------
var chartHumid = new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Humidity',
      data: [],
      backgroundColor: [
          'rgba(255, 26, 104, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(0, 0, 0, 0.2)'
          ],
          borderColor: [
              'rgba(255, 26, 104, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(0, 0, 0, 1)'
              ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// -----------------------Circle of Moisture ----------------------
const ctx2 = document.getElementById('MoisChart');

function drawMois() {
  let progressBar = document.querySelector(".circle_progressMois"); 
  let valueContainer = document.querySelector(".value_containerMois");

  let progressValue = 0;
  let speed = 20;
  progressBar.style.background = `conic-gradient( 
    #4d5bf9 ${progressValue * 3.6}deg,
    #cadcff ${progressValue * 3.6}deg
    )`;
  let progress = setInterval(() => {
    if(mois == 0){
      valueContainer.textContent = `${0} %`;
      progressBar.style.background = `conic-gradient( 
        #4d5bf9 ${progressValue * 3.6}deg,
        #cadcff ${progressValue * 3.6}deg
      )`;
      clearInterval(progress);
    }
    else{
      progressValue = progressValue == 100 ? 100 : progressValue+1;
      if (progressValue >= moisture_value[moisture_value.length-1]) { 
        progressValue = moisture_value[moisture_value.length-1];
        clearInterval(progress);
        progressBar.style.background = `conic-gradient( 
          #4d5bf9 ${progressValue * 3.6}deg,
          #cadcff ${progressValue * 3.6}deg
        )`;
      }
      valueContainer.textContent = `${progressValue} %`;
      progressBar.style.background = `conic-gradient( 
      #4d5bf9 ${progressValue * 3.6}deg,
      #cadcff ${progressValue * 3.6}deg
      )`;
  
      if (progressValue == moisture_value[moisture_value.length-1]) { 
          clearInterval(progress);
          progressBar.style.background = `conic-gradient( 
            #4d5bf9 ${progressValue * 3.6}deg,
            #cadcff ${progressValue * 3.6}deg
          )`;
      }
    }
  }, speed);
}
  
// --------------- Graph of Moisture --------------------
var chartMois = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Moisture',
      data: [],
      backgroundColor: [
          'rgba(255, 26, 104, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(0, 0, 0, 0.2)'
          ],
          borderColor: [
              'rgba(255, 26, 104, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(0, 0, 0, 1)'
              ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});



onValue(temperature, (snapshot) => { // doc du lieu khi percent co su thay doi
  dataTem = snapshot.val();
  temp = dataTem;
  console.log(dataTem);
  // chart1 = new ApexCharts(document.querySelector("#infoTem"), render1());
  // chart1.render();
  var time = new Date();
  var gio = time.getHours();
  var phut = time.getMinutes();
  var giay = time.getSeconds();
  if (gio < 10) 
      gio = "0" + gio;
  if (phut < 10) 
      phut = "0" + phut;
  if (giay < 10) 
      giay = "0" + giay;
  
  if(temperature_time.length == 12){
      temperature_value = temperature_value.slice(1);
      temperature_value.push(dataTem);
      temperature_time = temperature_time.slice(1);
      temperature_time.push(gio + ":" + phut + ":");
      chartTem.data.labels.unshift(temperature_time[temperature_time.length - 1]);
      chartTem.data.labels.pop();
      chartTem.data.datasets.forEach((dataset) => {
        dataset.data.unshift(temperature_value[temperature_value.length-1]);
      });
      chartTem.data.datasets.forEach((dataset) => {
        dataset.data.pop();
      });

  }
  else{
      temperature_value.push(dataTem);
      temperature_time.push(gio + ":" + phut);
      chartTem.data.labels.unshift(temperature_time[temperature_time.length - 1]);
      chartTem.data.datasets.forEach((dataset) => {
        dataset.data.unshift(temperature_value[temperature_value.length-1]);
      });
  }
  drawTem();
  console.log(temperature_value);
  console.log(temperature_time);
  chartTem.update();
});




onValue(humidity, (snapshot) => { // doc du lieu khi percent co su thay doi
  dataHumid = snapshot.val();
  console.log(dataHumid);
  // var chart2 = new ApexCharts(document.querySelector("#infoHumid"), render2());
  // chart2.render();
  // chart1 = new ApexCharts(document.querySelector("#infoTem"), render1());
  // chart1.render();
  var time = new Date();
  var gio = time.getHours();
  var phut = time.getMinutes();
  var giay = time.getSeconds();
  if (gio < 10) 
      gio = "0" + gio;
  if (phut < 10) 
      phut = "0" + phut;
  if (giay < 10) 
      giay = "0" + giay;
  
  if(humidity_time.length == 12){
    humidity_value = humidity_value.slice(1);
    humidity_value.push(dataHumid);
    humidity_time = humidity_time.slice(1);
    humidity_time.push(gio + ":" + phut + ":");
    chartHumid.data.labels.unshift(humidity_time[humidity_time.length - 1]);
      chartHumid.data.labels.pop();
      chartHumid.data.datasets.forEach((dataset) => {
        dataset.data.unshift(humidity_value[humidity_value.length-1]);
      });
      chartHumid.data.datasets.forEach((dataset) => {
        dataset.data.pop();
      });
  }
  else{
    humidity_value.push(dataHumid);
    humidity_time.push(gio + ":" + phut);
    chartHumid.data.labels.unshift(humidity_time[humidity_time.length - 1]);
    chartHumid.data.datasets.forEach((dataset) => {
        dataset.data.unshift(humidity_value[humidity_value.length-1]);
      });
  }
  drawHumid();
  console.log(humidity_value);
  console.log(humidity_time);
  chartHumid.update();
});

onValue(moisture, (snapshot) => { // doc du lieu khi percent co su thay doi
  mois = snapshot.val();
  compareMoisture = mois;
  console.log(mois);

  // var chart2 = new ApexCharts(document.querySelector("#infoHumid"), render2());
  // chart2.render();
  // chart1 = new ApexCharts(document.querySelector("#infoTem"), render1());
  // chart1.render();
  var time = new Date();
  var gio = time.getHours();
  var phut = time.getMinutes();
  var giay = time.getSeconds();
  if (gio < 10) 
      gio = "0" + gio;
  if (phut < 10) 
      phut = "0" + phut;
  if (giay < 10) 
      giay = "0" + giay;
  
  if(moisture_time.length == 12){
    moisture_value = moisture_value.slice(1);
    moisture_value.push(mois);
    moisture_time = moisture_time.slice(1);
    moisture_time.push(gio + ":" + phut + ":");
    chartMois.data.labels.unshift(moisture_time[moisture_time.length - 1]);
    chartMois.data.labels.pop();
    chartMois.data.datasets.forEach((dataset) => {
        dataset.data.unshift(moisture_value[moisture_value.length-1]);
      });
      chartMois.data.datasets.forEach((dataset) => {
        dataset.data.pop();
      });
  }
  else{
    moisture_value.push(mois);
    moisture_time.push(gio + ":" + phut);
    chartMois.data.labels.unshift(moisture_time[moisture_time.length - 1]);
    chartMois.data.datasets.forEach((dataset) => {
        dataset.data.unshift(moisture_value[moisture_value.length-1]);
      });
  }
  drawMois();
  console.log(moisture_value);
  console.log(moisture_time);
  chartMois.update();
});


let btnOn = document.querySelector('#btnOn');
let imgHose = document.querySelector('#hose');
let btnOff = document.querySelector('#btnOff');
var toggle = 0

var check_toggle = document.getElementById('switch')
check_toggle.addEventListener('change', function(){
  toggle = !toggle;
  console.log(toggle)
  set(hose, toggle)
})

onValue(hose, (snapshot) => { // doc du lieu khi percent co su thay doi
  const data = snapshot.val();
  toggle = data;
  if(Number(data) == 1){
      imgHose.src = 'img/tuoi_true.png';
      check_toggle.checked = true;
      set(hose, 1);
  }
  else{
      imgHose.src = 'img/tuoi_false.png';
      check_toggle.checked = false;
      set(hose, 0);
  }
});


function check_Moisture(Moisture){
  if(compareMoisture <= Number(Moisture)){
    set(hose, 1);
    check_hose = 0;
  }
  else if(!check_hose && selectedMoisture != -1){
    set(hose, 0);
    selectedMoisture = -1;
  }
} 

// let btn2 = document.querySelector('#btn2');

// btn2.addEventListener('click', ()=>{
//     Moisture = document.getElementById("txtMoisture");
//     selectedMoisture = Moisture.value;
//     console.log(selectedMoisture);
//     check_hose = 1;
//     check_Moisture(selectedMoisture);
// });
  
function check_time(){
  if(Number(document.getElementById("hiddentext").innerText) == 1 && c == true){
      // console.log("Hello");
      set(hose, 1);
      c = false;
      check_toggle.checked = true;
  }
  else if(Number(document.getElementById("hiddentext").innerText) == 0 && c == false){
      c = true;
      set(hose, 0);
      check_toggle.checked = false;
  }
  
};
setInterval(function(){
  check_time();
}, 1000);


// Check độ ẩm đất
let btnMois = document.querySelector('#btn2');
btnMois.addEventListener('click', ()=>{
  Moisture = document.getElementById("txtMoisture");
  selectedMoisture = Moisture.value;
  console.log(selectedMoisture);
  check_hose = 1;
  check_Moisture(selectedMoisture);
});

setInterval(function(){
  check_Moisture(selectedMoisture);
}, 1000);
//dem nguọc giơ
let check = null;
let thoigian = 0;
let check_10s = false;
function nguoc() {
  if (check !== null) {
      clearInterval(check);
      check = null;
  }
  let endTimeInput = document.getElementById('timeInput').value;
  let endTimeParts = endTimeInput.split(":");
  let endHour = parseInt(endTimeParts[0], 10);
  let endMinute = parseInt(endTimeParts[1], 10);

  let endDate = new Date();
  endDate.setHours(endHour);
  endDate.setMinutes(endMinute);
  endDate.setSeconds(0); 
  let previousHour = -1;
  document.getElementById("hiddentext").innerText=0;
  check = setInterval(function(){
      let now = new Date().getTime();
      let distance = endDate.getTime() - now;
      let hour = Math.floor((distance % (24*60*60*1000)) / (60*60*1000));
      let minute = Math.floor((distance % (60*60*1000)) / (60*1000));
      let seconds = Math.floor((distance % (60*1000)) / 1000);
      if (!isNaN(hour) && !isNaN(minute) && !isNaN(seconds)) {
          if (hour !== previousHour) {
              document.getElementById('hour').textContent = hour.toString().padStart(2, '0');
              previousHour = hour;
          }
      document.getElementById('minute').textContent = minute.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
      }
      if(distance <= 0){
        clearInterval(check);
        document.getElementById('hour').innerText = '00';
        document.getElementById('minute').innerText = '00';
        document.getElementById('seconds').innerText = '00';
        document.getElementById("hiddentext").innerText=1;
        thoigian = 10;
        check_10s = true;
      }
  }, 1000);
}
setInterval(function (){
    if(thoigian == 0 && check_10s){
      document.getElementById("hiddentext").innerText=0;
      check_10s = false;
    }
    else if(thoigian > 0){
      thoigian --;
    }
}, 1000);

document.getElementById('btn1').onclick = nguoc;
  
 
