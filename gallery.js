

function populateGallery() {
    let container = document.getElementById('img-gallery-container');
    let str = '';
    for(let i = 0; i < imgArr.length; i++) {
        str += '<img id="' + i.toString() + '"" class="photo" onClick="imgPopup(' + i + ')" src="' + imgArr[i].src + '" />';
        // let img = document.createElement('img');
        // img.src = imgArr[i].src;
        // img.id = i.toString();
        // img.width = "300";
        // img.style.border = "5px solid white";
        // container.appendChild(img);
    }
    container.innerHTML = str;
}

function imgPopup(ind) {
    document.getElementById('overlay').style.visibility = 'visible';
    // document.getElementById('overlay').style.display = 'flex';
    // let popupCont = document.getElementById('img-popup-container');
    let popupImg = document.getElementById('img-popup-element');
    let popupTxt = document.getElementById('text-popup-element');
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
}

var specifiedElement = document.getElementById('img-popup-container');
document.addEventListener('click', function(event) {
    var isClickInside = specifiedElement.contains(event.target);
    if (!isClickInside) {
        document.getElementById('overlay').style.visibility = 'hidden';
    }
});




function closePopup() {
    console.log('click');
    if(event.target === document.getElementById('overlay')) {
        document.getElementById('overlay').style.visibility = 'hidden';
        console.log('hi');
        window.removeEventListener('click', closePopup(), false);
    }
}

//&& event.target !== document.getElementById('img-popup-container') && document.getElementById('overlay').style.visibility === 'visible'
//DOES NOT WORK!!
// window.addEventListener('click', function() {
//     let overlay = document.getElementById('overlay');
//     let popup = document.getElementById('img-popup-container');
//     console.log(overlay.style.visibility);
//     if(event.target != popup && overlay.style.visibility == 'visible') {
//         console.log('closed!');
//         overlay.style.visibility = 'hidden';
//     }

// }, false);

// window.onload = function(){
//     var popup = document.getElementById('img-popup-container');
//     var overlay = document.getElementById('overlay');
//     document.onclick = function(e){
//         if(e.target.id == 'overlay'){
//             // popup.style.visibility = 'hidden';
//             overlay.style.visibility = 'hidden';
//             console.log('hi');
//         }
//         // if(e.target === openButton){
//         //     popup.style.display = 'block';
//         //     overlay.style.display = 'block';
//         // }
//     };
// };

// window.onload = function(){
//   var divToHide = document.getElementById('overlay');
//   document.onclick = function(e){
//     if(e.target.id !== 'img-popup-container'){
//       //element clicked wasn't the div; hide the div
//       divToHide.style.display = 'none';
//       console.log('hi');
//     }
//   };
// };

let imgArr = [{src: "GalleryPhotos/20170115_103925.jpg", desc: "Donner Lake, Truckee, CA"}, {src: "GalleryPhotos/cottowood.jpg", desc: "White Sands National Park, NM" }, {src: "GalleryPhotos/DSC07725.jpg", desc: "White Sands National Park, NM"}, {src: "GalleryPhotos/DSC07899.jpg", desc: "Vancouver, Canada" }, {src: "GalleryPhotos/DSC07947.jpg", desc: "Vancouver, Canada"}, {src: "GalleryPhotos/DSC07949.jpg", desc: "Vancouver, Canada"}, {src: "GalleryPhotos/DSC08027.jpg", desc: "Squamish, Canada"}, {src: "GalleryPhotos/HalfDome.jpg", desc: "Yosemite, CA"}, {src: "GalleryPhotos/HiddenLake.jpg", desc: "Glacier National Park, MT"}, {src: "GalleryPhotos/Hieropolis.jpg", desc: "Hieropolis, Turkey"}, {src: "GalleryPhotos/HalfDome2.jpg", desc: "Yosemite, CA"}, {src: "GalleryPhotos/Waterfall.jpg", desc: "Crater Lake, OR"}];

