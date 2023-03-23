/*
// Opdracht 1: lachen maakt gelukkig. (Speech functie werkt niet meer?)

const opdracht1 = ['Ha', 'Ha-Ha', 'Ha-Ha-Ha', 'Ha-Ha-Ha-Ha'];
let index = 0;
const opdrachtenElement = document.getElementById('opdrachten');

function runLoop() {
  const currentOpdracht = opdracht1[index];
  opdrachtenElement.innerHTML = currentOpdracht;

  // Speel de tekst af met de SpeechSynthesis API
  const message = new SpeechSynthesisUtterance(currentOpdracht);
  window.speechSynthesis.speak(message);

  index++;
  if (index >= opdracht1.length) {
    index = 0;
  }
}

setTimeout(function () {
  // Toon de eerste opdracht en verwijder het H1 element
  opdrachtenElement.innerHTML = opdracht1[0];
  document.querySelector('h1').style.display = 'none';

  // Start de loop en wacht 5 seconden tussen elke opdracht
  setInterval(runLoop, 6000);
}, 8000);
*/

/* 
// Opdracht 2: natuur maakt gelukkig. (nog geluid aan toevoegen? Meer foto's?)

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("slide");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.opacity = "0";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.opacity = "1";
  setTimeout(showSlides, 10000); // Change image every 5 seconds
}
*/

import './style.css';
import * as faceapi from 'face-api.js';

const video = document.querySelector('video');

async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
  await faceapi.nets.faceExpressionNet.loadFromUri('/models');

  startVideo();
}

async function startVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    console.log(detections);

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  }, 100);
});

loadModels();
