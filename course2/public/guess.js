// guess the word module
let guessTheWord = function(){
  // "config" options
  const MAX_TRIES = 6;
  const BONUS_PER_LETTER = 5; // bitcoins
  // declare an object for "word list"
  // keep a reference for the currently selected word
  // declare an object for the current state of the word

  // declare a function that generates a random integer between two numbers
  
  // initialize the guessing game
  let init = function() {
    // reset game state
    // randomly pick a word from the word list
    // return the number of letters in the word
  };

  // will receive a letter as argument and will return the updated state
  let guessLetter = function() {

  };

  let isValidLetter = function() {

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
    word.forEach((letter) => {
      wordLetters += `<span class="badge badge-secondary">${letter}</span>\n`;
    });
    $('#word').html(wordLetters);
  }

  // update the view with the initial word state
  updateWord(initialWordState);

  // update score function
  let updateScore = function(newScore){
      $('#staticScore').val(newScore);
  };

  // guess button click handler
  $('#guess').click(function(){
    let guessedLetter = $('#inputLetter').val();
    // check the input of the letter
    if (game.isValidLetter(guessedLetter)) {
      // guess letter
      // update the view with the new word state
      // update the score
    } else {
      $('#inputLetter').popover({
        trigger: 'manual',
        content: 'The input is not a valid letter'
      }).popover('show');
      setTimeout(() => {
        $('#inputLetter').popover('hide');
      }, 5000);
    }
  });

});
