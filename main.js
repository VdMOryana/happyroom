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
// Opdracht 3: meditatie maakt gelukkig. */
// Get the HTML elements for the circle, inhale text, and exhale text
const circle = document.getElementById('circle');
const inhaleText = document.getElementById('inhale');
const exhaleText = document.getElementById('exhale');

// Define a function to animate the circle
function animateCircle() {
  // Calculate the scale of the inner circle based on the phase of the animation
  const maxScale = 1.5;
  const minScale = 1.0;
  const isPhase1 = Date.now() % 8000 < 4000; // inhale phase lasts for 4 seconds
  const phaseProgress = isPhase1
    ? (Date.now() % 4000) / 4000
    : (4000 - (Date.now() % 4000)) / 4000; // calculate the progress of the phase
  const scale = minScale + (maxScale - minScale) * phaseProgress; // calculate the scale based on the progress

  // Set the scale of the inner circle
  circle.style.transform = `scale(${scale})`;

  // Update the text based on the phase of the animation
  inhaleText.style.opacity = isPhase1 ? '1' : '0';
  exhaleText.style.opacity = isPhase1 ? '0' : '1';

  // Schedule the next frame of the animation
  requestAnimationFrame(animateCircle);
}

// Start the animation
animateCircle();

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
  { element: document.getElementById('quote1'), duration: 10000, audio: false },
  {
    element: document.getElementById('opdracht1'),
    duration: 10000,
    audio: false,
  },
  {
    element: document.getElementById('quote2'),
    duration: 20000,
    audio: false,
  },
  {
    element: document.getElementById('opdracht2'),
    duration: 10000,
    audio: false,
  },
  {
    element: document.getElementById('quote3'),
    duration: 20000,
    audio: false,
  },
  {
    element: document.getElementById('opdracht3'),
    duration: 10000,
    audio: false,
  },
  { element: document.getElementById('quote4'), duration: 20000, audio: true },
  {
    element: document.getElementById('opdracht4'),
    duration: 10000,
    audio: false,
  },
  {
    element: document.getElementById('quote5'),
    duration: 30000,
    audio: false,
  },
];

let huidigeOpdracht = 0;
const myAudio = new Audio('images/natuurgeluiden.mp3');

function speelOpdrachtenAf() {
  // Set display of all opdrachten to none
  for (let i = 0; i < loop.length; i++) {
    loop[i].element.style.display = 'none';
  }

  // Set display of current opdracht to block
  loop[huidigeOpdracht].element.style.display = 'block';

  if (huidigeOpdracht === 7) {
    // Play audio only if current opdracht is opdracht 4
    myAudio.autoplay = true;
    myAudio.loop = true;
    myAudio.play();
  } else {
    myAudio.pause();
  }

  huidigeOpdracht++;
  if (huidigeOpdracht >= loop.length) {
    huidigeOpdracht = 0;
  }

  // Set interval for the next opdracht
  setTimeout(speelOpdrachtenAf, loop[huidigeOpdracht].duration);
}

// Call the function to start the loop immediately
speelOpdrachtenAf();
