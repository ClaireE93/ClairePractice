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
    // document.getElementById('overlay').style.visibility = 'visible';
    document.getElementById('overlay').style.display = 'flex';
    // let popupCont = document.getElementById('img-popup-container');
    let popupImg = document.getElementById('img-popup-element');
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
    // window.addEventListener('click', closePopup(), false);
    // isImageClick = true;
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
      document.getElementById('overlay').style.display = 'none';
    }
  }
});

// TODO: move to external file
let imgArr = [{src: "GalleryPhotos/20170115_103925.jpg", desc: "Donner Lake, Truckee, CA"}, {src: "GalleryPhotos/cottowood.jpg", desc: "White Sands National Park, NM" }, {src: "GalleryPhotos/DSC07725.jpg", desc: "White Sands National Park, NM"}, {src: "GalleryPhotos/DSC07899.jpg", desc: "Vancouver, Canada" }, {src: "GalleryPhotos/DSC07947.jpg", desc: "Vancouver, Canada"}, {src: "GalleryPhotos/DSC07949.jpg", desc: "Vancouver, Canada"}, {src: "GalleryPhotos/DSC08027.jpg", desc: "Squamish, Canada"}, {src: "GalleryPhotos/HalfDome.jpg", desc: "Yosemite, CA"}, {src: "GalleryPhotos/HiddenLake.jpg", desc: "Glacier National Park, MT"}, {src: "GalleryPhotos/Hieropolis.jpg", desc: "Hieropolis, Turkey"}, {src: "GalleryPhotos/HalfDome2.jpg", desc: "Yosemite, CA"}, {src: "GalleryPhotos/Waterfall.jpg", desc: "Crater Lake, OR"}];
