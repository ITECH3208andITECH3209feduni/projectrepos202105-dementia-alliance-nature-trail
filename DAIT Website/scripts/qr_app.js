const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
const qrResult = document.getElementById("qr_result_text");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");
const cameraIcon = document.getElementById("camera_icon");
let scanning = false;
let interativeTrailStorage = window.localStorage;
let timeOut;


qrcode.callback = res => {
  if (res) {
    let resAnimal = "";

    resSplit = res.split("=");
    if (resSplit.length == 2) {
      resAnimal = resSplit[1];
    }

    if (animalArray.includes(resAnimal)) {
      updateAnimals(resAnimal);
    } else {
      setTabIndexValue(0);
    }

    stopCamera();
  }

  function updateAnimals(animal) {
    interativeTrailStorage.setItem(animal, true);
    updateAnimalPanel(animal);
    displayPopup(animal);
  }
};

btnScanQR.onclick = () => {
  if (scanning) {
    stopCamera();
    setTabIndexValue(0);
  } else {
    setTabIndexValue(-1);
    btnScanQR.tabIndex = 0;
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(function (stream) {
        scanning = true;
        canvasElement.hidden = false;
        cameraIcon.src = "assets/close.svg";
        timeOut = setTimeout(cameraTimeout, 30000);
        video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
        video.srcObject = stream;
        video.play();
        tick();
        scan();
      });
  }
  elementToFocus = btnScanQR;
};

function stopCamera() {
  scanning = false;
  canvasElement.hidden = true;
  clearTimeout(timeOut);
  cameraIcon.src = "assets/camera.svg";
  video.srcObject.getTracks().forEach(track => {
    track.stop();
  });
}

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}

function cameraTimeout() {
  stopCamera();
  setTabIndexValue(0);
}