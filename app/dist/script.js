"use strict";

//NAVIGATION
var OVERLAY = document.getElementById("overlay");
var TRIGGER = document.querySelector(".trigger");
var CLOSE = document.querySelector(".burger");
var BURGERBLACK = document.querySelector(".burger-black");
var BURGERWHITE = document.querySelector(".burger-white");
var NAV = document.querySelector(".navigation");
var MENUITEMS = document.querySelector(".menu-items");
var screenReaderText = document.querySelector(".trigger .screen-reader-text");
var points = Array.from(document.querySelectorAll(".nav-list"));
var imgs = Array.from(document.querySelectorAll(".zoom"));

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

points.forEach(function (read) {
  return read.addEventListener("click", revealMenu, false);
}); //remeber to check the focus for aria

OVERLAY.addEventListener("click", revealMenu, false);
TRIGGER.addEventListener("click", revealMenu, false);
CLOSE.addEventListener("click", revealMenu, false); //READ MORE

var reads = Array.from(document.querySelectorAll(".readMore"));
var erases = Array.from(document.querySelectorAll(".viewLess"));

var revealText = function revealText(e) {
  var dropDown = document.querySelector("p[data-key=\"".concat(e.target.id, "\"]"));
  dropDown.style.display = "block";
  var button = document.getElementById("".concat(e.target.id));
  button.style.display = "none";
  var otherButton = document.querySelector("button[data-type=\"".concat(e.target.id, "\"]"));
  otherButton.style.display = "block"; // otherButton.style.margin = "0 auto";
};

var hideText = function hideText(e) {
  var goUp = document.querySelector("p[data-hide=\"".concat(e.target.id, "\"]"));
  goUp.style.display = "none";
  goUp.style.transition = "all 2s";
  var otherButton = document.getElementById("".concat(e.target.id));
  otherButton.style.display = "none";
  var button = document.querySelector("button[data-type=\"".concat(e.target.id, "\"]"));
  button.style.display = "block";
};

reads.forEach(function (read) {
  return read.addEventListener("click", revealText, false);
});
erases.forEach(function (erase) {
  return erase.addEventListener("click", hideText, false);
}); //slider

var slideIndex = 1;
showSlides(slideIndex);
var SLIDESHOW = document.getElementById("slideshow");
var dots = Array.from(document.querySelectorAll(".dots"));
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var captions = Array.from(document.querySelectorAll(".img-text"));

function revealCaption() {
  captions.forEach(function (caption) {
    return caption.classList.add("img-text-reveal");
  });
  captions.forEach(function (caption) {
    return caption.classList.remove("img-text");
  });
}

function hideCaption() {
  captions.forEach(function (caption) {
    return caption.classList.remove("img-text-reveal");
  });
  captions.forEach(function (caption) {
    return caption.classList.add("img-text");
  });
}

SLIDESHOW.addEventListener("mouseout", hideCaption, false);
SLIDESHOW.addEventListener("mouseover", revealCaption, false); // Next/previous controls

function plusSlides() {
  showSlides(slideIndex += 1);
}

function minusSlides() {
  showSlides(slideIndex -= 1);
} // buttons image controls


function currentSlide(n) {
  showSlides(slideIndex = "".concat(n.target.dataset.id));
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
dots.forEach(function (dot) {
  return dot.addEventListener("click", currentSlide, false);
}); //Modal for zooming images
// Get the <span> element that closes the modal

var MODAL = document.getElementById("myModal");
var SPAN = document.getElementsByClassName("close")[0];
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption-modal"); // When the user clicks on <span> (x), close the modal

SPAN.onclick = function () {
  MODAL.style.display = "none";
};

var zoomImage = function zoomImage(e) {
  MODAL.style.display = "block";
  modalImg.src = e.target.src;
  captionText.innerHTML = e.target.nextElementSibling.innerHTML;
};

imgs.forEach(function (img) {
  return img.addEventListener("click", zoomImage, false);
}); //load more music albums

var parent = document.querySelector("ul"),
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