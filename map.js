
function changeImage(location) {
  let img = document.getElementById("map-image");
  let str = 'MapPhotos/' + location + '.jpg';
  img.src = str;
  fadeIn(img);
  return false;
}

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
