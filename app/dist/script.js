//NAVIGATION
const OVERLAY = document.getElementById("overlay");
const TRIGGER = document.querySelector(".trigger");
const CLOSE = document.querySelector(".burger");
const BURGERBLACK = document.querySelector(".burger-black");
const BURGERWHITE = document.querySelector(".burger-white");
const NAV = document.querySelector(".navigation");
const MENUITEMS = document.querySelector(".menu-items");
let screenReaderText = document.querySelector(".trigger .screen-reader-text");
let points = Array.from(document.querySelectorAll(".nav-list"));
let imgs = Array.from(document.querySelectorAll(".zoom"));

function revealMenu() {
    OVERLAY.classList.toggle("opaque");
    NAV.classList.toggle("menu-items");
    BURGERBLACK.classList.toggle("burger-white");
    BURGERWHITE.classList.toggle("burger-black");
    BURGERWHITE.classList.toggle("burger-white");
    MENUITEMS.classList.toggle("open");
    TRIGGER.getAttribute("aria-expanded") == "false" ? CLOSE.setAttribute("aria-expanded", true) : CLOSE.setAttribute("aria-expanded", false);
    screenReaderText.innerHTML == "Reveal menu" ? screenReaderText.innerHTML = "Hide menu" : screenReaderText.innerHTML = "Reveal menu";
}

points.forEach(read => read.addEventListener("click", revealMenu, false));
//remeber to check the focus for aria
OVERLAY.addEventListener("click", revealMenu, false);
TRIGGER.addEventListener("click", revealMenu, false);
CLOSE.addEventListener("click", revealMenu, false);

//READ MORE


let reads = Array.from(document.querySelectorAll(".readMore"));
let erases = Array.from(document.querySelectorAll(".viewLess"));

let revealText = e => {

    let dropDown = document.querySelector(`p[data-key="${e.target.id}"]`);
    dropDown.style.display = "block";
    let button = document.getElementById(`${e.target.id}`);
    button.style.display = "none";
    let otherButton = document.querySelector(`button[data-type="${e.target.id}"]`);
    otherButton.style.display = "block";
    // otherButton.style.margin = "0 auto";
};

let hideText = e => {

    const goUp = document.querySelector(`p[data-hide="${e.target.id}"]`);
    goUp.style.display = "none";
    goUp.style.transition = "all 2s";
    let otherButton = document.getElementById(`${e.target.id}`);
    otherButton.style.display = "none";
    let button = document.querySelector(`button[data-type="${e.target.id}"]`);
    button.style.display = "block";
};

reads.forEach(read => read.addEventListener("click", revealText, false));
erases.forEach(erase => erase.addEventListener("click", hideText, false));

//slider

let slideIndex = 1;
showSlides(slideIndex);
const SLIDESHOW = document.getElementById("slideshow");

let dots = Array.from(document.querySelectorAll(".dots"));
let prev = document.getElementById("prev");
let next = document.getElementById("next");

let captions = Array.from(document.querySelectorAll(".img-text"));

function revealCaption() {

    captions.forEach(caption => caption.classList.add("img-text-reveal"));
    captions.forEach(caption => caption.classList.remove("img-text"));
}

function hideCaption() {

    captions.forEach(caption => caption.classList.remove("img-text-reveal"));
    captions.forEach(caption => caption.classList.add("img-text"));
}

SLIDESHOW.addEventListener("mouseout", hideCaption, false);
SLIDESHOW.addEventListener("mouseover", revealCaption, false);

// Next/previous controls
function plusSlides() {
    showSlides(slideIndex += 1);
}
function minusSlides() {
    showSlides(slideIndex -= 1);
}

// buttons image controls

function currentSlide(n) {

    showSlides(slideIndex = `${n.target.dataset.id}`);
}

function showSlides(n) {

    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dots");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

prev.addEventListener("click", minusSlides, false);
next.addEventListener("click", plusSlides, false);
dots.forEach(dot => dot.addEventListener("click", currentSlide, false));

//Modal for zooming images
// Get the <span> element that closes the modal
const MODAL = document.getElementById("myModal");
const SPAN = document.getElementsByClassName("close")[0];
let modalImg = document.getElementById("img01");
let captionText = document.getElementById("caption-modal");

// When the user clicks on <span> (x), close the modal
SPAN.onclick = function () {
    MODAL.style.display = "none";
};

let zoomImage = e => {
    MODAL.style.display = "block";
    modalImg.src = e.target.src;
    captionText.innerHTML = e.target.nextElementSibling.innerHTML;
};
imgs.forEach(img => img.addEventListener("click", zoomImage, false));

//load more music albums

let parent = document.querySelector("ul"),
    items = parent.querySelectorAll("li"),
    loadMoreBtn = document.querySelector("#loadMore"),
    loadLessBtn = document.querySelector("#loadless"),
    maxItems = 10,
    hiddenClass = "visually-hidden",
    showClass = "visually";

[].forEach.call(items, function (item, idx) {
    if (idx > maxItems - 1) {
        item.classList.add(hiddenClass);
    }
});

loadMoreBtn.addEventListener("click", function () {

    [].forEach.call(document.querySelectorAll("." + hiddenClass), function (item, idx) {
        console.log(item);
        if (idx < maxItems - 1) {
            item.classList.remove(hiddenClass);
            item.classList.add(showClass);
        }

        if (document.querySelectorAll("." + hiddenClass).length === 0) {
            loadMoreBtn.style.display = "none";
            loadLessBtn.style.display = "block";
        }
    });
});

loadLessBtn.addEventListener("click", function () {

    [].forEach.call(document.querySelectorAll("." + showClass), function (item, idx) {
        console.log(item);
        if (idx < maxItems - 1) {
            item.classList.remove(showClass);
            item.classList.add(hiddenClass);
        }

        if (document.querySelectorAll("." + showClass).length === 0) {
            loadMoreBtn.style.display = "block";
            loadLessBtn.style.display = "none";
        }
    });
});