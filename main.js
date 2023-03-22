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
