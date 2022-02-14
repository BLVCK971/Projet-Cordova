// function getPosition() {
//     var options = {
//         enableHighAccuracy: true,
//         timeout: 5000
//     };
//     navigator.geolocation.watchPosition(onSuccess, onFail, options);
// }
var Parcours = [];
var trace = [];
var map = L.map("map");
var optionsInit = {
    enableHighAccuracy: true,
    timeout: 5000
};
navigator.geolocation.getCurrentPosition(onSuccessInit, onFail, optionsInit);
function onSuccessInit(position) {
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(map);
    map.setView([position.coords.latitude,position.coords.longitude], 15);
    trace.push([position.coords.latitude,position.coords.longitude]);
}
function onFail(message){
    console.log(message);
}

// window.setInterval(getPosition, 3000);
var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true,frequency: 3000 });
function onSuccess(position) {
    
    map.flyTo([position.coords.latitude,position.coords.longitude], 14, {
        animate: true,
        duration: .5 // in seconds
    });


    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
        .bindPopup(new Date().toString())
        .openPopup();
    
    
        console.log("position updated");

    // alert('Latitude: ' + position.coords.latitude + '\n' +
    //     'Longitude: ' + position.coords.longitude + '\n' +
    //     'Altitude: ' + position.coords.altitude + '\n' +
    //     'Accuracy: ' + position.coords.accuracy + '\n' +
    //     'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
    //     'Heading: ' + position.coords.heading + '\n' +
    //     'Speed: ' + position.coords.speed + '\n' +
    //     'Timestamp: ' + position.timestamp + '\n');

    Parcours.push({ "latitude": position.coords.latitude, "longitude": position.coords.longitude, "date": new Date() });

    // create a red polyline from an array of LatLng points
    trace.push([position.coords.latitude,position.coords.longitude]);
    var polyline = L.polyline(trace, {color: 'red'}).addTo(map);

    // zoom the map to the polyline
    map.fitBounds(polyline.getBounds());
}

function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}
//leaflet