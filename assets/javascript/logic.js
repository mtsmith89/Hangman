// GLOBAL VARIABLES

var letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];

var main = $("body");

var btns = main.find("#buttons");

var wordsList = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces"
];

var chosenWord = "";

var lettersInChosenWord = [];

var numBlanks = 0;

var blanksAndSuccesses = [];

var wrongGuesses = [];

var letterGuessed = "";

var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;

for (var i = 0; i < letters.length; i++) {
  var letterBtn = $("<button>");

  letterBtn.addClass("letter-button letter");

  letterBtn.attr("data-letter", letters[i]);

  letterBtn.text(letters[i]);

  btns.append(letterBtn);
}

// FUNCTIONS

function startGame() {
  numGuesses = 9;

  chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];

  lettersInChosenWord = chosenWord.split("");

  numBlanks = lettersInChosenWord.length;

  console.log(chosenWord);

  blanksAndSuccesses = [];

  wrongGuesses = [];

  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }

  console.log(blanksAndSuccesses);

  document.getElementById("guesses-left").innerHTML = numGuesses;

  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(
    " "
  );

  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function checkLetters(letter) {
  var letterInWord = false;

  for (var i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  }

  if (letterInWord) {
    for (var j = 0; j < numBlanks; j++) {
      if (chosenWord[j] === letter) {
        blanksAndSuccesses[j] = letter;
      }
    }

    console.log(blanksAndSuccesses);
  } else if (wrongGuesses.includes(letter) === true) {
    alert("You've already guessed that letter!");
    return;
  } if (letters.includes(letterGuessed) === false) {
    return;
  } else {
    wrongGuesses.push(letter);

    numGuesses--;
  }
}

function roundComplete() {
  console.log(
    "WinCount: " +
      winCounter +
      " | LossCount: " +
      lossCounter +
      " | NumGuesses: " +
      numGuesses
  );

  // HTML UPDATES

  document.getElementById("guesses-left").innerHTML = numGuesses;

  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(
    " "
  );

  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

  if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
    winCounter++;

    alert("You win! The word was " + chosenWord + "!");

    document.getElementById("win-counter").innerHTML = winCounter;

    startGame();
  } else if (numGuesses === 0) {
    lossCounter++;

    alert("You lose");

    document.getElementById("loss-counter").innerHTML = lossCounter;

    startGame();
  }
}

// MAIN PROCESS

startGame();

document.onkeyup = function(event) {
  letterGuessed = String.fromCharCode(event.which).toLowerCase();
  checkLetters(letterGuessed);
  roundComplete();
};

btns.on("click", ".letter-button", function() {
  letterGuessed = $(this)
    .attr("data-letter")
    .toLowerCase();
  checkLetters(letterGuessed);
  roundComplete();
});
