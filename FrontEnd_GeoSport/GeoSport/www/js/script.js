function chargement(){
  document.addEventListener('deviceready', onDeviceReady, false);
}
var challenges=[];
function goToChallenge(id){
  localStorage.idCurrentChallenge = id;
  console.log("idChallenge :", id);

        xhttp = new XMLHttpRequest();
        xhttp.onload = function(){
          document.location.href="./running.html";
        };
        xhttp.onerror = function(){
          console.log("error");
        };
        
        xhttp.open("POST", localStorage.wsLink+"participations", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        let param = {
          "participant": localStorage.currentUserId,
          "defi": id
        }
        console.log("param : ",param);
      
      xhttp.send(JSON.stringify(param));
}
function chargedAccueil(){
  xhttp = new XMLHttpRequest();
      
  xhttp.onload = function(){
    console.log(this.responseText);
    challenges = JSON.parse(this.responseText);
    challenges.forEach(chall => {
      document.getElementById("defis").innerHTML+=`
      <div class="defis">
                        <img class=defis-img src="../img/cour1.jpg" alt="Cardio">
                        <div class="filtre"></div>
                        <div class="info">
                            <div class="author">`+chall.createur.pseudo+`</div>
                            <div class="category">`+chall.type+`</div>
                            <div class="desc">`+chall.description+`</div>
                            <div class="info-bottom">
                                <div class="amis">
                                    <img src="../img/cour2.jpg">
                                    <img src="../img/cour3.jpg">
                                </div>
                                <div id=start>
                                    <button onclick='goToChallenge(`+chall.id+`)' id="count" class="count btn-defis stop" value='`+chall.date_debut+`'></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
        `;
    });
  };
  xhttp.onerror = function(){
    console.log("ERROR");
  };
      xhttp.open("GET", localStorage.wsLink+"defis", true);
      
      xhttp.send();
}
//Section French
// Video 1
var myVideo1 = document.getElementById("video1"); 

function playPause1() { 
  if (myVideo1.paused) 
    myVideo1.play(); 
  else 
    myVideo1.pause(); 
} 

// Video 2

var myVideo2 = document.getElementById("video2"); 

function playPause2() { 
  if (myVideo2.paused) 
    myVideo2.play(); 
  else 
    myVideo2.pause(); 
} 

// Video 3
var myVideo3 = document.getElementById("video3"); 

function playPause3() { 
  if (myVideo3.paused) 
    myVideo3.play(); 
  else 
    myVideo3.pause(); 
} 

// button login subscribe
// Get the modal
var modal = document.getElementById('id01');

// button login
// Get the modal
var modalFR = document.getElementById('id02');


// All sections
// Hide language sections with onclick
function langue(flag) {
	var all = document.getElementsByClassName("toutes"); //Get all the class on the sections (language)
	// Run through the table and hide the sections when onclick
	for (i=0; i<all.length; i++) {
		all[i].style.display="none";
	}
	var lg = document.getElementById(flag); //
	lg.style.display="block";
}


// English section
// Video 1
var myVideo1EN = document.getElementById("video1EN"); 

function playPause1EN() { 
  if (myVideo1EN.paused) 
    myVideo1EN.play(); 
  else 
    myVideo1EN.pause(); 
} 

// Video 2

var myVideo2EN = document.getElementById("video2EN"); 

function playPause2EN() { 
  if (myVideo2EN.paused) 
    myVideo2EN.play(); 
  else 
    myVideo2EN.pause(); 
} 

// Video 3
var myVideo3EN = document.getElementById("video3EN"); 

function playPause3EN() { 
  if (myVideo3EN.paused) 
    myVideo3EN.play(); 
  else 
    myVideo3EN.pause(); 
} 

// button login subscribe
// Get the modal
var modalEN = document.getElementById('id01EN');

// button login
// Get the modal
var modal1EN = document.getElementById('id02EN');


// var countDownDate = new Date("Jan 07, 2022 14:33:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {





  // Display the result in the element with id="demo"
  // if(document.getElementById("count")){
  //   document.getElementById("count").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  //   // If the count down is finished, write some text
  //   if (distance < 0) {
  //     clearInterval(x);
  //     document.getElementById("count").innerHTML = "Start";
  //     document.getElementById("count").classList.add("go");
  //     document.getElementById("count").classList.remove("stop");
  //   }
  // }
  var now = new Date().getTime();

  if(document.getElementsByClassName("count")){
    var els = document.getElementsByClassName("count")
    Array.prototype.forEach.call(els, function(element) {
      // console.log(element);
      // <button onclick="getPosition()" id="count" class="count btn-defis stop"></button>
      var countDownDate = new Date(element.value).getTime();
        // Get today's date and time
        
        // Find the distance between now and the count down date
          let distance = countDownDate - now;

          // Time calculations for days, hours, minutes and seconds
          let days = Math.floor(distance / (1000 * 60 * 60 * 24));
          let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      element.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        element.innerHTML = "Start";
        element.classList.add("go");
        element.classList.remove("stop");
      }
    }); 


  }
}, 1000);
// console.log(document.getElementById("count").classList)

function register(){
  var mail = document.getElementById("mail").value;
  var pseudo = document.getElementById("pseudo").value;
  var pwd = document.getElementById("pwd").value;
      xhttp = new XMLHttpRequest();
      
      xhttp.onload = function(){

        var toast = document.getElementById("snackbar");
        toast.className = "show";
        setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
        
        document.location.href="../index.html";

      };
      xhttp.onerror = function(){
        var toast = document.getElementById("snackbar-fail");
        toast.className = "show";
        setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
      };
      
      // xhttp.open("POST", "https://backendgeosport.azurewebsites.net/runners?mail="+mail+"&mdp="+pwd+"&pseudo="+pseudo, true);
      // xhttp.open("POST", "https://backendgeosport.azurewebsites.net/runners?mail="+mail+"&password="+pwd+"&pseudo="+pseudo, true);
      xhttp.open("POST", localStorage.wsLink+"runners", true);
      xhttp.setRequestHeader("Content-Type", "application/json");
      let param = {
        "pseudo": pseudo,
        "mail": mail,
        "password": pwd
      }
      
      xhttp.send(JSON.stringify(param));
  }

  function creerDefi(){

    var nom = document.getElementById("name").value;
    var type = document.getElementById("type").value;
    var dateDebut = moment(document.getElementById("dateDebut").value).format('YYYY-MM-DDTHH:mm:ss');
    var duree = document.getElementById("duree").value;
    var desc = document.getElementById("desc").value;
    var idCreateur = localStorage.currentUserId||0;
    var date_creation = Date.now();
        xhttp = new XMLHttpRequest();
        xhttp.onload = function(){
  
          var toast = document.getElementById("snackbar");
          toast.className = "show";
          setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
          
          // document.location.href="accueil.html";
        };
        xhttp.onerror = function(){
          var toast = document.getElementById("snackbar-fail");
          toast.className = "show";
          setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
        };

        console.log(idCreateur);
        
        // xhttp.open("POST", "https://backendgeosport.azurewebsites.net/defis?nom="+nom+"&type="+type+"&dateDebut="+dateDebut
        // +"&duree="+duree+"&desc="+desc+"&idCreateur="+idCreateur+"&date_creation="+date_creation, true);
        
        xhttp.open("POST", localStorage.wsLink+"defis", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        let param = {
          "nom": nom,
          "createur": idCreateur,
          "date_debut": dateDebut,
          "type": type,
          "duree": duree,
          "description": desc
        }
        console.log("param : ",param);
      
      xhttp.send(JSON.stringify(param));

      // xhttp.send();
    }

    function afficherDefisUser(){
      var idUser = localStorage.currentUserId;
      var listeDefis = new XMLHttpRequest();
      listeDefis.open("GET", localStorage.wsLink+"participations", true);

      listeDefis.onload = function(){
        var defisEffectue = JSON.parse(listeDefis.responseText)
      
        for (var i = 0; i < defisEffectue.length; i++){
          if(idUser == defisEffectue[i].participant.id){
            $("#userChallenges tbody").append(
              "<tr>" + 
              "<td>"+ defisEffectue[i].defi.nom + "</td>"+
              "<td>"+ defisEffectue[i].defi.createur.pseudo + "</td>"+
              "<td>"+ defisEffectue[i].defi.date_debut + "</td>"+
              "<td>"+ defisEffectue[i].score + "</td></tr>"
            );
          }
        }

        console.log(defisEffectue);
        /*
        console.log(defisEffectue[0].defi.createur);
        console.log(defisEffectue.length);
        console.log(defisEffectue[2].participant.id);
        console.log(Object.keys(defisEffectue[i].defi.createur).length)
        for (var i = 0; i < defisEffectue.length; i++){
          console.log(Object.keys(defisEffectue[i].defi.createur).length)
        }
        */
              
      }

      listeDefis.onerror = function(){
        var toast = document.getElementById("snackbar-fail");
        toat.className = "show";
        setTimeout(function(){
          toat.className = toast.className.replace("show", "");

        }, 3000);
      }
      listeDefis.send()
      
    }