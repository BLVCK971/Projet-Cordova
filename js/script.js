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
