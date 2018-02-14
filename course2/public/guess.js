//console.log(wordsToGuess);

// guess the word module
let guessTheWord = function () {
	// "config" options
	const MAX_FAILS = 6;
	const BONUS_PER_LETTER = 5; // bitcoins
	// TODO declare an object for "word list"
	// TODO keep a reference for the currently selected word
	// TODO declare an object for the current state of the word
	// TODO declare a function that generates a random integer between two numbers
	
	
	let getRandomWords = function(){
		// randomly pick a word from the word list
		let getCategory = function(){
			let randomCategory = Math.floor(Math.random() * Object.keys(wordsToGuess).length),
				selectedCategory = Object.values(wordsToGuess)[randomCategory],
				randomWord = Math.floor(Math.random() * Object.values(Object.values(wordsToGuess)[randomCategory])[0].length);
				
			console.log(Object.values(Object.values(wordsToGuess)[randomCategory])[0][randomWord]);
			
			console.log()
			
		}
		
		console.log(getCategory());
	}
	
	// initialize the guessing game
	let init = function () {
		
		// TODO implement this function
		// reset game state
		
		// return the current state of the word
		
		getRandomWords();
	};
	
	// will receive a letter as argument and will return the updated state
	let guessLetter = function () {
		// TODO implement this function
	};
	
	let isValidLetter = function () {
		// TODO implement this function
		let letter = document.getElementById('inputLetter').value();
		console.log(letter);
		
	};
	
	// return an object with the functions we want exposed
	return {
		init/*,
		guessLetter,
		isValidLetter*/
	};
};

$(document).ready(function(){
	let game = guessTheWord();
	game.init();
})

// when the page is initialized, init the game and
/*
$(document).ready(function () {
	
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
*/
