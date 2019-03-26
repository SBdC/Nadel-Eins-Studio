

const OVERLAY = document.getElementById('overlay');
const TRIGGER = document.querySelector('.trigger');
const CLOSE = document.querySelector('.burger');
const BURGERBLACK= document.querySelector('.burger-black');
const BURGERWHITE= document.querySelector('.burger-white');
const NAV= document.querySelector('.navigation');
const MENUITEMS = document.querySelector('.menu-items');
let screenReaderText = document.querySelector('.trigger .screen-reader-text');




function revealMenu() {
 
	OVERLAY.classList.toggle('opaque');
    NAV.classList.toggle('menu-items');
    BURGERBLACK.classList.toggle('burger-white');
    BURGERWHITE.classList.toggle('burger-black');
    BURGERWHITE.classList.toggle('burger-white');
    MENUITEMS.classList.toggle('open');
    TRIGGER.getAttribute('aria-expanded') == 'false' ? CLOSE.setAttribute('aria-expanded', true) : CLOSE.setAttribute('aria-expanded', false);
    screenReaderText.innerHTML == 'Reveal menu' ? screenReaderText.innerHTML = 'Hide menu' : screenReaderText.innerHTML = 'Reveal menu';
   

}


//remeber to check the focus for aria
OVERLAY.addEventListener('click', revealMenu, false);
TRIGGER.addEventListener('click', revealMenu, false);
CLOSE.addEventListener('click', revealMenu, false);
