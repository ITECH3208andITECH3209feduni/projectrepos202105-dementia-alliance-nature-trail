const allAnimalElements = document.getElementsByClassName("animal_wrapper");
let animalArray = [];

window.addEventListener("storage", storageListenerEventHandler);
  
document.addEventListener('DOMContentLoaded', function() {
  createAnimalArray();
  updateAllAnimalPanels();
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
    document.getElementById(id).style.filter = "grayscale(0%)"
  } else {
    document.getElementById(id).style.filter = "grayscale(100%)"
  }    
}

function storageListenerEventHandler(event) {
  key = event.key;  
  updateAnimalPanel(key)
}