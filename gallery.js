let isPopupOpen = false; // True when the imgPopup is open

function populateGallery() {
    let container = document.getElementById('img-gallery-container');
    let str = '';
    for(let i = 0; i < imgArr.length; i++) {
      str += `<img id="${i}" class="photo" src="${imgArr[i].src}"/>`;
        // str += '<img id="' + i.toString() + '"" class="photo" src="' + imgArr[i].src + '" />';
        // let img = document.createElement('img');
        // img.src = imgArr[i].src;
        // img.id = i.toString();
        // img.width = "300";
        // img.style.border = "5px solid white";
        // container.appendChild(img);
    }
    container.innerHTML = str;
}

// let isImageClick = false;

function imgPopup(ind) {
    // document.getElementById('overlay').style.display = 'flex';
    fadeIn(document.getElementById('overlay'));
    let popupCont = document.getElementById('img-popup-container');
    let popupImg = document.getElementById('img-popup-element');
    popupImg.className = 'img-popup-element img-fadeIn';
    let popupTxt = document.getElementById('text-popup-element');
    if (popupImg.childNodes.length) {
      popupImg.removeChild(popupImg.childNodes[0]);
    }
    if (popupTxt.childNodes.length) {
      popupTxt.removeChild(popupTxt.childNodes[0]);
    }

    let img = document.createElement('img');
    img.src = imgArr[ind].src;
    if(img.height >= img.width) {
        img.height = window.innerHeight * .75;
    } else if(img.height < img.width) {
        img.width = window.innerWidth * .60;
    }
    let textHeight = 20;
    popupImg.appendChild(img);
    let description = document.createTextNode(imgArr[ind].desc);
    popupTxt.appendChild(description);
    fadeIn(document.getElementById('overlay'));
    isPopupOpen = true;
}

document.addEventListener('click', function(event) {
  const eventTarget = event.target;
  // Note: Can extend this to check many class name or id's in a switch
  if (eventTarget.className === 'photo') {
    imgPopup(event.target.id);
  } else {
    const specifiedElement = document.getElementById('img-popup-container');
    if (!specifiedElement) return;
    const isClickInside = specifiedElement.contains(eventTarget);
    if (!isClickInside && isPopupOpen) {
      isPopupOpen = false;
      fadeOut(document.getElementById('overlay'));
    }
  }
});

// function fadeIn(el) {
//   el.style.opacity = 0;

//   var last = +new Date();
//   var tick = function() {
//     el.style.opacity = +el.style.opacity + (new Date() - last) / 600;
//     last = +new Date();

//     if (+el.style.opacity < 1) {
//       (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
//     }
//   };

//   tick();
// }

//Should I just use the function from map.js? Need to load that js file onto page? Which is more efficient?
function fadeIn(el){
  el.style.opacity = 0;
  el.style.display = 'flex';

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += 0.05) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= 0.05) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

// TODO: move to external file
let imgArr = [{src: "GalleryPhotos/20170115_103925.jpg", desc: "Donner Lake, Truckee, CA"}, {src: "GalleryPhotos/cottowood.jpg", desc: "White Sands National Park, NM" }, {src: "GalleryPhotos/DSC07725.jpg", desc: "White Sands National Park, NM"}, {src: "GalleryPhotos/DSC07899.jpg", desc: "Vancouver, Canada" }, {src: "GalleryPhotos/DSC07947.jpg", desc: "Vancouver, Canada"}, {src: "GalleryPhotos/DSC07949.jpg", desc: "Vancouver, Canada"}, {src: "GalleryPhotos/DSC08027.jpg", desc: "Squamish, Canada"}, {src: "GalleryPhotos/HalfDome.jpg", desc: "Yosemite, CA"}, {src: "GalleryPhotos/HiddenLake.jpg", desc: "Glacier National Park, MT"}, {src: "GalleryPhotos/Hieropolis.jpg", desc: "Hieropolis, Turkey"}, {src: "GalleryPhotos/HalfDome2.jpg", desc: "Yosemite, CA"}, {src: "GalleryPhotos/Waterfall.jpg", desc: "Crater Lake, OR"}];
