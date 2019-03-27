
//NAVIGATION
const OVERLAY = document.getElementById('overlay');
const TRIGGER = document.querySelector('.trigger');
const CLOSE = document.querySelector('.burger');
const BURGERBLACK= document.querySelector('.burger-black');
const BURGERWHITE= document.querySelector('.burger-white');
const NAV= document.querySelector('.navigation');
const MENUITEMS = document.querySelector('.menu-items');
let screenReaderText = document.querySelector('.trigger .screen-reader-text');
let points = Array.from(document.getElementsByTagName('li'));


function revealMenu(e) {
 
	OVERLAY.classList.toggle('opaque');
    NAV.classList.toggle('menu-items');
    BURGERBLACK.classList.toggle('burger-white');
    BURGERWHITE.classList.toggle('burger-black');
    BURGERWHITE.classList.toggle('burger-white');
    MENUITEMS.classList.toggle('open');
    TRIGGER.getAttribute('aria-expanded') == 'false' ? CLOSE.setAttribute('aria-expanded', true) : CLOSE.setAttribute('aria-expanded', false);
    screenReaderText.innerHTML == 'Reveal menu' ? screenReaderText.innerHTML = 'Hide menu' : screenReaderText.innerHTML = 'Reveal menu';
   

}

points.forEach(read => read.addEventListener('click', revealMenu, false));
//remeber to check the focus for aria
OVERLAY.addEventListener('click', revealMenu, false);
TRIGGER.addEventListener('click', revealMenu, false);
CLOSE.addEventListener('click', revealMenu, false);



//READ MORE


let reads = Array.from(document.querySelectorAll('.readMore'));
let erases = Array.from(document.querySelectorAll('.viewLess'));


let revealText = (e) =>  {
 
  let dropDown = document.querySelector(`p[data-key="${e.target.id}"]`);
  dropDown.style.display ="block";
  let button= document.getElementById(`${e.target.id}`);
  button.style.display="none";
  let otherButton = document.querySelector(`button[data-type="${e.target.id}"]`);
  otherButton.style.display="inline-block";
}

let hideText = (e) =>  {
 
  console.log(e.target.id);
  const goUp = document.querySelector(`p[data-hide="${e.target.id}"]`);
  goUp.style.display ="none";
  goUp.style.transition ="all 2s";
  let otherButton = document.getElementById(`${e.target.id}`);
  otherButton.style.display="none";
  let button = document.querySelector(`button[data-type="${e.target.id}"]`);
  button.style.display="inline-block";

}



reads.forEach(read => read.addEventListener('click', revealText, false));

erases.forEach(erase => erase.addEventListener('click', hideText, false));



//slider

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}