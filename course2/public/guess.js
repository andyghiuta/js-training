// guess the word module
let guessTheWord = function(){
  // "config" options
  const MAX_FAILS = 6;
  const BONUS_PER_LETTER = 5; // bitcoins
  // TODO declare an object for "word list"
  // TODO keep a reference for the currently selected word
  // TODO declare an object for the current state of the word
  // TODO declare a function that generates a random integer between two numbers

  
  // initialize the guessing game
  let init = function() {
    // TODO implement this function
    // reset game state
    // randomly pick a word from the word list
    // return the current state of the word
  };

  // will receive a letter as argument and will return the updated state
  let guessLetter = function() {
    // TODO implement this function
  };

  let isValidLetter = function() {
    // TODO implement this function
  };

  // return an object with the functions we want exposed
  return {
    init,
    guessLetter,
    isValidLetter
  };
};

// when the page is initialized, init the game and
$(document).ready(function(){

  // declare the game variable
  let game = guessTheWord();

  // initialize the game
  let initialWordState = game.init();

  // update the view with the initial word state
  updateWord(initialWordState);

  // update the fail tries count
  updateFailTriesCount(game.getLeftFailTries())

  startGame(game);
});
