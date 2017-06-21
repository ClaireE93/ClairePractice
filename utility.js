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


//This function only works if you have all images already listed out in HTML file. Then, this function changes the class
//of the shown image and the upcoming image to make it cross fade.

// function nextImage(id) {
//     var e;
//     // remove showMe class from current image
//     e = document.getElementsByClassName('showMe');
//     console.log(e);
//     removeClass(e, "showMe");
//     // add showMe class to next image
//     e = document.getElementById(id);
//     addClass(e, "showMe");
// }
    
// function addClass(elem, name) {
//     var c = elem.className;
//     if (c) c += " ";  // if not blank, add a space separator
//     c += name;
//     elem.className = c;
// }

// function removeClass(elem, name) {
//     var c = elem.className;
//     elem.className = c.replace(name, "").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");  // remove name and extra blanks
// }