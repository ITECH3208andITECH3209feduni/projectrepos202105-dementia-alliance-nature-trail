var modal = document.getElementById("modal");
var modalUnlockedContent = document.getElementById("modal_unlocked_content");
var modalLockedContent = document.getElementById("modal_locked_content");
var modalAnimalImage = document.getElementById("m_animal_img");
var modalHintImage = document.getElementById("m_hint_img");
var modalMapHintImage = document.getElementById("m_map_hint_img");
var modalAnimalSound = document.getElementById("audio_animal");
var modalStorySound = document.getElementById("audio_animal_story");
var modalAnimalStory = document.getElementById("modal_story");
var modalAnimalFacts = document.getElementById("modal_facts");
var modalBioInfo = document.getElementById("modal_animal_bio");

function displayPopup(animalName) {
    const animalsIndex = animals.findIndex(item => item.name === animalName);

    if (animalName != "" && window.localStorage.getItem(animalName) == "true") {    
        setupUnlockedPopup(animalsIndex);
        modalUnlockedContent.style.display = "flex";
    }
    else {
        setupLockedPopup(animalsIndex);
        modalLockedContent.style.display = "flex";
    }

    modal.style.display = "block";
}

function setupLockedPopup(animalIndex) {
    setupModalHintImage(animalIndex);
    setupModalMapHintImage(animalIndex);
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

function setupModalHintImage(animalIndex) {
    modalHintImage.src = animals[animalIndex].hint_photo;
}

function setupModalMapHintImage(animalIndex) {
    modalMapHintImage.src = animals[animalIndex].hint_map;
}

function closeModal(unlockedContent) {
  modal.style.display = "none";
  if(unlockedContent) {
      modalUnlockedContent.style.display = "none";
  }
  else {
      modalLockedContent.style.display = "none";
  }
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