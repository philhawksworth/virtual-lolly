

function getLollyData(id) {

  var url = `/.netlify/functions/getLolly?id=${id}`;
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
}

(function(){

  // If we find a d
  var params = new URLSearchParams(location.search);
  if(params.has('id')){
    getLollyData(params.get('id'));
  }

})();
