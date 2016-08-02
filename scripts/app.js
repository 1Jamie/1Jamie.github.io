//check to make sure that getusermedia is supported
function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

if (hasGetUserMedia()) {
  // Good to go!
} else {
  alert('getUserMedia() is not supported in your browser');
}
//initialzation
function() {
	var width = 320;  //scale photo
	var height = 0;

	var streaming = false;
	var video = null;
	var canvas = null;
	var photo = null;
	var startButton = null
}
//does the obvious starts the dang thing
function startup () {
	video = document.getElementById('video');
	canvas = doccument.getElementById('canvas');
	photo = doccument.getElementById('photo');
	startButton = doccument.getElementById('startButton')
}
navigator.getMedia = (navigator.getusermedia ||
						navigator.webkitGetUserMedia ||
						navigator.mozGetUserMedia||
						navigator.msGetUserMedia);

navigator.getMedia(
{
	video: true;
	audio: false;
},
	function(stream) {
		if (navigator.mozGetUserMedia) {
			video.mozSrcObject = stream;
		} else {
			var vendorURL= window.URL || window.webkitURL ;
			video.src - vendorURL.createObjectURL(stream) ;
		}
		video.play();
		}
		function(err) {
			console.log("there is an issue somewhere!" + err);
		}
);

//geting feed for picture running
video.addEventListener('canplay', function(ev){
	if (!streaming) {
		height = video.videoHeight / (video.videoWidth/width);

		if (isNaN(height)) {
			height = width / (4/3);
		}
		video.setAttribute('width', width);
		video.setAttribute('height', height);
		canvas.setAttribute('width', width);
		canvas.setAttribute('height', height);
	}	
}, false);
startButton.addEventListener('click', function(ev){
	takepicture();
	ev.preventDefault();
}, false);
//this function clears the photo box
function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }
clearphoto();
// this fucntion does 
function takepicture() {
	var context = canvas.getContext('2d');
	if (width && height) {
		canvas.width = width;
		canvas.height = height;
		context.drawImage(video, 0, 0, width, height);

		var data = canvas.toDateURL('image/png');
		photo.setAttribute('src', data);

	} else {
		clearphoto()
	}
}