// Boilerplate readline code
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// Setting up global variables
let guessCount = 0;
let min = 1;
let max = 0;

// Initialize
async function start() {
  console.log(
    `Let's play a game where you (human) choose a number between 1 and X. 
    You choose X and then choose a number in that range. Let's begin.`
  );
  let high = await ask("Choose a number for 'X': ");
  max = parseInt(high);
  let secretNumber = await ask("Pick a number between 1-" + max + ": ");
  console.log("Your secret number is: " + secretNumber);
  guess();
}

// Recursive guess function
async function guess() {
  guessCount++;

  let midGuess = Math.floor((max + min) / 2);

  console.log("My guess is: " + midGuess);

  let nailedIt = await ask("Is this correct? (y/n): ");
  if (nailedIt === "y") {
    console.log("You nailed it! It took you " + guessCount + " guess(es).");
    process.exit();
  } else if (nailedIt === "n") {
    let highLow = await ask("Is it higher or lower? (h/l): ");
    if (highLow === "h") {
      min = midGuess + 1;
      guess();
    } else if (highLow === "l") {
      max = midGuess - 1;
      guess();
    }
  }
}

// Call the Start function to get the program rolling
start();
