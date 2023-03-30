/*
// Opdracht 1: lachen maakt gelukkig. 

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
  document.querySelector('h1').style.display = 'none';

  // Start de loop en wacht 5 seconden tussen elke opdracht
  runLoop()
  setInterval(runLoop, 5000);
}, 2000);
*/

/* 
// Opdracht 2: natuur maakt gelukkig. (Zowel swiper als geluid werken niet. Wel in externe file.)  

// import Swiper bundle with all modules installed
import Swiper, { Autoplay, EffectFade } from 'swiper';
// import styles bundle
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

// init Swiper:
new Swiper('.swiper', {
  speed: 25000,
  effect: 'fade', // Set effect to fade
  modules: [Autoplay, EffectFade],
  loop: true,
  autoplay: {
    delay: 10000,
  },
  direction: 'horizontal', // Set direction to horizontal or vertical
  slidesPerView: 1, // Set slidesPerView to 1
});
*/

/* 
// Opdracht 3: bewegen maakt gelukkig. 

  const video = document.querySelector('video');
  video.addEventListener('ended', function() {
    video.currentTime = 0;
    video.play();
  });
*/

/* 
// Opdracht 4: Springen maakt gelukkig. 
const line = document.querySelector('.line');

let yPos = 0;
let color = getRandomColor();
let speed = 3.5; // snelheid van de lijn
let startTime = Date.now();

function moveLine() {
  yPos += speed;
  line.style.top = yPos + 'px';
  if (yPos >= window.innerHeight) {
    yPos = 0;
    color = getRandomColor();
    line.style.backgroundColor = color;
  }

  // controleer of 50sec. zijn verstreken
  if (Date.now() - startTime < 50000) {
    requestAnimationFrame(moveLine);
  }
}

function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

moveLine();
*/

/* 
// Face detection 
import './style.css';
import * as faceapi from 'face-api.js';

const video = document.querySelector('video');

let hasDetection = false;

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

    if (detections.length > 0 && !hasDetection) {
      hasDetection = true;

      // Maak een canvas element en voeg deze toe aan de pagina
      const canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      document.body.appendChild(canvas);

      // Verkrijg een 2D context van de canvas
      const ctx = canvas.getContext('2d');

      // Kies een willekeurige positie en kleur
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = 20; // straal van de bol
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16); // willekeurige hex kleurcode

      // Teken de bol
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    } else if (detections.length === 0) {
      hasDetection = false;
    }

    console.log(detections);

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  }, 2000);
});

loadModels();
*/
