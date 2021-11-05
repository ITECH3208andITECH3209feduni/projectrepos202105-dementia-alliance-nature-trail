const modal = document.getElementById("modal");
const modalUnlockedContent = document.getElementById("modal_unlocked_content");
const modalLockedContent = document.getElementById("modal_locked_content");
const modalEndingStoryContent = document.getElementById("modal_ending_story_content");
const modalLockedEndingStoryContent = document.getElementById("modal_locked_ending_story_content");
const modalExternalFirstScanContent = document.getElementById("modal_external_first_scan_content");
const modalLockStatusConfirmationContent = document.getElementById("modal_lock_status_confirmation_content");
const modalAnimalImage = document.getElementById("m_animal_img");
const modalHintImage = document.getElementById("m_hint_img");
const modalMapHintImage = document.getElementById("m_map_hint_img");
const modalAnimalSound = document.getElementById("audio_animal");
const modalStorySound = document.getElementById("audio_animal_story");
const modalEndingStorySound = document.getElementById("audio_ending_story");
const modalAnimalStory = document.getElementById("modal_story");
const modalAnimalFacts = document.getElementById("modal_facts");
const modalBioInfo = document.getElementById("modal_animal_bio");
const menu = document.getElementById("menu");
const storyending = document.getElementById("storyending");
var elementToFocus;

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
    elementToFocus = document.getElementById(animalName);
    setTabIndexValue (-1);
}

function setTabIndexValue (value) {
    let elementArray = [];
    elementArray = document.getElementsByClassName("tabIndexToggle");

    for (let index = 0; index < elementArray.length; index++) {
        elementArray[index].tabIndex = value;
    }
    if (value === 0) {
        elementToFocus.focus();
    }
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
    let openModal = null;
    
    switch (contentType) {
        case "unlocked":
            openModal = modalUnlockedContent;
            stopSound(modalStorySound);
            stopSound(modalAnimalSound);
            break;
        case "locked":
            openModal = modalLockedContent;
            break;
        case "ending story":
            openModal = modalEndingStoryContent;
            stopSound(modalEndingStorySound);
            elementToFocus = storyending;
            break;
        case "locked ending story":
            openModal = modalLockedEndingStoryContent;
            elementToFocus = storyending;
            break;
        case "external first time":
            openModal = modalExternalFirstScanContent;
            elementToFocus = menu;
            break;
        case "lock status cancel toggle":
            toggleLockStatus();
        case "lock status":
            openModal = modalLockStatusConfirmationContent;
            elementToFocus = lockToggle;
            break;
    }
    
    if (openModal != null) {
        openModal.getElementsByClassName("modal_scrollable_content")[0].scroll({top:0});
        openModal.style.display = "none";
        
        if (elementToFocus != null) {
            setTabIndexValue (0);
        }
    }

    modal.style.display = "none";
}

function keyDownCloseModal (e, contentType) {
    if (e.key === "Enter") {
        e.preventDefault();
        closeModal(contentType);
    }
}

// When the user clicks anywhere outside of the modal, close it and all modal contents
window.onclick = function (event) {
    if (event.target == modal) {
        hideAllModals();
    }
}


function hideAllModals() {
    if (modalUnlockedContent.style.display != "none") {
        closeModal("unlocked");
    }

    if (modalLockedContent.style.display != "none") {
        closeModal("locked");
    }

    if (modalEndingStoryContent.style.display != "none") {
        closeModal("ending story");
    }

    if (modalLockedEndingStoryContent.style.display != "none") {
        closeModal("locked ending story");
    }

    if (modalExternalFirstScanContent.style.display != "none") {
        closeModal("external first time");
    }

    if (modalLockStatusConfirmationContent.style.display != "none") {
        closeModal("lock status cancel toggle");
    } 
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
    setTabIndexValue (-1);
}

function keyDownDisplayLockStatusConfirmationPopup(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        toggleLockStatus();
        displayLockStatusConfirmationPopup();
    }
}

function displayLockStatusConfirmationPopup() {
    modalLockStatusConfirmationContent.style.display = "flex";
    modal.style.display = "flex";
    setTabIndexValue (-1);
}

function displayStoryEndingPopup() {
    if (allAnimalsFound()) {
        modalEndingStoryContent.style.display = "flex";
    }
    else {
        modalLockedEndingStoryContent.style.display = "flex";
    }
    modal.style.display = "flex";
    setTabIndexValue (-1);
}