menuOnclickEventHandler = (x) => {
    const nav = document.getElementById("nav");

    nav.classList.toggle("change");
    document.getElementById("nav_links").scroll({top:0});

    if (nav.classList.contains('change')) {
        setTabIndexValue (-1);
    }
    else {
        setTabIndexValue (0);
    }
}

function keyDownMenuOnclickEventHandler(e) {
    if (e.key === "Enter") {
        menuOnclickEventHandler();
    }
}