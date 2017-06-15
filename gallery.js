let isPopupOpen = false; // True when the imgPopup is open
let currentInd;
let isKeyPress = false; // True when imgPopup is called using arrow keys

function populateGallery() {
    let container = document.getElementById('img-gallery-container');
    let str = '';
    for(let i = 0; i < imgArr.length; i++) {
      str += `<img id="${i}" class="photo" src="${imgArr[i].src}"/>`;
    }
    container.innerHTML = str;
}

function imgPopup(ind) {
    // document.getElementById('overlay').style.display = 'flex';
    currentInd = parseInt(ind);
    // fadeIn(document.getElementById('overlay'));
    let popupCont = document.getElementById('img-popup-container');
    let popupImg = document.getElementById('img-popup-element');
    // popupImg.className = 'img-popup-element img-fadeIn';
    let popupTxt = document.getElementById('text-popup-element');
    // if (popupImg.childNodes.length) {
    //   popupImg.removeChild(popupImg.childNodes[0]);
    // }
    // if (popupTxt.childNodes.length) {
    //   popupTxt.removeChild(popupTxt.childNodes[0]);
    // }

    // let img = document.createElement('img');

    //TODO: Allow for scrolling if img is too big for window.
    let img = document.getElementById('img-popup')
    if (img.src) {
        img.style.width = "auto";
        img.style.height = "auto";
    }
    let parent = new Image;
    parent.src = imgArr[ind].src;
    img.src = imgArr[ind].src;
    if(parent.height >= parent.width) {
        img.style.height = window.innerHeight * 0.75 + "px";
    } else if(parent.height < parent.width) {
        img.style.width = window.innerWidth * 0.60 + "px";
    }
    let textHeight = 20;
    // popupImg.appendChild(img);
    document.getElementById("text-popup-element").textContent = imgArr[ind].desc;
    // popupTxt.nodeValue(imgArr[ind].desc);
    // let description = document.createTextNode(imgArr[ind].desc);
    // popupTxt.appendChild(description);
    addArrows();
    if(isKeyPress){
        document.getElementById('overlay').style.display= 'flex';
        isKeyPress = false;
    } else {
        fadeIn(document.getElementById('overlay'));
    }
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
      removeArrows();
      currentInd = -1;
      // document.getElementById('overlay').style.display = 'none';
      fadeOut(document.getElementById('overlay'));
    }
  }
});

window.onkeydown = function(event) {
    if (event.keyCode === 27) {
        if(isPopupOpen) {
            isPopupOpen = false;
            fadeOut(document.getElementById('overlay'));
        }
    }
    if(event.keyCode === 37) {
        if(currentInd > 0 && isPopupOpen) {
            isKeyPress = true;
            imgPopup(currentInd - 1);
        }
    }
    if(event.keyCode === 39) {
        if(currentInd < imgArr.length - 1  && currentInd != -1 && isPopupOpen) {
            isKeyPress = true;
            imgPopup(currentInd + 1);
        }
    }
};

function addArrows() {
    return;
}

function removeArrows(){
    return;
}




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
// let imgArr = [{src: "GalleryPhotos/20170115_103925.jpg", desc: "Donner Lake, Truckee, CA"}, {src: "GalleryPhotos/cottowood.jpg", desc: "White Sands National Park, NM" }, {src: "GalleryPhotos/DSC07725.jpg", desc: "White Sands National Park, NM"}, {src: "GalleryPhotos/DSC07899.jpg", desc: "Vancouver, Canada" }, {src: "GalleryPhotos/DSC07947.jpg", desc: "Vancouver, Canada"}, {src: "GalleryPhotos/DSC07949.jpg", desc: "Vancouver, Canada"}, {src: "GalleryPhotos/DSC08027.jpg", desc: "Squamish, Canada"}, {src: "GalleryPhotos/HalfDome.jpg", desc: "Yosemite, CA"}, {src: "GalleryPhotos/HiddenLake.jpg", desc: "Glacier National Park, MT"}, {src: "GalleryPhotos/Hieropolis.jpg", desc: "Hieropolis, Turkey"}, {src: "GalleryPhotos/HalfDome2.jpg", desc: "Yosemite, CA"}, {src: "GalleryPhotos/Waterfall.jpg", desc: "Crater Lake, OR"}];
