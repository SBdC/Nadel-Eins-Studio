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


let revealText = (e) => {

  let dropDown = document.querySelector(`p[data-key="${e.target.id}"]`);
  dropDown.style.display = "block";
  let firstParent = e.target.parentElement;
  let greatParent = firstParent.parentElement;
  let greatGreatParent = greatParent.parentElement;
  greatGreatParent.style.flex = "0 1 calc(100%)";
  greatGreatParent.style.order = "-1";
  let button = document.getElementById(`${e.target.id}`);
  button.style.display = "none";
  let otherButton = document.querySelector(`button[data-type="${e.target.id}"]`);
  otherButton.style.display = "block";


  greatGreatParent.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center"
  });


};

let hideText = (e) => {
  let targetService = e.target.id;
  const goUp = document.querySelector(`p[data-hide="${targetService }"]`);
  goUp.style.display = "none";
  goUp.style.transition = "all 2s";

  let otherButton = document.getElementById(`${targetService }`);
  otherButton.style.display = "none";
  let button = document.querySelector(`button[data-type="${targetService }"]`);
  button.style.display = "block";

  let firstParent = e.target.parentElement;
  let greatParent = firstParent.parentElement;
  let greatGreatParent = greatParent.parentElement;
  greatGreatParent.style.flex = "";
  greatGreatParent.style.order = "";

  let targetServiveElemnt = document.getElementById(targetService);
  let parentTargetServiveElemnt = targetServiveElemnt.parentElement;
  parentTargetServiveElemnt.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center"
  });



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
const BODY = document.getElementsByTagName("BODY")[0];



// When the user clicks on <span> (x), close the modal
SPAN.onclick = function() {
  MODAL.style.display = "none";
};


let zoomImage = (e) => {
  MODAL.style.display = "block";
  modalImg.src = e.target.src;
  captionText.innerHTML = e.target.nextElementSibling.innerHTML;
  BODY.style.overflow = "hidden";
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

[].forEach.call(items, function(item, idx) {
  if (idx > maxItems - 1) {
    item.classList.add(hiddenClass);
  }
});

loadMoreBtn.addEventListener("click", function() {

  [].forEach.call(document.querySelectorAll("." + hiddenClass), function(item, idx) {
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


loadLessBtn.addEventListener("click", function() {

  [].forEach.call(document.querySelectorAll("." + showClass), function(item, idx) {
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


//back-to-top



const backTop = document.querySelector("#back-to-top");
// Setup isScrolling variable
let isScrolling;

// Listen for scroll events
window.addEventListener("scroll", function() {

  // Clear our timeout throughout the scroll
  window.clearTimeout(isScrolling);


  if (backTop.classList.contains("btn-entrance")) {
    backTop.classList.remove("btn-entrance");
    backTop.classList.add("btn-exit");
    setTimeout(function() {
      backTop.style.display = "none";
    }, 150);

  }

  // Set a timeout to run after scrolling ends
  isScrolling = setTimeout(function() {
    if (window.pageYOffset > 400) {
      backTop.classList.remove("btn-exit");
      backTop.classList.add("btn-entrance");
      backTop.style.display = "block";
    }

  }, 66);

}, false);


backTop.addEventListener("click", backToTop);

function backToTop() {
  window.scrollTo(0, 0);
}



let today = new Date();
let year = today.getFullYear();

const COPY = document.getElementById("copyright");
COPY.innerHTML = "<p> Franz Schuette " + year + " &#x24B8; All rights reserved</p>";

const IMPRESSUM = document.getElementById("impressum");
let impressumText = document.getElementById("impressum-text");
let impressumArrow = document.getElementById("impressum-arrow");

let impressumTextContent = `<p class="impressum-text"> Nadel Eins Studio Berlin c/o Franz Schuette - Wattstrasse 24 - 13355 Berlin - Deutschland </p>
  <p>  Verantwortlich nach $ 6 Teledienstgesetz: Franz Schuette </p>
   <p> Hinweise: Nadel Eins bemueht sich auf dieser Webseite richtige und vollstaendige Informationen zur Verfuegung zu stellen,
  uebernimmt jedoch keine Haftung oder Garantie fuer die Aktualitaet, Richtigkeit und Vollstaendigkeit der auf dieser Webseite
  bereitgestellten Informationen. Dies gilt auch fuer alle Verbindungen ("Links"), auf die diese Webseite direkt oder indirekt verweist.
  Nadel Eins ist fuer den Inhalt einer Seite, die mit einem solchen Link erreicht wird, nicht verantwortlich.
  Die Redaktion uebernimmt keine Haftung fuer unverlangt eingesandte Manuskripte, Fotos, Illustrationen.
  Nadel Eins behaelt sich das Recht vor, ohne vorherige Ankuendigung Aenderungen oder Ergaenzungen der bereitgestellten Informationen vorzunehmen.
  Der Inhalt dieser Webseite ist urheberrechtlich geschuetzt. Vervielfaeltigung, Speicherung und Nachdruck nur mit ausdruecklicher,
  schriftlicher Genehmigung von Nadel Eins. Nadel Eins beachtet die datenschutzrechtlichen Bestimmungen des Bundesdatenschutzgesetzes.
  Soweit personenbezogene Daten eingegeben werden, richten sich diese selbstverstaendlich nur an Nadel Eins.
  Nadel Eins wird diese ohne die Einwilligung des Nutzers nicht an Dritte weitergeben</p>`;


function showImpressum() {

  IMPRESSUM.getAttribute("aria-expanded") == "false" ? IMPRESSUM.setAttribute("aria-expanded", true) : IMPRESSUM.setAttribute("aria-expanded", false);
  impressumText.innerHTML == impressumTextContent ? impressumText.innerHTML = "" : impressumText.innerHTML = impressumTextContent;
  impressumArrow.style.transform = (impressumArrow.style.transform == "rotate(90deg)") ? "rotate(270deg)" : "rotate(90deg)";
  window.scrollTo(0, document.body.scrollHeight) ? window.scrollTo(IMPRESSUM) : window.scrollTo(0, document.body.scrollHeight);

}

IMPRESSUM.addEventListener("click", showImpressum, false);





//svg animations




const face = document.getElementById("face");
const thunder = document.querySelector(".thunder");
const surprise = document.querySelector(".surprise");
const smile = document.querySelector(".smile");
const smileBar = document.querySelector(".smileBar");


const clouds = document.getElementById("clouds");
const drops = document.getElementById("drops");

const keys = Array.from(document.querySelectorAll(".text-key"));
const faces = Array.from(document.querySelectorAll(".faces"));
const droppings = Array.from(document.querySelectorAll(".dropping"));
const serviceSvgs = Array.from(document.querySelectorAll(".service-svg"));

const title = document.getElementById("title-page");


//thunders gets drawn

let thunderOn = () => {


  face.style.fill = "red";
  thunder.style.stroke = "black";
  thunder.classList.add("thunder-happens");
  smile.style.stroke = "transparent";
  smileBar.style.fill = "transparent";
  smileBar.style.stroke = "transparent";
  surprise.style.fill = "white";
  surprise.style.stroke = "black";
  title.style.color = "white";
  document.body.style.background = "snow";
  // city.style.background="snow";

};

let thunderOff = () => {


  face.style.fill = "yellow";
  thunder.classList.remove("thunder-happens");
  thunder.style.stroke = "transparent";
  smile.style.stroke = "black";
  smileBar.style.fill = "black";
  smileBar.style.stroke = "black";
  surprise.style.fill = "transparent";
  surprise.style.stroke = "transparent";

  document.body.style.background = "";

  title.style.color = "red";

};


// face.addEventListener("click", thunderOn, false);
// face.addEventListener("mouseout", thunderOff , false);





faces.forEach(face => face.addEventListener("mouseover", thunderOn, false));
faces.forEach(face => face.addEventListener("mouseout", thunderOff, false));




//cloud-menu


let explodeAndReveal = (e) => {

  let clickedCloud = e.target;
  let clickedCloudChild = clickedCloud.firstChild.textContent;
  let cloudLink = document.getElementById(clickedCloudChild);


  rain();



  let goLink = () => {
    cloudLink.scrollIntoView();
  };


  setTimeout(goLink, 1000);

};

keys.forEach(key => key.addEventListener("click", explodeAndReveal, false));




function rain() {

  clouds.style.stroke = "transparent";
  drops.style.stroke = "#449AFF";
  droppings.forEach(dropping => dropping.classList.add("drops-go-down"));


  keys.forEach(key => key.classList.remove("text-on-cloud"));
  keys.forEach(key => key.classList.add("text-off"));


  setTimeout(cloudySky, 5000);


}


function cloudySky() {

  clouds.style.stroke = "#449AFF";
  drops.style.stroke = "transparent";
  droppings.forEach(dropping => dropping.classList.remove("drops-go-down"));

  keys.forEach(key => key.classList.remove("text-off"));
  keys.forEach(key => key.classList.add("text-on-cloud"));


}


let svgToService = (e) => {

  let mainEl = e.target.dataset.id;

  let matchingService = document.querySelector(`article[data-svg="${mainEl}"]`);

  matchingService.style.flex = "0 1 calc(100%)";
  matchingService.style.order = "-1";

  let dropDown = document.querySelector(`p[data-text="${mainEl}"]`);
  dropDown.style.display = "block";

  let button = document.querySelector(`button[data-svgRead="${mainEl}"]`);
  button.style.display = "none";
  let otherButton = document.querySelector(`button[data-svgLess="${mainEl}"]`);
  otherButton.style.display = "block";

  matchingService.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center"
  });



};




let highlightSvg = (e) => {
  let mainEl = e.target.dataset.id;
  let svgText = document.querySelector(`text[id="${mainEl}"]`);

  let svgPaths = Array.from(document.querySelectorAll(`path[data-id="${mainEl}"]`));
  let svgEllipses = Array.from(document.querySelectorAll(`ellipse[data-id="${mainEl}"]`));
  let svgRet = Array.from(document.querySelectorAll(`ret[data-id="${mainEl}"]`));
  svgPaths.forEach(svgPath => svgPath.style.stroke = "#449AFF");
 
  svgEllipses.forEach(svgPath => svgPath.style.stroke = "#449AFF");
  svgRet.forEach(svgPath => svgPath.style.stroke = "#449AFF");
  svgText.classList.remove("text-off");
  svgText.classList.add("text-on");



};

let highlightSvgOFF = (e) => {

  let mainEl = e.target.dataset.id;
  let svgText = document.querySelector(`text[id="${mainEl}"]`);
  let svgPaths = Array.from(document.querySelectorAll(`path[data-id="${mainEl}"]`));
  let svgEllipses = Array.from(document.querySelectorAll(`ellipse[data-id="${mainEl}"]`));
  let svgRet = Array.from(document.querySelectorAll(`ret[data-id="${mainEl}"]`));
  svgPaths.forEach(svgPath => svgPath.style.stroke = "black");
  svgEllipses.forEach(svgPath => svgPath.style.stroke = "black");
  svgRet.forEach(svgPath => svgPath.style.stroke = "black");
  

  svgText.classList.add("text-off");
  svgText.classList.remove("text-on");

};


serviceSvgs.forEach(serviceSvg => serviceSvg.addEventListener("click", svgToService, false));
serviceSvgs.forEach(serviceSvg => serviceSvg.addEventListener("mouseover", highlightSvg, false));
serviceSvgs.forEach(serviceSvg => serviceSvg.addEventListener("mouseout", highlightSvgOFF, false));
