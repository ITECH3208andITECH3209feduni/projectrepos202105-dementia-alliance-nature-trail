const menu = document.getElementById("menu");
var elementToFocus;

function menuOnclickEventHandler() {
    const nav = document.getElementById("nav");

    nav.classList.toggle("change");
    document.getElementById("nav_links").scroll({ top: 0 });

    if (nav.classList.contains('change')) {
        setTabIndexValue(-1);
    }
    else {
        elementToFocus = menu;
        setTabIndexValue(0);
    }
}

function setTabIndexValue(value) {
    let elementArray = [];
    elementArray = document.getElementsByClassName("tabIndexToggle");

    for (let index = 0; index < elementArray.length; index++) {
        elementArray[index].tabIndex = value;
    }
    if (value === 0) {
        elementToFocus.focus();
    }
}

