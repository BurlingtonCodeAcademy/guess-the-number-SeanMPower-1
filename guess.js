const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

let guessCount = 0;
let min = 1;
let max = 100;


start();

async function start() {
  console.log("Let's play a game where you (human) choose a number (1-100) and I (computer) try to guess it.")
  let secretNumber = await ask("Pick a number between 1-100: ")
  console.log('Your secret number is: ' + secretNumber);
  // Now try and complete the program.
  guess();
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

async function guess() {
  guessCount++;
  
  let randomGuess = randomNum(min, max);
  
  console.log('My guess is: ' + randomGuess);
  
  let nailedIt = await ask('Is this correct? (y/n): ');
    if (nailedIt === 'y') {
      console.log('You nailed it! It took you ' + guessCount + ' guess(es).');
      process.exit();
    } else if (nailedIt === 'n') {
      let highLow = await ask('Is it higher or lower? (h/l): ');
      if (highLow === 'h') {
        min = randomGuess + 1;
        guess();
      } else if (highLow === 'l') {
        max = randomGuess -1;
        guess();
      }
    }
}