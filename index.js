// define a range of number
// set the low and high
// get mid = low + ((high - low) / 2 )
// if yes end program
// if no ask higher or lower
// change the high , the new high = mid +1  OR!!!
// OR!!!  change the low , the new low = mid -1
// get a new mid
// if yes end program
// if no repeat line 6 or 7
const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);
function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

let numberRange = [];
let lowNumber;
let highNumber;
let midNumber = 0;
//let welcome = `Hello player! \nGuess a number between ${numberRange[0]} and ${numberRange[highNumber]}`;
let answerText = "I guess ";
let startText = "When ready press Y ";
let answerReply = "If correct press Y otherwise press N\n";
let startSignal = "Y";
let tryAgain = "N";
let celebration = "👍👍👍YAY I got it right!!🎉🎉🎉";
let secondGuess =
  "If your guess was higher press H and if it was lower press L\n";
let numOfSteps;
let secondSignal = "H";
let cheatDetector = [];
let factor;
let playerAnswer;
let counter = 0;
let player;

function celebrate() {
  if (cheatDetector.includes(midNumber)) {
    console.log("but that contradicts what you said earlier!");
    process.exit();
  }
  console.log(celebration);
  // number of steps for solution
  numOfSteps = `I guessed it in ${cheatDetector.length} steps.`;
  console.log(numOfSteps);
  process.exit();
}
async function higher() {
  //cheat range detector
  if (midNumber > highNumber) {
    console.log("but that contradicts what you said earlier!");
    process.exit();
  }
  //console.log(highNumber);
  //console.log(lowNumber);

  //  original equation
  //lowNumber = midNumber + 1;
  //test/////////
  lowNumber = midNumber;
  midNumber = Math.round((highNumber + lowNumber) / 2);
  ///////////////
  //midNumber = Math.round((highNumber - lowNumber) / 2 + (midNumber - 1));
  //console.log(answerText, midNumber);
}
async function lower() {
  //cheat range detector
  if (midNumber < lowNumber) {
    console.log("but that contradicts what you said earlier!");
    process.exit();
  }
  // original equation
  //highNumber = midNumber - 1;
  //test///////
  highNumber = midNumber;
  midNumber = Math.round((highNumber + lowNumber) / 2);
  //////////////
  //console.log(highNumber);
  //console.log(lowNumber);
  //midNumber = Math.round((highNumber - lowNumber) / 2 + lowNumber);
  //console.log(answerText, midNumber);
}

async function lowLimit() {
  let lowNumber = await ask(" what is your lower limit\n");
  return lowNumber;
}
async function highLimit() {
  let highNumber = await ask("what is your high limit\n");
  return highNumber;
}

////////////////////
//   GAME START   //
////////////////////

async function computerGuess() {
  //  Number range
  lowNumber = await lowLimit();
  lowNumber = +lowNumber;
  highNumber = await highLimit();
  highNumber = +highNumber;
  baseNumber = lowNumber;
  factor = lowNumber;
  //console.log("low num" +lowNumber);
  //console.log("high num"+highNumber);
  //console.log("bsde num"+baseNumber);

  while (factor <= highNumber) {
    numberRange.push(factor);
    factor++;
  }
  // array display for check
  //console.log(numberRange);
  midNumber = Math.round((highNumber - lowNumber) / 2 + lowNumber);

  // console.log(midNumber);

  //arrayLimts();
  console.log(
    `Hello player! \nGuess a number between ${numberRange[0]} and ${
      numberRange[numberRange.length - 1]
    }`
  );

  startSignal = await ask(startText);

  for (startSignal != "Y"; startSignal != "y"; ) {
    console.log("I'll be waiting\n");
    startSignal = await ask(startText);
  }
    /*
     Cheat detector adds answers(midNumber) to an array and if the new anser is in the array he cheats!!! 
    */
    for (startSignal === "Y"; startSignal === "y"; ) {
      console.log(answerText, midNumber);

      // console.log(cheatDetector);
      tryAgain = await ask(answerReply);

      
      if (tryAgain === "Y" || tryAgain === "y") {
        // console.log(cheatDetector);

        celebrate();
      } else if (tryAgain === "N" || tryAgain === "n") {
        if (cheatDetector.includes(midNumber)) {
          console.log("but that contradicts what you said earlier!");
          process.exit();
        }
        cheatDetector.push(midNumber);

        secondSignal = await ask(secondGuess);
        //put it while loop then a looping function3
        if (secondSignal === "H" || secondSignal === "h") {
          higher();
        }
        if (secondSignal === "L" || secondSignal === "l") {
          lower();
        }
      }
    }
  
}


// player guess
//1) player choose range
//2) comp choose number whithin the range
// 3) comp ask the player to guess
// 4) in coorect end if wrong tell h or l


//////////////////////
///// Game 2 Start////
//////////////////////
async function playerGuess() {
  lowNumber = await lowLimit();
  lowNumber = +lowNumber;
  highNumber = await highLimit();
  highNumber = +highNumber;
  factor = lowNumber;

 // console.log("low num" + lowNumber);
 // console.log("high num" + highNumber);

  while (factor <= highNumber) {
    numberRange.push(factor);
    factor++;
  }
  //console.log(numberRange);
  let guessNumber = Math.random(numberRange);
  //console.log(guessNumber);
  guessNumber = Math.round(guessNumber * 10);
  //console.log(guessNumber);
  guessNumber = numberRange[guessNumber];
  //console.log(guessNumber);

  playerAnswer = await ask(
    `I chose a number between ${lowNumber} and ${highNumber}, Try to guess it.\n`
  );
  if (isNaN(playerAnswer)) {
    playerAnswer = await ask("Guess again, But guess a NUMBER this time!\n");
  }
  while (playerAnswer != guessNumber) {
    console.log("Nope your guess was wrong!");

    if (playerAnswer < guessNumber) {
      counter++;
      playerAnswer = await ask("Guess again, But guess higher this time!\n");
      if (isNaN(playerAnswer)) {
        playerAnswer = await ask(
          "Guess again, But guess a NUMBER this time!\n"
        );
      }
    }

    if (playerAnswer > guessNumber) {
      counter++;
      playerAnswer = await ask("Guess again, But guess lower this time!\n");
      if (isNaN(playerAnswer)) {
        playerAnswer = await ask(
          "Guess again, But guess a NUMBER this time!\n"
        );
      }
    }
  }
  if (playerAnswer == guessNumber) {
    console.log(`Yay you got it the answer was ${guessNumber}\nyou got it in ${counter} steps.!!!!\n`);
    
  }
  process.exit();
}
async function choose(){
  player = await ask(`Choose a game mode:\nIf you want to guess press: P\n\nIf you want the computer to guess press: C\n`)
  console.log(player);
if (player == 'p' || player == 'P'){
  playerGuess();
}
else if (player=='c'|| player == 'C'){
  computerGuess();
}
} 
choose();
