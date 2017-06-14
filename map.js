
function changeImage(location) {
  let img = document.getElementById("map-image");
  let str = 'MapPhotos/' + location + '.jpg';
  img.src = str;
  fadeIn(img);
  return false;
}


//TRY TO MOVE TO CSS. Have "fadein" and "fadeout" class in CSS. Change CSS class to fade in/fade out

// function fadeIn(el) {
//   el.style.opacity = 0;

//   var last = +new Date();
//   var tick = function() {
//     el.style.opacity = +el.style.opacity + (new Date() - last) / 900;
//     last = +new Date();

//     if (+el.style.opacity < 1) {
//       (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
//     }
//   };

//   tick();
// }

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
