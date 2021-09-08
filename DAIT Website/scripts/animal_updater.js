const allAnimalElements = document.getElementsByClassName("animal_wrapper");
const lockToggle = document.getElementById("lock_toggle");
let animalArray = [];

window.addEventListener("storage", storageListenerEventHandler);
  
document.addEventListener('DOMContentLoaded', function() {
  createAnimalArray();
  firstEncounterFlag = false;

  if (window.localStorage.getItem(animals[0].name) != "true") { //TODO unsure if this is the right approach on handling starter animal
    updateLocalStorageAnimal(animals[0].name);
    firstEncounterFlag = true;
    alert("Welcome to the trail, view starter story"); //TODO alert/popup will happen that has a button saying view starter story...
  }

  // Information found on the QRcode for a local device(replace with webiste URL) setup is: https://192.168.86.51:5500/qrPrototype/?animal=koala
  const animalFromUrlParams = getUrlParams();
  updateLocalStorageAnimal(animalFromUrlParams);
  updateAllAnimalPanels();

  if (animalArray.includes(animalFromUrlParams)){
    if (firstEncounterFlag == false) {
      displayPopup(animalFromUrlParams); // For testing purposes to imitate the popup
    }
    window.history.replaceState(null, null, window.location.pathname); // replace the url pathname to remove the parameters so the pop up doesn't show on refresh
  }

  setLockToggleStatus();

}, false);

function updateLocalStorageAnimal(animal) {
  if (animalArray.includes(animal) && window.localStorage.getItem(animal) != "true") {
    window.localStorage.setItem(animal, true);
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

function updateAllAnimalPanels() {
   for(i = 0; i < allAnimalElements.length; i++) {
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
}

function updateAnimalPanel(id) {

  element = document.getElementById(id);

  if (window.localStorage.getItem(id) == "true") {
    console.log(element);
    element.children[1].style.filter = "grayscale(0%)";
    element.children[0].src = "assets/unlocked.svg";
  } else {
    element.children[1].style.filter = "grayscale(100%)";
    element.children[0].src = "assets/locked.svg";
  }    
}

function storageListenerEventHandler(event) {
  key = event.key;  
  if (animalArray.includes(key)){
    updateAnimalPanel(key)
  }
}

function setLockToggleStatus() {
  let unlocked = true;

  for(i = 0; i < animalArray.length; i++) {
    if (window.localStorage.getItem(animalArray[i]) != "true") {
      unlocked = false;
      break;
    }
  }
  if(unlocked) {
    lockToggle.checked = unlocked;
  }
}

function handleLockToggle () {
  if (lockToggle.checked == true){
    unlockAllAnimals();
  } else {
    //TODO
  }
}

function unlockAllAnimals () {
  animalArray.forEach(animal => {
    updateLocalStorageAnimal(animal);
  });
  updateAllAnimalPanels();
}