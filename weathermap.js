var map;
var ourLoc; //stores longitude and latitude
var view;

function init(){
  ourLoc = ol.proj.fromLonLat([-74.006,40.7128]);
  view = new ol.View({
    center: ourLoc,
    zoom: 10,
  })
  map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(

        )
      })
    ],
    loadTilesWhileAnimating: true,
    view: view
  });

} //program we run whenever program initializes

window.onload = init;

function panHome(){
  view.animate({
    center: ourLoc,
    duration: 2000,
  })
}

function panToLocation(){
  var countryName = document.getElementById("countryName").value;
  if (countryName == ""){
    alert("Please enter a country")
  }
  var query ="https://restcountries.eu/rest/v2/name/" + countryName +"?fullText=true";
  query = query.replace(/ /g,"%20");
  var countryRequest = new XMLHttpRequest();
  countryRequest.open("GET", query, false);
  countryRequest.send();

  var countryInfo = JSON.parse(countryRequest.responseText);
  countryInfo = countryInfo[0].latlng;
  var lon = countryInfo[1];
  var lat = countryInfo[0];
  var location = ol.proj.fromLonLat([lon, lat]);
  view.animate({
    center: location,
    duration: 2000,
  });

}
