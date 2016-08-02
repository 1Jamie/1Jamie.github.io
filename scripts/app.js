(function() {
  // The width and height of the captured photo.

  var width = 380;    // need to scale this properly for device
  var height = 0;    

// tell us whether were straming form the camera currently or not, we havent started yet so... no

  var streaming = false;

  // does the obvious... obviously clears the photo

  function clearPic() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

//initalizing the elements properties we need and assigning to the specific elements

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  console.log("variables set moving onto startup");

  function startup() {
    video = document.getElementById('lFeed');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('capture');

    console.log("variables attaced to elements moving onto setting up get user media");

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
          console.log('stream should be getting ready, you are on moz');
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
          console.log('stream should be ready now, you are on non-moz');
        }
        video.play();
        console.log("feed should be displayed now, if not check for issues");
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );

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
        streaming = true;
      }
    }, false);

    console.log('height and width of photo taken should now be set if not before');

    startbutton.addEventListener('click', function(ev){
      takepicture();
       console.log("picture should have been taken")
      ev.preventDefault();
    }, false);
    
    clearPic();
  }


//capture photo by taking a frame from the video feed and drawing it elsewhere then calling it

  function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
    
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    } else {
      clearPic();
    }
  }

// Start everything up after load

  window.addEventListener('load', startup, false);
})();
