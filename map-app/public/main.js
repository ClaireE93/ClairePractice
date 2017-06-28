var markerClick = false;
var formVisible = false;
var curContinent = null;
var markerObj;

function changeImage(location) {
  let img = document.getElementById("map-image");
  let str = '/MapPhotos/' + location + '.jpg';
  img.src = str;
  fadeIn(img);
  fetch('markers').then(response => {
    console.log(response);
  })
  return false;
}

document.addEventListener('click', function(event) {
  const eventTarget = event.target;
  // Note: change to a switch?
  if (eventTarget.id === 'marker') {
    toggleMouse(true);
    markerClick = true;
  } else if (eventTarget.className === 'mapButton'){
    markerClick = false;
    let loc = eventTarget.id;
    curContinent = loc;
    changeImage(loc);
  } else if (markerClick && eventTarget.id === "map-image" && curContinent) {
    addMarker(event.pageX, event.pageY);
    markerClick = false;
  } else if (formVisible && eventTarget.className === 'form-button'){
    //close form on button click
    document.getElementById("form").style.display = 'none';
  }
});

function toggleMouse(bool) {
  // if(bool) {
  //   // document.getElementById('homepage').setAttribute("style", "cursor:url(map-marker.png);")
  //   document.getElementById('map-image').style.cursor = "url('map-marker.png'), auto";
  //   console.log('cursor');
  // } else {
  //   // document.body.style.cursor = 'pointer';
  // }
  return;
}


function addMarker(x, y) {
  let markerObj = {'xRatio': 0, 'yRatio': 0, 'place': '', 'status':'', 'notes': ''};

  const img = document.getElementById("map-image");
  // left, top, right, bottom, x, y, width, height properties of img;
  const imgRect = img.getBoundingClientRect();
  //add scroll to get total rectangle regardless of scroll (constant);
  const TOP = imgRect.top + window.scrollY;
  const LEFT = imgRect.left + window.scrollX;
  //change x,y to be relative to image instead of window
  //get x and y as a percentage of image height and width to store
  const xImg = x - LEFT;
  const yImg = y - TOP;
  const xPercent = xImg / imgRect.width;
  const yPercent = yImg / imgRect.height;
  markerObj.xRatio = xPercent;
  markerObj.yRatio = yPercent;

  //make popup form visible
  formVisible = true;
  let formObj = document.forms['form'];
  let form = document.getElementById("form");
  form.style.display = "flex";
  form.style.top = y + "px";
  form.style.left = x + "px";
  formObj.xRatio.value = xPercent;
  formObj.yRatio.value = yPercent;
  formObj.continent.value = curContinent;
  toggleReadOnly('true');
  addMarkerIcon(x, y);
  return;
}

function toggleReadOnly(bool){
  document.getElementById('xRatio').readOnly = bool;
  document.getElementById('yRatio').readOnly = bool;
  document.getElementById('continent').readOnly = bool;
}

function addMarkerIcon (x,y) {
  let div = document.getElementById('marker-images');
  let img = new Image();
  img.src = 'map-marker.png';
  img.className = 'markerIcon';
  div.appendChild(img);
  const height = y - img.offsetHeight;
  const width = x - (.5 * img.offsetWidth);
  img.style.top = height + "px";
  img.style.left = width + "px";
  toggleMouse(false);
}

function importDB(obj) {
  markerObj = obj;
}

// var importDB = function(obj) {
//   markerObj = obj;
// }
