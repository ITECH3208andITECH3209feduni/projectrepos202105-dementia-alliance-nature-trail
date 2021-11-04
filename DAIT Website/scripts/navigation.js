menuOnclickEventHandler = (x) => {
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("nav_links").scroll({top:0});
}

function keyDownMenuOnclickEventHandler(e) {
    if (e.key === "Enter") {
        menuOnclickEventHandler();
    }
}