// function getPosition() {
//     var options = {
//         enableHighAccuracy: true,
//         timeout: 5000
//     };
//     navigator.geolocation.watchPosition(onSuccess, onFail, options);
// }
// var moment = require('moment');
var Parcours = [];
var trace = [];
var chemin = [];
var map = L.map("map");
var optionsInit = {
    enableHighAccuracy: true,
    timeout: 5000
};
navigator.geolocation.getCurrentPosition(onSuccessInit, onFail, optionsInit);
function onSuccessInit(position) {
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(map);
    map.setView([position.coords.latitude,position.coords.longitude], 15);
    trace.push({"latitude":position.coords.latitude,"longitude":position.coords.longitude,"altitude":position.coords.altitude});
    chemin.push([position.coords.latitude, position.coords.longitude]);
}
function onFail(message){
    console.log(message);
}

// window.setInterval(getPosition, 3000);
var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true,frequency: 30000 });
function onSuccess(position) {
    
    map.flyTo([position.coords.latitude,position.coords.longitude], 14, {
        animate: true,
        duration: .5 // in seconds
    });


    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
        // .bindPopup(new Date().toString())
        .bindPopup(moment().format('HH:mm:ss'))
        .openPopup();
    
//calcul
        testScore();
    
        console.log("position updated");
    
    // alert('Latitude: ' + position.coords.latitude + '\n' +
    //     'Longitude: ' + position.coords.longitude + '\n' +
    //     'Altitude: ' + position.coords.altitude + '\n' +
    //     'Accuracy: ' + position.coords.accuracy + '\n' +
    //     'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
    //     'Heading: ' + position.coords.heading + '\n' +
    //     'Speed: ' + position.coords.speed + '\n' +
    //     'Timestamp: ' + position.timestamp + '\n');
    chemin.push([position.coords.latitude, position.coords.longitude]);
    Parcours.push({ "latitude": position.coords.latitude, "longitude": position.coords.longitude, "date": new Date() });

    // create a red polyline from an array of LatLng points
    trace.push({"latitude":position.coords.latitude,"longitude":position.coords.longitude,"altitude":position.coords.altitude});
    var polyline = L.polyline(chemin, {color: 'red'}).addTo(map);

    // zoom the map to the polyline
    map.fitBounds(polyline.getBounds());
}

function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}
//leaflet

function testScore () {
    console.log("trace : ", trace);
    if(trace.length>1){
        let longA = trace[trace.length-2].longitude;
        let longB = trace[trace.length-1].longitude;
        let latA = trace[trace.length-2].latitude;
        let latB = trace[trace.length-1].latitude;
        let altL = trace[trace.length-1].altitude;
        let altP = trace[trace.length-2].altitude;
        let coeff = 6;
        let distance = calcDistance(longA, longB, latA, latB);
        console.log((altL - altP) / 6)
        let score = (distance + (altL - altP) / coeff) * 10;
        console.log("score",score);
        xhttp = new XMLHttpRequest();
        xhttp.onload = function(){
        //   alert(http.responseText);          
        console.log("POSITION UPDATED");
        };
        xhttp.onerror = function(){
            console.log("ERROR UPDATE");
        };
        xhttp.open("PUT", localStorage.wsLink+"participations?defi="+nom+"&self="+localStorage.currentUserId, true);
        xhttp.send();
    }
}

function convRad (valeur) {
    return(valeur*Math.PI/180)
}

// loi des sinus
function calcDistance (longA, longB, latA, latB) {
    let sin = Math.sin(convRad(latA))*Math.sin(convRad(latB));
    let cos = Math.cos(convRad(latA))*Math.cos(convRad(latB))*Math.cos(convRad(longB)-convRad(longA));
    return(6371*Math.acos(sin+cos))
}