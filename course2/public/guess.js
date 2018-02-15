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
		
		let randomCategoryKey   = Math.floor(Math.random() * Object.keys(wordsToGuess).length), //get a random key between 0 and object length
			randomWordKey       = Math.floor(Math.random() * Object.values(Object.values(wordsToGuess)[randomCategoryKey])[0].length), //get a random key between 0 and the length of words array from the category
			randomCategory      = Object.keys(Object.values(wordsToGuess)[randomCategoryKey]).join(''), //get the category name which was choosed randomly
			randomWord          = Object.values(Object.values(wordsToGuess)[randomCategoryKey])[0][randomWordKey].split(' '); //get the word from that cathegory which was choosed randomly
		
		return [randomCategory, randomWord];
	};
	
	let placeTheWords = function(){
		let categoryTag = document.getElementById('categoryOffer'),
			wordTag = document.getElementById('wordToGuess'),
			[categoryName, wordToGuess] = getRandomWords(),
			getTheWordArray = '';
		
		categoryTag.innerHTML = categoryName;
		
		let splitToarray = function(stringToSplit){
			[...getTheWordArray] = stringToSplit.toString();
			return getTheWordArray;
		}
		
		var wordHtml = "";
		
		splitToarray(wordToGuess).map(function(value, index){
			if(value !== ","){
				wordHtml+=`<span>${value}</span>`;
			}else{
				wordHtml+='<span class="separator">-</span>';
			}
		});
		
		wordTag.innerHTML = wordHtml;
	};
	
	// initialize the guessing game
	let init = function () {
		
		// TODO implement this function
		// reset game state
		
		// return the current state of the word
		
		placeTheWords();
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
