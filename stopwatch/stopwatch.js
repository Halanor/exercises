// var output = document.querySelector('h1');
// var isPaused = true;
// var time = 0;
// var t = setInterval(function() {
//       if (!isPaused) {
//         time++;
//         output.innerText =  time + 'sec';
//         }
//       }, 1000);

// function play() {
//   isPaused = false;
// }

// function pause() {
//   isPaused = true;
// }

// setInterval(function() {
//         console.log('interval');
//       }, 1000);


var outputSeconds = document.querySelector('.js-seconds');
var outputMinutes = document.querySelector('.js-minutes');
var outputHours = document.querySelector('.js-hours');
var outputMiliseconds = document.querySelector('.js-miliseconds');
var isPaused = true;
var miliseconds = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
var timeSeconds = setInterval(function() {

  if (!isPaused && miliseconds < 9) {
    miliseconds++;
    outputMiliseconds.innerText = miliseconds;
  } else if (!isPaused && miliseconds === 9) {
      if (seconds < 59) {
          miliseconds = 0;
          seconds++;
          outputSeconds.innerText = seconds;
        } else if (!isPaused && seconds === 59) {
          if (minutes < 59) {
            miliseconds = 0;
            outputMiliseconds.innerText = miliseconds;
            seconds = 0;
            outputSeconds.innerText = seconds;
            minutes++;
            outputMinutes.innerText = minutes;
          } else if (!isPaused && minutes === 59) {
            miliseconds = 0;
            outputMiliseconds.innerText = miliseconds;
            seconds = 0;
            outputSeconds.innerText = seconds;
            minutes = 0;
            outputMinutes.innerText = minutes;
            hours++;
            outputHours.innerText = hours;
          }
      } 
  }
}, 100);



document.querySelector('.js-start-button').addEventListener('click', () => {play()});

document.querySelector('.js-pause-button').addEventListener
('click', () => {pause()});

document.querySelector('.js-reset-button').addEventListener
('click', () => {reset()});

document.querySelector('.js-lap-button').addEventListener('click', () => {save()});

function play() {
  isPaused = false;
}

function pause() {
  isPaused = true;
}

function reset() {
  isPaused = true;
  miliseconds = '00';
  seconds = 0;
  minutes = 0;
  hours = 0;
  outputMiliseconds.innerText = miliseconds;
  outputSeconds.innerText = seconds;
  outputMinutes.innerText = minutes;
  outputHours.innerText = hours;
}

const savedTimes = [];
console.log(typeof savedTimes);

renderSavedTimes();

function renderSavedTimes() {
  let savedTimesHTML = '';

  savedTimes.forEach((timeObject, index) => {
    const { hours, minutes, seconds, miliseconds } = timeObject;
    const html = `
      <div class="added-time">
        ${hours}:${minutes}:${seconds}:${miliseconds}
        <button class="js-delete-button">
          Delete
        </button>
      </div>
    `;
    savedTimesHTML += html;
  });

 
  document.querySelector('.js-saved-time').innerHTML = savedTimesHTML;

  document.querySelectorAll('.js-delete-button')
  .forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      savedTimes.splice(index, 1);
      renderSavedTimes();
    });
  });
}


function save() {
  const miliseconds = document.querySelector('.js-miliseconds').innerText;
  const seconds = document.querySelector('.js-seconds').innerText;
  const minutes = document.querySelector('.js-minutes').innerText;
  const hours = document.querySelector('.js-hours').innerText;

  savedTimes.push({hours, minutes, seconds, miliseconds});

  renderSavedTimes();
}
