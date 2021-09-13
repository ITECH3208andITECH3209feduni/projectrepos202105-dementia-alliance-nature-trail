const allAnimalElements = document.getElementsByClassName("animal_wrapper");
const lockToggle = document.getElementById("lock_toggle");
const storyEnding = document.getElementById("storyending");
let animalArray = [];

window.addEventListener("storage", storageListenerEventHandler);
  
document.addEventListener('DOMContentLoaded', function() {
  firstEncounterFlag = false;
  createAnimalArray();
  populateLocalStorageWithAnimals();

  if (window.localStorage.getItem(animals[0].name) != "true") {
    updateLocalStorageAnimal(animals[0].name, true);
    firstEncounterFlag = true;
    displayExternalFirstScanPopup();
  }

  // Information found on the QRcode for a local device(replace with webiste URL) setup is: https://192.168.86.51:5500/qrPrototype/?animal=koala
  const animalFromUrlParams = getUrlParams();
  updateLocalStorageAnimal(animalFromUrlParams, true);
  updateAllAnimalPanels();

  if (animalArray.includes(animalFromUrlParams)){
    if (firstEncounterFlag == false) {
      displayPopup(animalFromUrlParams); // For testing purposes to imitate the popup
    }
    window.history.replaceState(null, null, window.location.pathname); // replace the url pathname to remove the parameters so the pop up doesn't show on refresh
  }

  setLockToggleStatus();

}, false);

function updateLocalStorageAnimal(animal, trueORfalse) {
  if(animalArray.includes(animal)) {
    if (trueORfalse == true && window.localStorage.getItem(animal) != "true") {
      window.localStorage.setItem(animal, true);
    }
    else if (trueORfalse == false && window.localStorage.getItem(animal) != "false") {
      window.localStorage.setItem(animal, false);
    }
  }
}

function getUrlParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const animal = urlParams.get('animal');
  return animal;
}

function createAnimalArray() {
  animals.forEach(animal => {
    if (animal.name != "") {
      animalArray.push(animal.name);
    }
  });
}  

function populateLocalStorageWithAnimals() {
  animalArray.forEach(animal => {
    if (window.localStorage.getItem(animal) == null) {
      updateLocalStorageAnimal(animal, false);
    }
  });
}

function updateAllAnimalPanels() {
  for (i = 0; i < allAnimalElements.length; i++) {
    id = allAnimalElements[i].id;

    element = document.getElementById(id);

    if (id != "" && window.localStorage.getItem(id) == "true") {
      element.children[1].style.filter = "grayscale(0%)";
      element.children[0].src = "assets/unlocked.svg";
    } else {
      element.children[1].style.filter = "grayscale(100%)";
      element.children[0].src = "assets/locked.svg";
    }
  }
  updateFinalStoryPanel();
}

function updateAnimalPanel(id) {

  element = document.getElementById(id);

  if (window.localStorage.getItem(id) == "true") {
    element.children[1].style.filter = "grayscale(0%)";
    element.children[0].src = "assets/unlocked.svg";
  } else {
    element.children[1].style.filter = "grayscale(100%)";
    element.children[0].src = "assets/locked.svg";
  }
  updateFinalStoryPanel();    
}

function storageListenerEventHandler(event) {
  key = event.key;  
  if (animalArray.includes(key)){
    updateAnimalPanel(key)
  }
  updateFinalStoryPanel();
  setLockToggleStatus();
}

function updateFinalStoryPanel() {
  if (allAnimalsFound()) {
    storyEnding.children[1].style.filter = "grayscale(0%)";
    storyEnding.children[0].src = "assets/unlocked.svg";
  }
  else {
    storyEnding.children[1].style.filter = "grayscale(100%)";
    storyEnding.children[0].src = "assets/locked.svg";
  }
}

function allAnimalsFound() {
  let allAnimalsFound = true;

  for (i = 0; i < animalArray.length; i++) {
    if (window.localStorage.getItem(animalArray[i]) != "true") {
      allAnimalsFound = false;
      break;
    }
  }
  return allAnimalsFound
}

function setLockToggleStatus() {
  if (allAnimalsFound()) {
    lockToggle.checked = true;
  }
  else {
    lockToggle.checked = false;
  }
}

function handleLockToggle (confimation) {
  if (confimation == "Confirm") {
    if (lockToggle.checked == true) {
      unlockAllAnimals();
    } else {
      lockAllAnimals();
    }
    closeModal("lock status confirmed");
  }
  else if (confimation == "Cancel") {
    closeModal("lock status");
  }
}

function toggleLockStatus() {
  if (lockToggle.checked == true) {
    lockToggle.checked = false;
  } else {
    lockToggle.checked = true;
  }
}

function unlockAllAnimals () {
  animalArray.forEach(animal => {
    updateLocalStorageAnimal(animal, true);
  });
  updateAllAnimalPanels();
}

function lockAllAnimals () {
  animalArray.forEach(animal => {
    if (animal != animals[0].name) {
      updateLocalStorageAnimal(animal, false);
    }
  });
  updateAllAnimalPanels();
}