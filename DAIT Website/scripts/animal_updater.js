const allAnimalElements = document.getElementsByClassName("animal_wrapper");
let animalArray = [];

window.addEventListener("storage", storageListenerEventHandler);
  
document.addEventListener('DOMContentLoaded', function() {
  createAnimalArray();

  // Information found on the QRcode for a local device(replace with webiste URL) setup is: https://192.168.86.51:5500/qrPrototype/?animal=koala
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const animal = urlParams.get('animal')
  if (animalArray.includes(animal)) {
    window.localStorage.setItem(animal, true);
  }

  updateAllAnimalPanels();

  if (animalArray.includes(animal)){
  alert("Animal pop-up for the: " + animal); // For testing purposes to imitate the popup
  window.history.replaceState(null, null, window.location.pathname); // replace the url pathname to remove the parameters so the pop up doesn't show on refresh
  }

}, false);

function createAnimalArray() {
  for(i = 0; i < allAnimalElements.length; i++) {
    id = allAnimalElements[i].id;

    if (id != "") {
      animalArray.push(id);
    }
  }
}  

function updateAllAnimalPanels() {
  for(i = 0; i < allAnimalElements.length; i++) {
    id = allAnimalElements[i].id;

    if (id != "" && window.localStorage.getItem(id) == "true") {
      allAnimalElements[i].style.filter = "grayscale(0%)";
    } else {
      allAnimalElements[i].style.filter = "grayscale(100%)";
    }    
  }
}

function updateAnimalPanel(id) {

  if (window.localStorage.getItem(id) == "true") {
    document.getElementById(id).style.filter = "grayscale(0%)";
  } else {
    document.getElementById(id).style.filter = "grayscale(100%)";
  }    
}

function storageListenerEventHandler(event) {
  key = event.key;  
  updateAnimalPanel(key)
}