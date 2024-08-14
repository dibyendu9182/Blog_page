//media queries menu opton
let menuButton = document.querySelector(".menu-icon");
let crossIcon = document.querySelector("#cross"); // Directly target the cross icon
let menu = document.querySelector(".hidden-icon"); // The menu is the parent of the cross icon

menuButton.addEventListener('click', function() {
    menu.classList.add("class1");
    menu.classList.remove("hidden-icon");
});

crossIcon.addEventListener('click', function() {
    menu.classList.add("hidden-icon");
    menu.classList.remove("class1");
});

