// Get the modal
var modal = document.getElementById("modal");
var modalContent = document.getElementById("modal_content");
var modalAnimalImage = document.getElementById("m_animal_img");
var modalAnimalSound = document.getElementById("audio_animal");
var modalStorySound = document.getElementById("audio_animal_story");
var modalAnimalStory = document.getElementById("modal_story");
var modalAnimalFacts = document.getElementById("modal_facts");
var modalBioInfo = document.getElementById("modal_animal_bio");

function displayPopup(animalName) {

    if (animalName != "" && window.localStorage.getItem(animalName) == "true") {
        const index = animals.findIndex(item => item.name === animalName);
        setupUnlockedPopup(index);
        modal.style.display = "block";
    }
    else {
        displayAnimalHintPopup(animalName);
    }
}

function setupUnlockedPopup(animalIndex) {
   setupModalImage(animalIndex);
   setupBio(animalIndex);
   setupAnimalSound(animalIndex);
   setupStorySound(animalIndex);
   setupStory(animalIndex);
   setupAnimalFacts(animalIndex);
}

function setupModalImage(animalIndex) {
    modalAnimalImage.src = animals[animalIndex].image_src;
}

function setupAnimalSound(animalIndex) {
    modalAnimalSound.src = animals[animalIndex].animal_sound_src;
}

function setupStorySound(animalIndex) {
    modalStorySound.src = animals[animalIndex].animal_audio_story_src;
}

function setupBio(animalIndex) {
    
    let m = modalBioInfo.getElementsByTagName('li');
    if (m.length == 5) {
       m[0].children[0].innerText = animals[animalIndex].bio_name;
       m[1].children[0].innerText = animals[animalIndex].bio_wadawurrung_name;
       m[2].children[0].innerText = animals[animalIndex].bio_scientific_name;
       m[3].children[0].innerText = animals[animalIndex].bio_size_range;
       m[4].children[0].innerText = animals[animalIndex].bio_weight;
    }
}

function setupStory(animalIndex) {
    
    let m = modalAnimalStory.getElementsByTagName('p');
    if (m.length == 3) {
       m[0].innerText = animals[animalIndex].animal_story_para1;
       m[1].innerText = animals[animalIndex].animal_story_para2;
       m[2].innerText = animals[animalIndex].animal_story_para3;
    }
}

function setupAnimalFacts(animalIndex) {
    
    let m = modalAnimalFacts.getElementsByTagName('p');
    if (m.length == 1) {
       m[0].innerText = animals[animalIndex].animal_facts;
    }
}

function displayAnimalHintPopup(animal) {

    modalContent.innerHTML = "";
    let h = document.createElement('h3');
    h.textContent = "Can't find me? Here's a clue!"
    modalContent.appendChild(h);

    let p = document.createElement('p');
        p.textContent = "hint for: " + animal;
        modalContent.appendChild(p);

    modal.style.display = "block";
}

var close = document.getElementsByClassName("close")[0]; //TODO make this an id maybe..
close.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


function toggleAnimalSound() {
    let sound = document.getElementById('audio_animal'); //TODO can use the global instead...
    toggleSound(sound);
}

function toggleStorySound() {
    let sound = document.getElementById('audio_animal_story'); //TODO can use the global instead...
    toggleSound(sound);
}

function toggleSound(sound) {
    if (sound.currentTime !== 0 && (sound.currentTime > 0 && sound.currentTime < sound.duration)) {
        sound.pause();
        sound.currentTime = 0;
    }
    else {
        sound.play();
    }
}