let isPopupOpen = false; // True when the imgPopup is open
let currentInd;
let lastImageSrc;
let isKeyPress = false; // True when imgPopup is called using arrow keys
const ESC = 27;
const LEFT = 37;
const RIGHT = 39;

function populateGallery() {
    let container = document.getElementById('img-gallery-container');
    let str = '';
    for(let i = 0; i < imgArr.length; i++) {
      str += `<img id="${i}" class="photo" src="${imgArr[i].src}"/>`;
    }
    container.innerHTML = str;
}

function imgPopup(ind) {
    currentInd = parseInt(ind);
    if(isKeyPress){
        lastImgSrc = document.getElementById('img-popup').src;
    }
    let popupCont = document.getElementById('img-popup-container');
    let popupTxt = document.getElementById('text-popup-element');
    //TODO: Allow for scrolling if img is too big for window.
    let img = document.getElementById('img-popup')
    if (img.src) {
        img.style.width = "auto";
        img.style.height = "auto";
    }
    popupTxt.textContent = imgArr[ind].desc;
    let parent = new Image;
    parent.src = imgArr[ind].src;
    img.src = imgArr[ind].src;

    if(parent.height >= parent.width) {
        img.style.height = window.innerHeight * 0.75 + "px";
    } else if(parent.height < parent.width) {
        img.style.width = window.innerWidth * 0.60 + "px";
    }

    if(isKeyPress){
        document.getElementById('overlay').style.display= 'flex';
        fadeIn(img);
        isKeyPress = false;
    } else {
        fadeIn(document.getElementById('overlay'));
    }
    addArrows(img.width);
    isPopupOpen = true;
}

document.addEventListener('click', function(event) {
  const eventTarget = event.target;
  // Note: Can extend this to check many class name or id's in a switch
  if (eventTarget.className === 'photo') {
    imgPopup(event.target.id);
  } else if (eventTarget.id === 'arrow-right'){
        shiftRight();
    } else if (eventTarget.id === 'arrow-left'){
        shiftLeft();
  } else {
    const specifiedElement = document.getElementById('img-popup-container');
    if (!specifiedElement) return;
    const isClickInside = specifiedElement.contains(eventTarget);
    if (!isClickInside && isPopupOpen) {
      isPopupOpen = false;
      currentInd = -1;
      fadeOut(document.getElementById('overlay'));
    }
  }
});

//TODO Change to switch case, define key codes as constants (ESC, LEFT, RIGHT)
window.onkeydown = function(event) {
    switch(event.keyCode){
        case ESC:
            if(isPopupOpen) {
                isPopupOpen = false;
                fadeOut(document.getElementById('overlay'));
            }
            break;
        case LEFT:
            shiftLeft();
            break;
        case RIGHT:
            shiftRight();
            break;
    }

    // if (event.keyCode === ESC) {
    //     if(isPopupOpen) {
    //         isPopupOpen = false;
    //         fadeOut(document.getElementById('overlay'));
    //     }
    // }
    // if(event.keyCode === LEFT) {
    //     shiftLeft();
    // }
    // if(event.keyCode === RIGHT) {
    //     shiftRight();
    // }
};

function addArrows(width) {
    let arrCont = document.getElementById('arrow-container');
    arrCont.style.width = width + 'px';
}

function shiftRight() {
    if(currentInd < imgArr.length - 1  && currentInd != -1 && isPopupOpen) {
            isKeyPress = true;
            imgPopup(currentInd + 1);
        } else if (currentInd === imgArr.length - 1) {
            isKeyPress = true;
            imgPopup(0);
        }
}

function shiftLeft() {
    if(currentInd > 0 && isPopupOpen) {
            isKeyPress = true;
            imgPopup(currentInd - 1);
        } else if (currentInd === 0) {
            isKeyPress = true;
            imgPopup(imgArr.length - 1);
        }
}

//TODO Put into "utility" file and import onto both pages
// function fadeIn(el){
//   el.style.opacity = 0;
//   el.style.display = 'flex';

//   (function fade() {
//     var val = parseFloat(el.style.opacity);
//     if (!((val += 0.05) > 1)) {
//       el.style.opacity = val;
//       requestAnimationFrame(fade);
//     }
//   })();
// }

// function fadeOut(el){
//   el.style.opacity = 1;

//   (function fade() {
//     if ((el.style.opacity -= 0.05) < 0) {
//       el.style.display = "none";
//     } else {
//       requestAnimationFrame(fade);
//     }
//   })();
// }