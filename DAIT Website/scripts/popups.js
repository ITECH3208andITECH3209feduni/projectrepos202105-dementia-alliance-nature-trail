var modal = document.getElementById("modal");
var modalUnlockedContent = document.getElementById("modal_unlocked_content");
var modalLockedContent = document.getElementById("modal_locked_content");
var modalEndingStoryContent = document.getElementById("modal_ending_story_content");
var modalLockedEndingStoryContent = document.getElementById("modal_locked_ending_story_content");
var modalExternalFirstScanContent = document.getElementById("modal_external_first_scan_content");
var modalLockStatusConfirmationContent = document.getElementById("modal_lock_status_confirmation_content");
var modalAnimalImage = document.getElementById("m_animal_img");
var modalHintImage = document.getElementById("m_hint_img");
var modalMapHintImage = document.getElementById("m_map_hint_img");
var modalAnimalSound = document.getElementById("audio_animal");
var modalStorySound = document.getElementById("audio_animal_story");
var modalEndingStorySound = document.getElementById("audio_ending_story");
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

    modal.style.display = "flex";
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
    modalAnimalImage.alt = animals[animalIndex].image_alt;
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
    modalHintImage.alt = animals[animalIndex].hint_alt;
}

function setupModalMapHintImage(animalIndex) {
    modalMapHintImage.src = animals[animalIndex].hint_map;
    modalMapHintImage.alt = animals[animalIndex].map_alt;
}

function closeModal(contentType) {
    modal.style.display = "none";

    switch (contentType) {
        case "unlocked":
            modalUnlockedContent.style.display = "none";
            stopSound(modalStorySound);
            stopSound(modalAnimalSound);
            break;
        case "locked":
            modalLockedContent.style.display = "none";
            break;
        case "ending story":
            modalEndingStoryContent.style.display = "none";
            stopSound(modalEndingStorySound);
            break;
        case "locked ending story":
            modalLockedEndingStoryContent.style.display = "none";
            break;
        case "external first time":
            modalExternalFirstScanContent.style.display = "none";
            break;
        case "lock status":
            toggleLockStatus();
        case "lock status confirmed":
            modalLockStatusConfirmationContent.style.display = "none";
            break;
    }
}

// When the user clicks anywhere outside of the modal, close it and all modal contents
window.onclick = function (event) {
    if (event.target == modal) {
        hideAllModals();
    }
}


function hideAllModals() {
    modal.style.display = "none";
    if (modalUnlockedContent.style.display != "none") {
        closeModal("unlocked");
    }
    if (modalEndingStoryContent.style.display != "none") {
        closeModal("ending story");
    }
    if (modalLockStatusConfirmationContent.style.display != "none") {
        closeModal("lock status");
    }
    else {
        closeModal("lock status confirmed");
    }
    modalLockedContent.style.display = "none";
    modalLockedEndingStoryContent.style.display = "none";
    modalExternalFirstScanContent.style.display = "none";
}

function toggleAnimalSound() {
    toggleSound(modalAnimalSound);
}

function toggleStorySound() {
    toggleSound(modalStorySound);
}

function toggleEndingStorySound() {
    toggleSound(modalEndingStorySound);
}

function toggleSound(sound) {
    if (stopSound(sound) == false) {
        sound.play();
    }
}

function stopSound(sound) {
    let soundStoped = false;
    if (sound.currentTime !== 0 && (sound.currentTime > 0 && sound.currentTime < sound.duration)) {
        sound.pause();
        sound.currentTime = 0;
        soundStoped = true;
    }
    return soundStoped;
}

function handleUserInput(inputValue) {
    closeModal("external first time");
    
    if(inputValue == "Starter Story") {
        displayPopup(animals[0].name);
    }
    else if (inputValue == "How To Play") {
        location.href = "howtoplay.html";
    }
}

function displayExternalFirstScanPopup() {
    modalExternalFirstScanContent.style.display = "flex";
    modal.style.display = "flex";
}

function displayLockStatusConfirmationPopup() {
    modalLockStatusConfirmationContent.style.display = "flex";
    modal.style.display = "flex";
}

function displayStoryEndingPopup() {
    if (allAnimalsFound()) {
        modalEndingStoryContent.style.display = "flex";
    }
    else {
        modalLockedEndingStoryContent.style.display = "flex";
    }
    modal.style.display = "flex";
}