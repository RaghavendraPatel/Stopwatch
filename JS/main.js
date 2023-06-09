let counter = document.querySelector("#disp");
let lapCounter = document.querySelector("#lap-disp");
let startStopButton = document.querySelector("#start-stop-btn");
let circle = document.querySelector("#c-progress");
let lapHistory = document.querySelector("#lap-history");

let count = 0;
let lapTimer = 0;
let lapCount = 1;
let setLap = false;
let timer;
let running = false;

//format milliseconds to redable format
const formatTime = (data) => {
  return (
    String(Math.floor(data / 6000)).padStart(2, "0") + //minutes
    ":" +
    String(Math.floor(data / 100) % 60).padStart(2, "0") + //seconds
    "." +
    String(data % 100).padStart(2, "0") //*10 milliseconds
  );
};

//play pause timer
const startStop = () => {
  if (running == false) {
    startStopButton.innerHTML =
      '<i class="fa-solid fa-circle-pause"  style="color: #4545ff;" onclick="startStop()"></i>';
    running = true;
    start();
  } else {
    startStopButton.innerHTML =
      '<i class="fa-solid fa-circle-play"  style="color: #4545ff;" onclick="startStop()"></i>';
    running = false;
    stop();
  }
};

//start timer
const start = () => {
  timer = setInterval(() => {
    circle.style.cssText = `stroke-dashoffset:${
      // 691 - ((Math.floor(count) % 6000) / 6000) * 691 //updates every 10ms make circular progress more smooth
      691 - ((Math.floor(count / 100) % 60) / 60) * 691 //updates every second
    }!important;`;
    counter.innerHTML = formatTime(count);
    count++;
    if (setLap) {
      lapCounter.innerHTML =
        '<i class="fa-regular fa-flag"></i> ' + formatTime(lapTimer);
      lapTimer++;
    }
  }, 10);
};

//stop timer
const stop = () => {
  clearInterval(timer);
};

//reset
const reset = () => {
  if (running == false) {
    running = false;
    count = 0;
    setLap = false;
    lapCount = 1;
    stop();

    //reset display
    startStopButton.innerHTML =
      '<i class="fa-solid fa-circle-play"  style="color: #4545ff;" onclick="startStop()"></i>';
    lapCounter.innerHTML = "";
    counter.innerHTML = "00:00.00";
    lapHistory.innerHTML = "";
    circle.style.cssText = `stroke-dashoffset: 690.5 !important;`;
  }
  //rest values
};

//format lap time
const formatLap = (data) => {
  return `<div class="lap-record">
        <p>${String(lapCount++).padStart(2, "0")}</p>
        <p>${formatTime(data)}</p>
        <p>${formatTime(count)}</p>
    </div>`;
};

//display lap
const lap = () => {
  if (count > 0) {
    if (setLap == false) {
      lapHistory.innerHTML += `<div class="lap-record" id="lap-title">
              <p>Lap</p>
              <p>Lap Time&nbsp&nbsp &nbsp</p>
              <p>Total</p>
          </div>
          <div id = "lap-entries"></div>`;
      document.querySelector("#lap-entries").innerHTML += formatLap(count);
    } else {
      if (lapTimer > 0) {
        document.querySelector("#lap-entries").innerHTML += formatLap(lapTimer);
      }
    }
    setLap = true;
    lapTimer = 0;
  }
};

window.addEventListener("keypress", (event) => {
  if (event.key == " ") {
    startStop();
  }
});
