// The face detection does not work on all browsers and operating systems.
// If you are getting a `Face detection service unavailable` error or similar,
// it's possible that it won't work for you at the moment.

const faceDetector = new window.FaceDetector();
const video = document.querySelector('video.webcam');
const canvas = document.querySelector('canvas.video');
const ctx = canvas.getContext('2d');

const faceCanvas = document.querySelector('canvas.face');
const faceCtx = faceCanvas.getContext('2d');


async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
  });
  video.srcObject = stream;
  await video.play();
 
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}

async function detect() {
  const faces = await faceDetector.detect(video);
  faces.forEach(drawFace);
  requestAnimationFrame(detect);
}

function drawFace(face) {
  const {width, height, top, left} = face.boundingBox;
  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.arc(left+(width/2), top+(height/2), 5, 0, Math.PI*2, true);
  ctx.fill();


}

var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
});

populateVideo().then(detect);

//Setup the clear button

const clear = document.querySelector('.clear');

function clearCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
}

clear.addEventListener('click', clearCanvas);