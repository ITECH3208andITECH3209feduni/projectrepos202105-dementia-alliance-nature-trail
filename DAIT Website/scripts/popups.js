// Get the modal
var modal = document.getElementById("modal");
var modalContent = document.getElementById("modal_content");

function displayPopup(animal) {

    if (animal != "" && window.localStorage.getItem(animal) == "true") {
        getUnlockedPopupContent(animal);
    }
    else {
        displayAnimalHintPopup(animal);
    }
}


function getUnlockedPopupContent(animal) {
    switch (animal) {
        case "kookaburra":
            setupKookaburraPopup();
            break;
        case "koalawithbaby":
            setupKoalaWithBabyPopup();
            break;
        case "magpie":
            setupMagpiePopup();
            break;
        default:
        // code block
    }

    modal.style.display = "block";
}


function setupKookaburraPopup() {
    resetModalContent(modalContent);
    let p = document.createElement('p');
        p.textContent = "True this is the kookaburra";
       // modalContent.appendChild(p);
}

function setupMagpiePopup() {
    alert("true Magpie");
}

function displayAnimalHintPopup(animal) {

    resetModalContent(modalContent);
    let p = document.createElement('p');
        p.textContent = "hint for: " + animal;
       // modalContent.appendChild(p);

    modal.style.display = "block";
}

var close = document.getElementsByClassName("close")[0]; 
// When the user clicks on <span> (x), close the modal 
close.onclick = function() { // make this the x img
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function resetModalContent(modalContent) {
    let m = modalContent.getElementsByTagName('p');
    if (m.length > 0) {
       // m[0].remove();
    }

}

function toggleAnimalSound() {
    let sound = document.getElementById('audio_animal');

    if (sound.currentTime !== 0 && (sound.currentTime > 0 && sound.currentTime < sound.duration)) {
        sound.pause();
        sound.currentTime = 0;
    }
    else {
        sound.play();
    }
}