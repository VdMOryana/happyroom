/*
// Opdracht 1: lachen maakt gelukkig. */
const opdracht1 = [
  'Listen and repeat',
  'Ha',
  'Ha-Ha',
  'Ha-Ha-Ha',
  'Ha-Ha-Ha-Ha',
];
let index = 0;
const opdrachtenElement = document.getElementById('opdrachten');
let loopInterval;

function runLoop() {
  const currentOpdracht = opdracht1[index];
  opdrachtenElement.innerHTML = currentOpdracht;
  // Speel de tekst af met de SpeechSynthesis API
  const message = new SpeechSynthesisUtterance(currentOpdracht);
  message.rate = 0.8;
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
  loopInterval = setInterval(runLoop, 5000);

  // Stop de loop na 20 seconden
  setTimeout(function () {
    clearInterval(loopInterval);
  }, 18000);
}, 10000);

/* 
// Opdracht 2: bewegen maakt gelukkig. */

const video = document.querySelector('video');
video.addEventListener('ended', function () {
  video.currentTime = 0;
  video.play();
});

/*
// Opdracht 3: meditatie maakt gelukkig. */
// Get the HTML elements for the circle
const circle = document.getElementById('circle');

// Define a function to animate the circle
function animateCircle() {
  // Calculate the scale of the inner circle based on the phase of the animation
  const maxScale = 1.5;
  const minScale = 1.0;
  const isPhase1 = Date.now() % 8000 < 3000; // inhale phase lasts for 4 seconds
  const phaseProgress = isPhase1
    ? (Date.now() % 4000) / 4000
    : (4000 - (Date.now() % 4000)) / 4000; // calculate the progress of the phase
  const scale = minScale + (maxScale - minScale) * phaseProgress; // calculate the scale based on the progress

  // Set the scale of the inner circle
  circle.style.transform = `scale(${scale})`;

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

/* loop 
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
    audio: true,
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
    duration: 40000,
    audio: false,
  },
  {
    element: document.getElementById('loading'),
    duration: 10000,
    audio: false,
  },
];

let huidigeOpdracht = 0;
const myAudio = new Audio('images/natuurgeluiden.mp3');
const Audio5 = new Audio('images/meditatie.mp3');

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
  } else if (huidigeOpdracht === 5) {
    Audio5.autoplay = true;
    Audio5.loop = true;
    Audio5.play();
  } else {
    myAudio.pause();
    Audio5.pause();
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
*/
