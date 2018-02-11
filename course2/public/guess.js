// guess the word module
let guessTheWord = function(){
  // "config" options
  const MAX_TRIES = 6;
  const BONUS_PER_LETTER = 5; // bitcoins

  // declare an object for "word list"
  // keep a reference for the currently selected word
  // declare an object for the current state of the word

  // initialize the guessing game
  let init = function() {
    // reset game state
    // randomly pick a word from the word list
    // return the number of letters in the word
  };

  // will receive a letter as argument and will return if the letter exists or not in the word
  let guessLetter = function() {

  };

  // return an object with the functions we want exposed
  return {
    init,
    guessLetter
  };
};

// when the page is initialized, init the game and
$(document).ready(function(){
  // declare the game variable

  // initialize the game

  let word = Array(5); // replace 5 by the letter count returned from the game initialize
  word.fill('<span class="badge badge-secondary">_</span>');
  $('#word').html(word.join('\n'));
});
