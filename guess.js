// Boilerplate readline code ///////////////////////////////////////////////////////
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// Setting up global variables /////////////////////////////////////////////////////
let guessCount = 0;
let min = 1;
let max = 0;
let randomMax = Math.floor(Math.random() *200);
let randomNum = Math.floor(Math.random() * randomMax);

// Initialize //////////////////////////////////////////////////////////////////////
async function start() {
  console.log(
    "\nWelcome! Let us play some number guessing games! \n\nEnter 1 if you want to guess first. \n\nEnter 2 if you want me to guess first."
  );
  let selectGame = await ask(`\n(1 or 2?): `);

  if (selectGame === "1") {
    guessCount = 0;

    console.log(
      `\nSplendid! I've chosen a random number between 1 and ${randomMax}`
    );

    humanGuess();
  } else if (selectGame === "2") {
    guessCount = 0;
    console.log(
      `\nFirst set the top of the range, (1 - X).\nYou choose X and then choose a number in that range. Let's begin.`
    );
    let topOfRange = await ask("\nChoose a number for 'X': ");
    max = parseInt(topOfRange);
    let secretNumber = await ask("\nPick a number between 1-" + max + ": ");
    console.log("\nYour secret number is: " + secretNumber);
    compGuess();
  } else {
    console.log(`\nThat was not a valid selection! Try again!`);
    start();
  }
}

// Recursive CPU guess function /////////////////////////////////////////////////////
async function compGuess() {
  guessCount++;

  let midGuess = Math.floor((max + min) / 2);

  console.log("\nMy guess is: " + midGuess);

  let nailedIt = await ask("\nIs this correct? (y/n): ");
  if (nailedIt === "y") {
    let playAgain = await ask(
      `\nYou nailed it! It took you ${guessCount} guess(es).\n\nWould you like to play another game? (y/n): `
    );
    if (playAgain === "y") {
      start();
    } else if (playAgain === "n") {
      process.exit();
    }
  } else if (nailedIt === "n") {
    let highLow = await ask("\nIs it higher or lower? (h/l): ");
    if (highLow === "h") {
      if (midGuess >= max) {
        console.log(
          `\nYou dirty rotten scoundrel! You said it was lower than ${
            max + 1
          }! It can't also be higher than ${midGuess}! I'm outta here.`
        );
        process.exit();
      } else {
        min = midGuess + 1;
        compGuess();
      }
    } else if (highLow === "l") {
      if (midGuess <= min) {
        console.log(
          `\nYou dirty rotten scoundrel! You said it was higher than ${
            min - 1
          }! It can't also be lower than ${midGuess}! I'm outta here.`
        );
        process.exit();
      } else {
        max = midGuess - 1;
        compGuess();
      }
    }
  }
}

// Human guess function///////////////////////////////////////////////////////////
async function humanGuess() {
  guessCount++;

  let numHuman = await ask(`\nWhat is your guess?: `);

  if (parseInt(numHuman) === randomNum) {
    let playAgain = await ask(
      `\nAmazing! You nailed it! It only took you ${guessCount} guesses!\n\nWould you like to play another game? (y/n): `
    );
    if (playAgain === "y") {
      randomMax = Math.floor(Math.random()) * 200;
      randomNum = Math.floor(Math.random()) * randomMax;
      start();
    } else if (playAgain === "n") {
      process.exit();
    }
  } else if (numHuman > randomNum) {
    console.log(`\nThat's not it! It's lower! Try again.`);
    humanGuess();
  } else if (numHuman < randomNum) {
    console.log(`\nThat's not it! It's higher! Try again.`);
    humanGuess();
  }
}

// Call the Start function to get the program rolling
start();
