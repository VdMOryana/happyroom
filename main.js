/*
// Opdracht 1: lachen maakt gelukkig. */

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
  runLoop();
  setInterval(runLoop, 5000);
}, 2000);

/* 
// Opdracht 2: bewegen maakt gelukkig. */

const video = document.querySelector('video');
video.addEventListener('ended', function () {
  video.currentTime = 0;
  video.play();
});

/* 
// Opdracht 3: Meditatie maakt gelukkig. */
// Define the duration of the inhale and exhale phases in milliseconds
const inhaleDuration = 4000;
const exhaleDuration = 4000;

// Define the total duration of the circle animation in milliseconds
const totalDuration = 120000;

// Define the start time of the animation
const startTime = Date.now();

// Get the HTML elements for the circle, inhale text, exhale text, and countdown timer
const circle = document.getElementById('circle');
const inhaleText = document.getElementById('inhale');
const exhaleText = document.getElementById('exhale');
const countdown = document.getElementById('countdown');

// Define a function to update the countdown timer
function updateCountdown() {
  const remainingTime = totalDuration - (Date.now() - startTime);
  const seconds = Math.floor(remainingTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  countdown.innerHTML = `${minutes}:${
    remainingSeconds < 10 ? '0' : ''
  }${remainingSeconds}`;
}

// Call the updateCountdown function once to initialize the timer
updateCountdown();

// Define a function to animate the circle
function animateCircle() {
  // Calculate the elapsed time since the start of the animation
  const elapsedTime = Date.now() - startTime;

  // Calculate the phase of the animation (inhale or exhale)
  const phaseDuration = inhaleDuration + exhaleDuration;
  const phaseElapsed = elapsedTime % phaseDuration;
  const isInhalePhase = phaseElapsed < inhaleDuration;

  // Update the text based on the phase of the animation
  if (elapsedTime >= 30000) {
    inhaleText.style.opacity = '0';
    exhaleText.style.opacity = '0';
  } else {
    inhaleText.style.opacity = isInhalePhase ? '1' : '0';
    exhaleText.style.opacity = isInhalePhase ? '0' : '1';
  }

  // Calculate the scale of the inner circle based on the phase of the animation
  const maxScale = 1.5;
  const minScale = 1.0;
  const phaseProgress = isInhalePhase
    ? phaseElapsed / inhaleDuration
    : (phaseElapsed - inhaleDuration) / exhaleDuration;
  const scale = minScale + (maxScale - minScale) * phaseProgress;

  // Set the scale of the inner circle
  circle.style.transform = `scale(${scale})`;

  // Call the updateCountdown function to update the timer
  updateCountdown();

  // Schedule the next frame of the animation
  if (elapsedTime < totalDuration) {
    requestAnimationFrame(animateCircle);
  }
}

// Wait 5 seconds before starting the animation
setTimeout(() => {
  animateCircle();
}, 5000);

/* 
// Opdracht 4: natuur maakt gelukkig. */

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

var myAudio = new Audio('images/natuurgeluiden.mp3');
myAudio.autoplay = true;
myAudio.loop = true;
myAudio.play();

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
  const canvasFace = faceapi.createCanvasFromMedia(video);
  document.body.append(canvasFace);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvasFace, displaySize);

  // Maak een canvas element en voeg deze toe aan de pagina
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  // Verkrijg een 2D context van de canvas
  const ctx = canvas.getContext('2d');

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    if (detections.length > 0 && !hasDetection) {
      hasDetection = true;

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
  }, 2000);
});

loadModels();
*/

const loop = [
  { element: document.getElementById('quote1'), duration: 10000 },
  { element: document.getElementById('opdracht1'), duration: 20000 },
  { element: document.getElementById('quote2'), duration: 10000 },
  { element: document.getElementById('opdracht2'), duration: 30000 },
  { element: document.getElementById('quote3'), duration: 10000 },
  { element: document.getElementById('opdracht3'), duration: 20000 },
  { element: document.getElementById('quote4'), duration: 10000 },
  { element: document.getElementById('opdracht4'), duration: 30000 },
  { element: document.getElementById('quote5'), duration: 10000 },
];

let huidigeOpdracht = 0;

function speelOpdrachtenAf() {
  // Set display of all opdrachten to none
  for (let i = 0; i < loop.length; i++) {
    loop[i].element.style.display = 'none';
  }

  // Set display of current opdracht to block
  loop[huidigeOpdracht].element.style.display = 'block';

  huidigeOpdracht++;
  if (huidigeOpdracht >= loop.length) {
    huidigeOpdracht = 0;
  }

  // Set interval for the next opdracht
  setTimeout(speelOpdrachtenAf, loop[huidigeOpdracht].duration);
}

// Start the loop with the first opdracht
setTimeout(speelOpdrachtenAf, loop[huidigeOpdracht].duration);
