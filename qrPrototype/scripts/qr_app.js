const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
const qrResult = document.getElementById("qr_result_text");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");
let scanning = false;
let interativeTrailStorage = window.localStorage;


qrcode.callback = res => {
  if (res) {

    resSplit = res.split("="); // used to split the qrcode information to extract the animal (updated to this approach so users don't need to have the website application already open)
    if (resSplit.length == 2) {
    resAnimal = resSplit[1];
    }

    if (animalArray.includes(resAnimal)){
      updateAnimals(resAnimal);
    }

    stopCamera();
    qrResult.hidden = false; // used for demonstration in the prototype, will be removed in final product.
  }

  function updateAnimals(animal) {
    interativeTrailStorage.setItem(animal, true);
    outputData.innerText = animal; // used for demonstration in the prototype, will be removed in final product.
    updateAnimalPanel(animal);
  }
};

btnScanQR.onclick = () => {
  if (scanning){
    stopCamera();
  }else{
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(function(stream) {
        scanning = true;
        qrResult.hidden = true; // used for demonstration in the prototype, will be removed in final product.
        canvasElement.hidden = false;
        video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
        video.srcObject = stream;
        video.play();
        tick();
        scan();
      });
  }
};

function stopCamera() {
  scanning = false;
  canvasElement.hidden = true;
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

function menuOnclickEventHandler(x) {
  x.classList.toggle("change");
}