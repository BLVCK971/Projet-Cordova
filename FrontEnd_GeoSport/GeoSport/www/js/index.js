/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
// localStorage.wsLink = "https://112b-2a01-cb20-485a-e000-6d70-e5d5-feec-cdc5.ngrok.io/";
localStorage.wsLink = "https://aa7d-193-251-163-42.ngrok.io/";
// localStorage.wsLink = "https://backendgeosport.azurewebsites.net/"
function chargement(){
    document.addEventListener('deviceready', onDeviceReady, false);
}

function onDeviceReady() {
    document.getElementById('btGetConnex').addEventListener('click', afficherInfoConnex, false);
    document.getElementById('btTakePhoto').addEventListener('click', takePhoto, false);
    document.getElementById('btGalerie').addEventListener('click', takeGalerie, false);
    document.getElementById('btGeo').addEventListener('click', getPosition, false);
}

// function getPosition(){
//     var options = {
//         enableHighAccuracy:true,
//         timeout:5000
//     };
//     navigator.geolocation.getCurrentPosition(onSuccess,onFail,options);
//     setTimeout('getPosition',30000);
// }
// function onSuccess(position){
//     alert('Latitude: '          + position.coords.latitude          + '\n' +
//               'Longitude: '         + position.coords.longitude         + '\n' +
//               'Altitude: '          + position.coords.altitude          + '\n' +
//               'Accuracy: '          + position.coords.accuracy          + '\n' +
//               'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
//               'Heading: '           + position.coords.heading           + '\n' +
//               'Speed: '             + position.coords.speed             + '\n' +
//               'Timestamp: '         + position.timestamp                + '\n');
// }

// function onError(error) {
//         alert('code: '    + error.code    + '\n' +
//               'message: ' + error.message + '\n');
//     }

function takePhoto(){
    var options ={
        quality:25,
        destinationType:Camera.DestinationType.DATA_URL,
        sourceType:Camera.PictureSourceType.CAMERA
    };
    navigator.camera.getPicture(prendrePhoto, onFail, options);
}    

function prendrePhoto(imageData){
    var image = document.getElementById('monImage');
    image.src = "data:image/jpeg;base64," + imageData;
}
function onFail(message){
    document.getElementById("message").innerHTML = message;
}

function takeGalerie(){
    var options ={
        quality:25,
        destinationType:Camera.DestinationType.DATA_URL,
        sourceType:Camera.PictureSourceType.SAVEDPHOTOALBUM
    };
    navigator.camera.getPicture(prendrePhoto, onFail, options);
}


function afficherInfo(){
    document.getElementById("info").innerHTML = 
    "Model: " + device.model+"<br />"+
    "Plateform: " + device.platform+"<br />"+
    "Version: " + device.version+"<br />"+
    "Manufacture: " + device.manufacturer;
}
            
function afficherInfoConnex(){
    var typeConex = navigator.connection.type;
    var message = "Connexion: ";
    if(typeConex == Connection.UNKNOWN) {
        message = message+" inconnue";
    }
    else if(typeConex == Connection.ETHERNET){
        message = message+" cabl??e";
    }
    else if(typeConex == Connection.WIFI){
        message = message+" WIFI";
    }
    else if(typeConex == Connection.CELL_3G){
        message = message+" R??seau 3g";
    }
    else if(typeConex == Connection.CELL_4G){
        message = message+" R??seau 4g";
    }
    else if(typeConex == Connection.CELL){
        message = message+" Donn??es c??lulaires";
    }
    else if(typeConex == Connection.NONE){
        message = message+" Pas de connexion";
    }
    document.getElementById("message").innerHTML = message; 
}

function login(){
    var pseudo = document.getElementById("mail").value;
    var pass = document.getElementById("pwd").value;
        xhttp = new XMLHttpRequest();
        xhttp.onload = function(){
            // get id in json
            console.log(this.responseText);
            let myResponse = JSON.parse(this.responseText);
            console.log(myResponse);
            if(myResponse.length>0){
                var id = myResponse[0].id;
                if(id&&id != ""){
                    localStorage.currentUserId = id;
                    console.log("my id :",id);
                    document.location.href="pages/accueil.html";
    
                }
            }else{
                var toast = document.getElementById("snackbar-fail");
                toast.className = "show";
                setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
            }
            
        }
        
        // xhttp.open("GET", "https://backendgeosport.azurewebsites.net/runners?mail="+pseudo+"&mdp="+pass, true);
        xhttp.open("GET", localStorage.wsLink+"runners?mail="+pseudo+"&password="+pass, true);
        xhttp.send();
        
    }