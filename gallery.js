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
    currentInd = parseInt(ind);
    let popupCont = document.getElementById('img-popup-container');
    let popupTxt = document.getElementById('text-popup-element');
    //TODO: Allow for scrolling if img is too big for window.
    let img = document.getElementById('img-popup')
    if (img.src) {
        // popupCont.style.width = "auto";
        // popupCont.style.height = "auto";
        // img.style.width = "inherit";
        // img.style.height = "inherit";
        img.style.width = "auto";
        img.style.height = "auto";
    }
    popupTxt.textContent = imgArr[ind].desc;
    // let height = parseInt(window.getComputedStyle(popupTxt).fontSize, 10);
    // console.log("text height: " + height);
    let parent = new Image;
    parent.src = imgArr[ind].src;
    img.src = imgArr[ind].src;
    if(parent.height >= parent.width) {
        img.style.height = window.innerHeight * 0.75 + "px";
        // popupCont.style.height = window.innerHeight * 0.75 + "px"; //NOT WORKING. Not leaving space for caption
        // img.style.height = (window.innerHeight * 0.75 - height - 5) + "px"; //This is gross
    } else if(parent.height < parent.width) {
        img.style.width = window.innerWidth * 0.60 + "px";
        // popupCont.style.width = window.innerWidth * 0.60 + "px";
    }
    if(isKeyPress){
        document.getElementById('overlay').style.display= 'flex';
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
  } else {
    const specifiedElement = document.getElementById('img-popup-container');
    if (!specifiedElement) return;
    const isClickInside = specifiedElement.contains(eventTarget);
    if (!isClickInside && isPopupOpen) {
      isPopupOpen = false;
      removeArrows();
      currentInd = -1;
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
        } else if (currentInd === 0) {
            isKeyPress = true;
            imgPopup(imgArr.length - 1);
        }
    }
    if(event.keyCode === 39) {
        if(currentInd < imgArr.length - 1  && currentInd != -1 && isPopupOpen) {
            isKeyPress = true;
            imgPopup(currentInd + 1);
        } else if (currentInd === imgArr.length - 1) {
            isKeyPress = true;
            imgPopup(0);
        }
    }
};

function addArrows(width) {
    return;
    
    let arrRight = document.getElementById('arrow-right');
    let arrLeft = document.getElementById('arrow-left')
    arrRight.src = 'arrow-right.png';
    arrRight.style.width = width * 0.10;
    arrLeft.src = 'arrow-left.png';
    arrLeft.style.width = width * 0.10;

    // return;
}

function removeArrows(){
    return;
}

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