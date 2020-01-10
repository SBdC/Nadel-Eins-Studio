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
var TITLEDESK = document.getElementById("title-desk");
var TITLE = document.getElementById("title");

function revealMenu() {
  OVERLAY.classList.toggle("opaque");
  NAV.classList.toggle("menu-items");
  BURGERBLACK.classList.toggle("burger-white");
  BURGERWHITE.classList.toggle("burger-black");
  BURGERWHITE.classList.toggle("burger-white");
  TITLEDESK.classList.toggle("title-desk-light");
  TITLEDESK.classList.toggle("title-desk-dark");
  TITLE.classList.toggle("title-dark");
  TITLE.classList.toggle("title-light");
  TITLE.classList.contains("title-light") ? TITLE.style.color = "white" : TITLE.style.color = "#1b1b1c";
  MENUITEMS.classList.toggle("open");
  TRIGGER.getAttribute("aria-expanded") == "false" ? CLOSE.setAttribute("aria-expanded", true) : CLOSE.setAttribute("aria-expanded", false);
  screenReaderText.innerHTML == "Reveal menu" ? screenReaderText.innerHTML = "Hide menu" : screenReaderText.innerHTML = "Reveal menu";
}

points.forEach(function (read) {
  return read.addEventListener("click", revealMenu, false);
}); //remeber to check the focus for aria
// OVERLAY.addEventListener("click", revealMenu, false);

TRIGGER.addEventListener("click", revealMenu, false);
CLOSE.addEventListener("click", revealMenu, false); //READ MORE

var reads = Array.from(document.querySelectorAll(".readMore"));
var erases = Array.from(document.querySelectorAll(".viewLess"));
var openText = false;

var revealText = function revealText(e) {
  console.log(openText + "is open text");
  var idTarget = e.target.id;
  var dropDown = document.querySelector("div[data-key=\"".concat(idTarget, "\"]"));
  dropDown.style.display = "block";
  var button = document.getElementById("".concat(idTarget));
  button.style.display = "none";
  var otherButton = document.querySelector("button[data-type=\"".concat(idTarget, "\"]"));
  otherButton.style.display = "block";
  var firstParent = e.target.parentElement;
  var greatParent = firstParent.parentElement;
  var greatGreatParent = greatParent.parentElement; //greatGreatParent.style.flex = "0 1 calc(100%)";
  //greatGreatParent.style.order = "-1";

  greatGreatParent.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
};

var hideText = function hideText(e) {
  var targetService = e.target.id;
  var goUp = document.querySelector("div[data-hide=\"".concat(targetService, "\"]"));
  goUp.style.display = "none";
  goUp.style.transition = "all 2s";
  var otherButton = document.getElementById("".concat(targetService));
  otherButton.style.display = "none";
  var button = document.querySelector("button[data-type=\"".concat(targetService, "\"]"));
  button.style.display = "block"; //let firstParent = e.target.parentElement;
  // let greatParent = firstParent.parentElement;
  //let greatGreatParent = greatParent.parentElement;
  //greatGreatParent.style.flex = "";
  // greatGreatParent.style.order = "";

  var targetServiveElemnt = document.getElementById(targetService);
  var parentTargetServiveElemnt = targetServiveElemnt.parentElement;
  parentTargetServiveElemnt.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
};

reads.forEach(function (read) {
  return read.addEventListener("click", revealText, false);
});
erases.forEach(function (erase) {
  return erase.addEventListener("click", hideText, false);
}); //google wed development lazy load images

document.addEventListener("DOMContentLoaded", function () {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  var active = false;

  var lazyLoad = function lazyLoad() {
    if (active === false) {
      active = true;
      setTimeout(function () {
        lazyImages.forEach(function (lazyImage) {
          if (lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0 && getComputedStyle(lazyImage).display !== "none") {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");
            lazyImages = lazyImages.filter(function (image) {
              return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
              document.removeEventListener("scroll", lazyLoad);
              window.removeEventListener("resize", lazyLoad);
              window.removeEventListener("orientationchange", lazyLoad);
            }
          }
        });
        active = false;
      }, 200);
    }
  };

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
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
loadLessBtn.addEventListener("click", function (e) {
  [].forEach.call(document.querySelectorAll("." + showClass), function (item, idx) {
    if (idx < maxItems - 1) {
      item.classList.remove(showClass);
      item.classList.add(hiddenClass);
    }

    if (document.querySelectorAll("." + showClass).length === 0) {
      loadMoreBtn.style.display = "block";
      loadLessBtn.style.display = "none";
      e.target.previousElementSibling.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
    }
  });
}); //back-to-top

var backTop = document.querySelector("#back-to-top"); // Setup isScrolling variable

var isScrolling; // Listen for scroll events

window.addEventListener("scroll", function () {
  // Clear our timeout throughout the scroll
  window.clearTimeout(isScrolling);

  if (backTop.classList.contains("btn-entrance")) {
    backTop.classList.remove("btn-entrance");
    backTop.classList.add("btn-exit");
    setTimeout(function () {
      backTop.style.display = "none";
    }, 150);
  } // Set a timeout to run after scrolling ends


  isScrolling = setTimeout(function () {
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
} //copyright


var today = new Date();
var year = today.getFullYear();
var COPY = document.getElementById("copyright");
COPY.innerHTML = "<p> Franz Schuette " + year + " &#x24B8; All rights reserved</p>"; //impressum

var IMPRESSUM = document.getElementById("impressum");
var impressumText = document.getElementById("impressum-text");
var impressumArrow = document.getElementById("impressum-arrow");
var impressumTextContent = "<p class=\"impressum-text\"> Nadel Eins Studio Berlin c/o Franz Schuette - Wattstrasse 24 - 13355 Berlin - Deutschland </p>\n  <p>  Verantwortlich nach $ 6 Teledienstgesetz: Franz Schuette </p>\n   <p> Hinweise: Nadel Eins bemueht sich auf dieser Webseite richtige und vollstaendige Informationen zur Verfuegung zu stellen,\n  uebernimmt jedoch keine Haftung oder Garantie fuer die Aktualitaet, Richtigkeit und Vollstaendigkeit der auf dieser Webseite\n  bereitgestellten Informationen. Dies gilt auch fuer alle Verbindungen (\"Links\"), auf die diese Webseite direkt oder indirekt verweist.\n  Nadel Eins ist fuer den Inhalt einer Seite, die mit einem solchen Link erreicht wird, nicht verantwortlich.\n  Die Redaktion uebernimmt keine Haftung fuer unverlangt eingesandte Manuskripte, Fotos, Illustrationen.\n  Nadel Eins behaelt sich das Recht vor, ohne vorherige Ankuendigung Aenderungen oder Ergaenzungen der bereitgestellten Informationen vorzunehmen.\n  Der Inhalt dieser Webseite ist urheberrechtlich geschuetzt. Vervielfaeltigung, Speicherung und Nachdruck nur mit ausdruecklicher,\n  schriftlicher Genehmigung von Nadel Eins. Nadel Eins beachtet die datenschutzrechtlichen Bestimmungen des Bundesdatenschutzgesetzes.\n  Soweit personenbezogene Daten eingegeben werden, richten sich diese selbstverstaendlich nur an Nadel Eins.\n  Nadel Eins wird diese ohne die Einwilligung des Nutzers nicht an Dritte weitergeben</p>";

function showImpressum() {
  IMPRESSUM.getAttribute("aria-expanded") == "false" ? IMPRESSUM.setAttribute("aria-expanded", true) : IMPRESSUM.setAttribute("aria-expanded", false);
  impressumText.innerHTML == impressumTextContent ? impressumText.innerHTML = "" : impressumText.innerHTML = impressumTextContent;
  impressumArrow.style.transform = impressumArrow.style.transform == "rotate(90deg)" ? "rotate(270deg)" : "rotate(90deg)";
  window.scrollTo(0, document.body.scrollHeight) ? window.scrollTo(IMPRESSUM) : window.scrollTo(0, document.body.scrollHeight);
}

IMPRESSUM.addEventListener("click", showImpressum, false); //svg animations

var face = document.getElementById("face");
var thunder = document.querySelector(".thunder");
var surprise = document.querySelector(".surprise");
var smile = document.querySelector(".smile");
var smileBar = document.querySelector(".smileBar"); //const clouds = document.getElementById("clouds");

var cloudFill = document.querySelector(".cloud-fill");
var cloudOutline = document.querySelector(".cloud-outline");
var drops = document.getElementById("drops");
var keys = Array.from(document.querySelectorAll(".text-key"));
var faces = Array.from(document.querySelectorAll(".faces"));
var droppings = Array.from(document.querySelectorAll(".dropping"));
var serviceSvgs = Array.from(document.querySelectorAll(".service-svg")); //thunders gets drawn

var thunderOn = function thunderOn() {
  face.style.fill = "red";
  thunder.style.stroke = "black";
  thunder.classList.add("thunder-happens");
  smile.style.stroke = "transparent";
  smileBar.style.fill = "transparent";
  smileBar.style.stroke = "transparent";
  surprise.style.fill = "white";
  surprise.style.stroke = "black";
  TITLE.style.color = "red";
  document.body.style.background = "snow"; // city.style.background="snow";
};

var thunderOff = function thunderOff() {
  var black = "#1b1b1c";
  face.style.fill = "yellow";
  thunder.classList.remove("thunder-happens");
  thunder.style.stroke = "transparent";
  smile.style.stroke = black;
  smileBar.style.fill = black;
  smileBar.style.stroke = black;
  surprise.style.fill = "transparent";
  surprise.style.stroke = "transparent";
  document.body.style.background = "";
  TITLE.classList.contains("title-light") ? TITLE.style.color = "white" : TITLE.style.color = "#1b1b1c";
}; // face.addEventListener("click", thunderOn, false);


TITLE.addEventListener("mouseover", thunderOn, false);
TITLE.addEventListener("mouseout", thunderOff, false);
faces.forEach(function (face) {
  return face.addEventListener("mouseover", thunderOn, false);
});
faces.forEach(function (face) {
  return face.addEventListener("mouseout", thunderOff, false);
}); //cloud-menu

var explodeAndReveal = function explodeAndReveal(e) {
  var clickedCloud = e.target;
  var clickedCloudChild = clickedCloud.firstChild.textContent;
  var cloudLink = document.getElementById(clickedCloudChild);
  rain();

  var goLink = function goLink() {
    cloudLink.scrollIntoView();
  };

  setTimeout(goLink, 1000);
};

keys.forEach(function (key) {
  return key.addEventListener("click", explodeAndReveal, false);
});

function rain() {
  cloudFill.style.fill = "transparent";
  cloudOutline.style.stroke = "transparent";
  drops.style.fill = "rgba(165,189,216,0.7)";
  droppings.forEach(function (dropping) {
    return dropping.classList.add("drops-go-down");
  });
  keys.forEach(function (key) {
    return key.classList.remove("text-on-cloud");
  });
  keys.forEach(function (key) {
    return key.classList.add("text-off");
  });
  setTimeout(cloudySky, 5000);
}

function cloudySky() {
  cloudOutline.style.stroke = "#1b1b1c";
  cloudFill.style.fill = "rgba(165,189,216,0.7)";
  drops.style.fill = "transparent";
  droppings.forEach(function (dropping) {
    return dropping.classList.remove("drops-go-down");
  });
  keys.forEach(function (key) {
    return key.classList.remove("text-off");
  });
  keys.forEach(function (key) {
    return key.classList.add("text-on-cloud");
  });
}

var svgToService = function svgToService(e) {
  var mainEl = e.target.dataset.id;
  var matchingService = document.querySelector("article[data-svg=\"".concat(mainEl, "\"]")); //   matchingService.style.flex = "0 1 calc(100%)";
  //   matchingService.style.order = "-1";

  var dropDown = document.querySelector("div[data-text=\"".concat(mainEl, "\"]"));
  dropDown.style.display = "block";
  var button = document.querySelector("button[data-svgRead=\"".concat(mainEl, "\"]"));
  button.style.display = "none";
  var otherButton = document.querySelector("button[data-svgLess=\"".concat(mainEl, "\"]"));
  otherButton.style.display = "block";
  matchingService.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center"
  });
};

var highlightSvg = function highlightSvg(e) {
  var mainEl = e.target.dataset.id;
  var svgText = document.querySelector("text[id=\"".concat(mainEl, "\"]"));
  var svgPaths = Array.from(document.querySelectorAll("path[data-id=\"".concat(mainEl, "\"]")));
  var svgEllipses = Array.from(document.querySelectorAll("ellipse[data-id=\"".concat(mainEl, "\"]")));
  var svgRet = Array.from(document.querySelectorAll("ret[data-id=\"".concat(mainEl, "\"]")));
  svgPaths.forEach(function (svgPath) {
    return svgPath.style.stroke = "#A5BDD8";
  });
  svgEllipses.forEach(function (svgPath) {
    return svgPath.style.stroke = "#A5BDD8";
  });
  svgRet.forEach(function (svgPath) {
    return svgPath.style.stroke = "#A5BDD8";
  });
  svgText.classList.remove("text-off");
  svgText.classList.add("text-on");
};

var highlightSvgOFF = function highlightSvgOFF(e) {
  var mainEl = e.target.dataset.id;
  var svgText = document.querySelector("text[id=\"".concat(mainEl, "\"]"));
  var svgPaths = Array.from(document.querySelectorAll("path[data-id=\"".concat(mainEl, "\"]")));
  var svgEllipses = Array.from(document.querySelectorAll("ellipse[data-id=\"".concat(mainEl, "\"]")));
  var svgRet = Array.from(document.querySelectorAll("ret[data-id=\"".concat(mainEl, "\"]")));
  svgPaths.forEach(function (svgPath) {
    return svgPath.style.stroke = "black";
  });
  svgEllipses.forEach(function (svgPath) {
    return svgPath.style.stroke = "black";
  });
  svgRet.forEach(function (svgPath) {
    return svgPath.style.stroke = "black";
  });
  svgText.classList.add("text-off");
  svgText.classList.remove("text-on");
};

serviceSvgs.forEach(function (serviceSvg) {
  return serviceSvg.addEventListener("click", svgToService, false);
});
serviceSvgs.forEach(function (serviceSvg) {
  return serviceSvg.addEventListener("mouseover", highlightSvg, false);
});
serviceSvgs.forEach(function (serviceSvg) {
  return serviceSvg.addEventListener("mouseout", highlightSvgOFF, false);
}); //Modal for zooming images
// Get the <span> element that closes the modal
// const MODAL = document.getElementById("myModal");
// const SPAN = document.getElementsByClassName("close")[0];
// let imgs = Array.from(document.querySelectorAll(".zoom"));
// const BODY = document.getElementsByTagName("BODY")[0];
// When the user clicks on <span> (x), close the modal
// SPAN.onclick = function() {
//     let modalImg = document.getElementById("img01");
//     let captionText = document.getElementById("caption-modal");
//     MODAL.removeChild(modalImg);
//     MODAL.removeChild(captionText);
//     MODAL.style.display = "none";
// };
// let zoomImage = (e) => {
//     MODAL.style.display = "block";
//     let src = e.target.dataset.id;
//     let img = document.createElement("img");
//     let div = document.createElement("div");
//     MODAL.appendChild(img);
//     MODAL.appendChild(div);
//     img.setAttribute("src", src);
//     img.setAttribute("class", "modal-content");
//     img.setAttribute("id", "img01");
//     div.setAttribute("id", "caption-modal");
//     div.innerHTML = e.target.nextElementSibling.innerHTML;
//     BODY.style.overflow = "hidden";
// };
// imgs.forEach(img => img.addEventListener("click", zoomImage, false));
// const contactCloud = document.getElementById("cloud-desktop-contact");
// // Listen for scroll events
// window.addEventListener("scroll", function() {
//     // Set a timeout to run after scrolling ends
//     isScrolling = setTimeout(function() {
//         if (window.pageYOffset > 20) {
//             contactCloud.classList.remove("cloud-moves-5");
//            contactCloud.style.position="fixed";
//            contactCloud.style.width="250px";
//             }
//             else{
//                  title.classList.add("cloud-moves-5");
//             contactCloud.style.position="relative";
//             }
//     }, 66);
// }, false);