// import Swiper bundle with all modules installed
import Swiper, { Autoplay, EffectFade } from 'swiper';
// import styles bundle
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

const meterContainer = document.querySelector('.meter-container');
const meter = document.querySelector('.meter');
let analyser = null;

navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then((stream) => {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.fftSize = 2048;
    // Call the function to start the loop immediately
    console.log('start micro');
    speelOpdrachtenAf();
  })
  .catch((err) => console.error(err));

/*
// Startscherm */
let startschermIsVisible = false;
function startscherm() {
  startschermIsVisible = true;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  const maxVolume = 255;

  const updateMeter = () => {
    analyser.getByteFrequencyData(dataArray);
    const volume = dataArray.reduce((a, b) => a + b) / bufferLength;
    const volumePercent = volume / maxVolume;
    meterContainer.style.height = `${volumePercent * 400}px`;
    meterContainer.style.top = `${400 - volumePercent * 400}px`;
    meter.style.top = `-${400 - volumePercent * 400}px`;

    if (startschermIsVisible) {
      if (volumePercent > 0.4) {
        console.log(volumePercent);
        startschermIsVisible = false;
        console.log('go!!!');
        speelOpdrachtenAf();
      }
      requestAnimationFrame(updateMeter);
    }
  };

  updateMeter();
}

/*
// Opdracht 1: lachen maakt gelukkig. */
function opdracht1func() {
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

  // Toon de eerste opdracht en verwijder het H1 element
  document.querySelector('h1').style.display = 'none';

  // Start de loop en wacht 5 seconden tussen elke opdracht
  runLoop();
  loopInterval = setInterval(runLoop, 5000);

  setTimeout(function () {
    clearInterval(loopInterval);
  }, loop[2].duration);
}

/* 
// Opdracht 2: bewegen maakt gelukkig. */
function opdracht2func() {
  const video = document.querySelector('video');
  video.currentTime = 0;
  video.play();
}

/*
// Opdracht 3: meditatie maakt gelukkig. */
// Get the HTML elements for the circle
function opdracht3func() {
  const circle = document.getElementById('circle');

  // Define a function to animate the circle
  function animateCircle() {
    // Calculate the scale of the inner circle based on the phase of the animation
    const maxScale = 2.5;
    const minScale = 2.0;
    const isPhase1 = Date.now() % 8000 < 3000; // inhale phase lasts for 4 seconds
    const phaseProgress = isPhase1
      ? (Date.now() % 4000) / 4000
      : (4000 - (Date.now() % 4000)) / 4000; // calculate the progress of the phase
    const scale = minScale + (maxScale - minScale) * phaseProgress; // calculate the scale based on the progress

    // Set the scale of the inner circle
    circle.style.transform = `scale(${scale})`;

    // Schedule the next frame of the animation
    if (huidigeOpdracht == 5) {
      requestAnimationFrame(animateCircle);
    }
  }

  Audio5.currentTime = 0;
  Audio5.autoplay = true;
  Audio5.loop = true;
  Audio5.play();

  // Start the animation
  animateCircle();
}

/* 
// Opdracht 4: natuur maakt gelukkig. */

// init Swiper:
let opdracht4swiper = null;
function opdracht4func() {
  opdracht4swiper = new Swiper('.swiper', {
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

  myAudio.currentTime = 0;
  myAudio.autoplay = true;
  myAudio.loop = true;
  myAudio.play();

  setTimeout(function () {
    opdracht4swiper.destroy();
  }, loop[8].duration);
}

/* loop */
const loop = [
  {
    element: document.getElementById('startscherm'),
    duration: null,
    audio: false,
    func: startscherm,
  },
  {
    element: document.getElementById('quote1'),
    duration: 10000,
    audio: false,
    func: null,
  },
  {
    element: document.getElementById('opdracht1'),
    duration: 23000,
    audio: false,
    func: opdracht1func,
  },
  {
    element: document.getElementById('quote2'),
    duration: 10000,
    audio: false,
    func: null,
  },
  {
    element: document.getElementById('opdracht2'),
    duration: 183000,
    audio: false,
    func: opdracht2func,
  },
  {
    element: document.getElementById('quote3'),
    duration: 10000,
    audio: false,
    func: null,
  },
  {
    element: document.getElementById('opdracht3'),
    duration: 60000,
    audio: false,
    func: opdracht3func,
  },
  {
    element: document.getElementById('quote4'),
    duration: 10000,
    audio: true,
    func: null,
  },
  {
    element: document.getElementById('opdracht4'),
    duration: 60000,
    audio: false,
    func: opdracht4func,
  },
  {
    element: document.getElementById('quote5'),
    duration: 10000,
    audio: false,
    func: null,
  },
  {
    element: document.getElementById('loading'),
    duration: 18000,
    audio: false,
    func: null,
  },
];

let huidigeOpdracht = loop.length;
const myAudio = new Audio('images/natuurgeluiden.mp3');
const Audio5 = new Audio('images/meditatie.mp3');
let myTimeout = null;
function speelOpdrachtenAf() {
  huidigeOpdracht++;
  if (huidigeOpdracht >= loop.length) {
    huidigeOpdracht = 0;
  }

  // pause audio
  myAudio.pause();
  Audio5.pause();

  // Set display of all opdrachten to none
  for (let i = 0; i < loop.length; i++) {
    loop[i].element.style.display = 'none';
  }

  // Set display of current opdracht to block
  loop[huidigeOpdracht].element.style.display = 'block';
  console.log(huidigeOpdracht);
  // Play function
  if (loop[huidigeOpdracht].func) {
    loop[huidigeOpdracht].func();
  }

  // Set interval for the next opdracht$
  if (myTimeout) clearTimeout(myTimeout);
  if (loop[huidigeOpdracht].duration) {
    myTimeout = setTimeout(speelOpdrachtenAf, loop[huidigeOpdracht].duration);
  }
}
