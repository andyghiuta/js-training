// guess the word module
let guessTheWord = function(){
  // "config" options
  const MAX_TRIES = 6;
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

  let updateWord = function(word){
    let wordLetters = '';
    word.split('').forEach((letter) => {
      wordLetters += `<span class="badge badge-secondary">${letter}</span>\n`;
    });
    $('#word').html(wordLetters);
  };

  // update the view with the initial word state
  updateWord(initialWordState);

  // function to update score function
  let updateScore = function(newScore){
      $('#staticScore').val(newScore);
  };


  let showPopover = function($element, message) {
    $element.popover({
      trigger: 'manual',
      content: message
    }).popover('show');
    setTimeout(() => {
      $element.popover('hide');
    }, 5000);
  };

  // guess button click handler
  $('#guess').click(function(){
    let guessedLetter = $('#inputLetter').val();
    // check the input of the letter
    if (game.isValidLetter(guessedLetter)) {
      // TODO guess letter
      // TODO update the view with the new word state
      // TODO update the score
      let wordIsGuessed = false; // TODO check if the word is guessed
      let gameIsOver = false; // TODO check if the game is over
      if (wordIsGuessed) {

      } else if (gameIsOver) {

      }
    } else {
      showPopover($('#inputLetter'), 'The input is not a valid letter');
    }
    $('#inputLetter').focus();
  });

});
