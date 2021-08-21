const allAnimalElements = document.getElementsByClassName("animal_wrapper");
let animalArray = [];

window.addEventListener("storage", storageListenerEventHandler);
  
document.addEventListener('DOMContentLoaded', function() {
  createAnimalArray();

  // Information found on the QRcode for a local device(replace with webiste URL) setup is: https://192.168.86.51:5500/qrPrototype/?animal=koala
  const animalFromUrlParams = getUrlParams();
  updateLocalStorageAnimal(animalFromUrlParams);
  updateLocalStorageAnimal(animalArray[0]);
  updateAllAnimalPanels();

  if (animalArray.includes(animalFromUrlParams)){
  alert("Animal pop-up for the: " + animalFromUrlParams); // For testing purposes to imitate the popup
  window.history.replaceState(null, null, window.location.pathname); // replace the url pathname to remove the parameters so the pop up doesn't show on refresh
  }

}, false);

function updateLocalStorageAnimal(animal) {
  if (animalArray.includes(animal) && window.localStorage.getItem(animal) != "true") {
    window.localStorage.setItem(animal, true);
    if (animal == animals[0].name) { //TODO unsure if this is the right approach on handling starter animal
      displayPopup(animal);
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
  updateAnimalPanel(key)
}