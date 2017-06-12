
function changeImage(location) {
  let img = document.getElementById("map-image");
  let str = 'MapPhotos/' + location + '.jpg';
  img.src = str;
  fadeIn(img);
  return false;
}

function fadeIn(el) {
  el.style.opacity = 0;

  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 900;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}
