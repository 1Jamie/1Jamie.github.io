// not sure why i set it up like this... but hell it works
(function() {
  // The width and height of the captured photo.

  var width = 720;    // need to scale this properly for device
  var height = 1280;    

// tell us whether were straming form the camera currently or not, we havent started yet so... i hope not

  var streaming = false;

  // does the obvious... obviously clears the photo

  function clearPic() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

//initalizing the elements stuffs we need and telling then what to be.. were ass holes

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  console.log("variables set moving onto startup");

//i hope you can figure out what this does by the name... ill give you a hint... it starts it
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
      // i set this here for in case someone fucked up
      function(err) {
        console.log("An error occured! " + err);
      }
    );
    // this just sets some more of the cameras stuffs
    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
      
      
        if (isNaN(height)) {
          height = width * 2;
        }
        
        lFeed.setAttribute('width', width);
        lFeed.setAttribute('height', height);
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    console.log('height and width of photo taken should now be set if not before');

//I thought we might like the button to work... 
    startbutton.addEventListener('click', function(ev){
      takepicture();
      console.log("picture should have been taken");
       // its obviously beautful we have to save this shit!
      //savePic();
      //console.log("our shit should be saved");
      ev.preventDefault();
    }, false);
    
    clearPic();
  }

// ill use this later to set image name at some point... whenever i figure it out
var currentdate = new Date(); 
var datetime = currentdate.getDate() +
                + (currentdate.getMonth()+1)  + 
                + currentdate.getFullYear() + 
                + currentdate.getHours() + 
                + currentdate.getMinutes() + 
                + currentdate.getSeconds();

//lets try to save it this way
var savePic = function(){

var img = canvas.toDataURL("img/png");
//document.write('<img id="jpgImg" src="'+img'" style="display: none;" />');
//document.write('<img id="jptImg" style="display: none:" src="'+img+'"/>');
var oImg = document.createElement(img);
oImg.setAttribute("src", '"'+img+'"');
oImg.setAttribute("display", "none");
document.body.appendchild(oImg);
//var jpgImg = document.getElementById("jpgImg");
};

//capture our magnificintly setup frame from the video feed and drawing it elsewhere then calling it up

  function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
    
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data)

      save();

    } else {
      clearPic();
    }
  }

// Start everything up after load

  window.addEventListener('load', startup, false);
})();

var save = function(){
(canvas.toBlobHD || canvas.toBlob).call(canvas, function (b) {
    var a = document.createElement("a");
    a.textContent = "Download";
    document.body.appendChild(a);
    a.id = "clicker"
    a.style.display = "none";
    a.download = "test.jpg";
    a.href = window.URL.createObjectURL(b);
}, "image/png");
var clicker = document.getElementById("clicker");
clicker.click();
};