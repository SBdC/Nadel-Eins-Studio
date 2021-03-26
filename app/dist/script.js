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
  console.log("heyho");
  var idTarget = e.target.id;
  var dropDown = document.querySelector("div[data-key=\"".concat(idTarget, "\"]"));
  dropDown.style.display = "block";
  var button = document.getElementById("".concat(idTarget));
  button.style.display = "none";
  var otherButton = document.querySelector("button[data-type=\"".concat(idTarget, "\"]"));
  otherButton.style.display = "block";
  var firstParent = e.target.parentElement;
  var greatParent = firstParent.parentElement;
  var greatGreatParent = greatParent.parentElement;
  greatGreatParent.style.flex = "0 1 calc(100%)";
  greatGreatParent.style.order = "-1";
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
  button.style.display = "block";
  var firstParent = e.target.parentElement;
  var greatParent = firstParent.parentElement;
  var greatGreatParent = greatParent.parentElement;
  greatGreatParent.style.flex = "";
  greatGreatParent.style.order = "";
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
  var matchingService = document.querySelector("article[data-svg=\"".concat(mainEl, "\"]"));
  matchingService.style.flex = "0 1 calc(100%)";
  matchingService.style.order = "-1";
  var dropDown = document.querySelector("div[data-text=\"".concat(mainEl, "\"]"));
  dropDown.style.display = "block";
  var button = document.querySelector("button[data-svgRead=\"".concat(mainEl, "\"]"));
  button.style.display = "none";
  var otherButton = document.querySelector("button[data-svgLess=\"".concat(mainEl, "\"]"));
  otherButton.style.display = "block";
  matchingService.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "center"
  });
};

var colorStroke = "#798c81";

var highlightSvg = function highlightSvg(e) {
  var mainEl = e.target.dataset.id;
  var svgText = document.querySelector("text[id=\"".concat(mainEl, "\"]"));
  var svgPaths = Array.from(document.querySelectorAll("path[data-id=\"".concat(mainEl, "\"]")));
  var svgEllipses = Array.from(document.querySelectorAll("ellipse[data-id=\"".concat(mainEl, "\"]")));
  var svgRet = Array.from(document.querySelectorAll("ret[data-id=\"".concat(mainEl, "\"]")));
  svgPaths.forEach(function (svgPath) {
    return svgPath.style.stroke = colorStroke;
  });
  svgEllipses.forEach(function (svgPath) {
    return svgPath.style.stroke = colorStroke;
  });
  svgRet.forEach(function (svgPath) {
    return svgPath.style.stroke = colorStroke;
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

var albums = [{
  name: "Jemek Jemowit",
  albumName: "wróg publiczny no. 1",
  source: "https://bandcamp.com/EmbeddedPlayer/album=3621352702/size=large/bgcol=ffffff/",
  service: "Recording / Mixing / Mastering",
  hidden: true,
  order: 1
}, {
  name: "Mittekill",
  albumName: "Leaving the Wor_d ",
  source: "https://bandcamp.com/EmbeddedPlayer/album=519492224/size=large/bgcol=ffffff/",
  service: "Mastering",
  hidden: false,
  order: 4
}, {
  name: "Matias Aguayo &amp; Desdemonas",
  albumName: "Sofarnopolis",
  source: "https://bandcamp.com/EmbeddedPlayer/album=1066105529/size=large/bgcol=ffffff/",
  service: "recording",
  hidden: false,
  order: 27
}, {
  name: "Mononoke",
  albumName: "Pech+Schwefel",
  source: "https://bandcamp.com/EmbeddedPlayer/track=1495086853/size=large/bgcol=ffffff/",
  service: "Mastering",
  hidden: false,
  order: 12
}, {
  name: "Best Of Both Worlds",
  albumName: "Sandilé",
  source: "https://bandcamp.com/EmbeddedPlayer/album=2954250729/size=large/bgcol=ffffff/",
  service: "Mastering",
  hidden: false,
  order: 3
}, {
  name: "Farr",
  albumName: "Convoluted ",
  source: "https://bandcamp.com/EmbeddedPlayer/album=3725643485/size=large/bgcol=ffffff/",
  service: "Mixing",
  hidden: false,
  order: 9
}, {
  name: "Gateway",
  albumName: "Michal Wolski",
  source: "https://bandcamp.com/EmbeddedPlayer/album=968543870/size=large/bgcol=ffffff/",
  service: "Mastering",
  hidden: false,
  order: 6
}, {
  name: "Specific Objects",
  albumName: "Twice Infinity EP ",
  source: "https://bandcamp.com/EmbeddedPlayer/album=26754830/size=large/bgcol=ffffff/",
  service: "Mastering",
  hidden: false,
  order: 7
}, {
  name: "Rosa Rendl",
  albumName: "Opportunity Lover",
  source: "https://bandcamp.com/EmbeddedPlayer/album=1288873486/size=large/bgcol=ffffff/",
  service: "Recording / Mixing (Partly)",
  hidden: false,
  order: 5
}, {
  name: "NOHE NOSHE",
  albumName: "Rescue",
  source: "https://bandcamp.com/EmbeddedPlayer/track=1729605102/size=large/bgcol=ffffff/",
  service: "Recording",
  hidden: false,
  order: 9
}, {
  name: "Jemek Jemowit",
  albumName: "Tekkno Polo (2020 remastered Version)",
  source: "https://bandcamp.com/EmbeddedPlayer/album=667803919/size=large/bgcol=ffffff/",
  service: "Mixing / Mastering",
  hidden: false,
  order: 8
}, {
  name: "Philipp Gorbachev &amp; The Naked Man",
  albumName: "I Don't Give A Snare ",
  source: "https://bandcamp.com/EmbeddedPlayer/album=952157788/size=large/bgcol=ffffff/",
  service: "Recording",
  hidden: false,
  order: 26
}, {
  name: "Jemek Jemowit",
  albumName: "Das Satanische Album",
  source: "https://bandcamp.com/EmbeddedPlayer/album=886540149/size=large/bgcol=ffffff/",
  service: "Mixing / Mastering",
  hidden: false,
  order: 16
}, {
  name: "Thieves like us",
  albumName: "Thieves like us",
  source: "https://bandcamp.com/EmbeddedPlayer/album=3325742885/size=large/bgcol=ffffff/",
  service: "Mixing / Mastering",
  hidden: false,
  order: 28
}, {
  name: "Marie Davidson",
  albumName: "Chasing the light",
  source: "https://bandcamp.com/EmbeddedPlayer/album=2501281015/size=large/bgcol=ffffff/",
  service: "Recording",
  hidden: false,
  order: 13
}, {
  name: "Jaakko Eino Kalevi",
  albumName: "Out of Touch",
  source: "https://bandcamp.com/EmbeddedPlayer/album=2035736336/size=large/bgcol=ffffff/",
  service: "Recording",
  hidden: false,
  order: 29
}, {
  name: "Jeans Team",
  albumName: "Baby VHS Soundtracks",
  source: "https://bandcamp.com/EmbeddedPlayer/album=4109086013/size=large/bgcol=ffffff/",
  service: "Recording / Mixing / Mastering",
  hidden: false,
  order: 19
}, {
  name: "Eric Fetcher",
  albumName: "Extension",
  source: "https://bandcamp.com/EmbeddedPlayer/album=4005746737/size=large/bgcol=ffffff/",
  service: "Mastering",
  hidden: false,
  order: 20
}, {
  name: "Nohe Noshe",
  albumName: "Where are you",
  source: "https://bandcamp.com/EmbeddedPlayer/track=2807766807/size=large/bgcol=ffffff/",
  service: "Recording",
  hidden: false,
  order: 1
}, {
  name: "Nancea",
  albumName: "Comfort",
  source: "https://bandcamp.com/EmbeddedPlayer/album=1567242607/size=large/bgcol=ffffff/",
  service: "Recording",
  hidden: false,
  order: 21
}, {
  name: "Essaie Pas",
  albumName: "New Path (The Remixes)",
  source: "https://bandcamp.com/EmbeddedPlayer/album=2068900144/size=large/bgcol=ffffff/",
  service: "Mixing",
  hidden: false,
  order: 22
}, {
  name: "Jeans Team",
  albumName: "Kings of Dings",
  source: "https://bandcamp.com/EmbeddedPlayer/album=4011681791/size=large/bgcol=ffffff/",
  service: "Recording",
  hidden: false,
  order: 18
}, {
  name: "Jeans Team",
  albumName: "HADDU BOMBERJÄECKCHEN NAMOSH REMIX",
  source: "https://bandcamp.com/EmbeddedPlayer/track=2488020357/size=large/bgcol=ffffff/",
  service: "Recording",
  hidden: false,
  order: 23
}, {
  name: "Jeans Team",
  albumName: "Keine Melodien",
  source: "https://bandcamp.com/EmbeddedPlayer/album=436594029/size=large/bgcol=ffffff/",
  service: "Recording, Mixing and Mastering",
  hidden: false,
  order: 24
}, {
  name: "Jeans Team",
  albumName: "Ding Dong",
  source: "https://bandcamp.com/EmbeddedPlayer/album=799794558/size=large/bgcol=ffffff/",
  service: "Recording, Mixing and Mastering",
  hidden: false,
  order: 1
}, {
  name: "Jemek Jemowit",
  albumName: "Jemek Jemowit is Doktor Dres",
  source: "https://bandcamp.com/EmbeddedPlayer/album=3395150044/size=large/bgcol=ffffff/",
  service: "Recording",
  hidden: false,
  order: 30
}, {
  name: "Johnny Batard",
  albumName: "What Do You Want Me To Say? ",
  source: "https://bandcamp.com/EmbeddedPlayer/album=2674310104/size=large/bgcol=ffffff/",
  service: "Recording",
  hidden: false,
  order: 25
}, {
  name: "Aemong",
  albumName: "1000",
  source: "https://bandcamp.com/EmbeddedPlayer/album=773116255/size=large/bgcol=ffffff/",
  service: "Mastering",
  hidden: false,
  order: 21
}, {
  name: "Yula Kasp",
  albumName: "Ocean Blues",
  source: "https://bandcamp.com/EmbeddedPlayer/album=3717284526/size=large/bgcol=ffffff/",
  service: "Mixing",
  hidden: false,
  order: 22
}, {
  name: "Marie Davidson &amp; Lamusa II",
  albumName: "La Ecstase",
  source: "https://bandcamp.com/EmbeddedPlayer/album=10704035/size=large/bgcol=ffffff/",
  service: "Mixing",
  hidden: false,
  order: 17
}];
var featuredItems = 12,
    albumsTotalNumber = albums.length;

function listenSection() {
  var ul = document.querySelector(".cards");
  var fragment = document.createDocumentFragment();

  for (var album in albums) {
    var li = document.createElement("li");
    li.className = "card";
    var order = "".concat(albums[album].order); //const hidden = `${albums[album].hidden}`;
    //alert(albums.length);

    if (order > featuredItems) {
      li.className = "card visually-hidden";
    } //if (hidden === "true" ) { li.className = "card visually-hidden"; }


    var div = document.createElement("div");
    div.className = "music-info";
    var p = document.createElement("p");
    var p2 = document.createElement("p");
    var p3 = document.createElement("p");
    p.innerHTML = "".concat(albums[album].name);
    p2.innerHTML = "".concat(albums[album].albumName);
    p3.innerHTML = "".concat(albums[album].service);
    var player = document.createElement("div");
    player.className = "player-wrapper";
    var iframe = document.createElement("iframe");
    iframe.className = "musicPlayer";
    iframe.setAttribute("title", "".concat(albums[album].name));
    iframe.setAttribute("alt", "Please accept cookies to be able to listen ".concat(albums[album].name));
    iframe.setAttribute("data-cookiescript", "accepted");
    iframe.setAttribute("data-src", "".concat(albums[album].source));
    fragment.appendChild(li);
    li.style.order = "".concat(albums[album].order);
    li.appendChild(div);
    div.appendChild(p);
    div.appendChild(p2);
    div.appendChild(p3);
    li.appendChild(player);
    player.appendChild(iframe);
  }

  ul.appendChild(fragment);
}

listenSection(); //load more music albums
// let parent = document.querySelector("ul"),
//   items = parent.querySelectorAll("li"),

var loadMoreBtn = document.querySelector("#loadMore"),
    loadLessBtn = document.querySelector("#loadless"),
    restOfAlbuns = albumsTotalNumber - featuredItems,
    hiddenClass = "visually-hidden",
    showClass = "visually"; // [].forEach.call(items, function(item, idx) {
//   if (idx > maxItems - 1) {
//     console.log(maxItems);
//     console.log("hellloooo");
//     item.classList.add(hiddenClass);
//   }
// });

loadMoreBtn.addEventListener("click", function () {
  [].forEach.call(document.querySelectorAll("." + hiddenClass), function (item, idx) {
    if (idx < restOfAlbuns - 1) {
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
    if (idx < restOfAlbuns - 1) {
      item.classList.remove(showClass);
      item.classList.add(hiddenClass);
    }

    if (document.querySelectorAll("." + showClass).length === 0) {
      loadMoreBtn.style.display = "block";
      loadLessBtn.style.display = "none";
      e.target.previousElementSibling.scrollIntoView({
        behavior: "smooth",
        block: "top",
        inline: "center"
      });
    }
  });
});