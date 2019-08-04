

function getLollyData(id) {

  var url = `/.netlify/functions/getLolly?id=${id}`;
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(JSON.stringify(json));
    displayLolly(json);
  });
}


function displayLolly(data) {

  var params = new URLSearchParams(location.search);
  if(params.has('new')){
    $('#status').innerText = `Lolly is frozen and ready for you to share with your friend: https://vlolly.net/lolly/${data.lollyPath}`;
  } else {
    $('#status').innerText = "A lolly for you. Aren't you lucky!";
  }
  $('#recipient').innerText = data.recipientName;
  $('#message').innerText = data.message;
  $('#lollyimage').innerText = data.lollyType;
  $('#from').innerText = data.sendersName;
}



(function(){

  // If we find a d
  var params = new URLSearchParams(location.search);
  if(params.has('id')){
    getLollyData(params.get('id'));
  }

})();
