
function updateColour(selector, section) {
  var swatch = $(selector);
  var layer = $(section);
  if(!swatch) { return; }
  swatch.addEventListener('change', function(event) {
    event.preventDefault();
    layer.style.fill = swatch.value;
  }, false);
}

updateColour('#flavourTop', '.lollyTop');
updateColour('#flavourMiddle', '.lollyMiddle');
updateColour('#flavourBottom', '.lollyBottom');
