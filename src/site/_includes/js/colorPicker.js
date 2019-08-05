// simple button click event handler
function updateColour(selector, section) {
  var swatch = document.querySelector(selector);
  var layer = document.querySelector(section);
  if(!swatch) { return; }
  swatch.addEventListener('change', function(event) {
    event.preventDefault();
    layer.style.fill = swatch.value;
  }, false);
}


updateColour('#flavourtop', '#lolly-top');
updateColour('#flavourmiddle', '#lolly-middle');
updateColour('#flavourbottom', '#lolly-bottom');
