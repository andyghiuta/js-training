//console.log(wordsToGuess);

// guess the word module
let guessTheWord = function () {
	// "config" options
	const MAX_FAILS = 6;
	const BONUS_PER_LETTER = 5; // bitcoins
	const chosenWord = [];
	
	
	// TODO declare an object for "word list"
	// TODO keep a reference for the currently selected word
	// TODO declare an object for the current state of the word
	// TODO declare a function that generates a random integer between two numbers
	
	
	let getRandomWords = function () {
		// randomly pick a word from the word list
		
		let randomCategoryKey = Math.floor(Math.random() * Object.keys(wordsToGuess).length), //get a random key between 0 and object length
			randomWordKey = Math.floor(Math.random() * Object.values(Object.values(wordsToGuess)[randomCategoryKey])[0].length), //get a random key between 0 and the length of words array from the category
			randomCategory = Object.keys(Object.values(wordsToGuess)[randomCategoryKey]).join(''), //get the category name which was choosed randomly
			randomWord = Object.values(Object.values(wordsToGuess)[randomCategoryKey])[0][randomWordKey].split(' '); //get the word from that cathegory which was choosed randomly
		
		return [randomCategory, randomWord];
	};
	
	let placeTheWords = function () {
		let categoryTag = document.getElementById('categoryOffer'),
			wordTag = document.getElementById('wordToGuess'),
			[categoryName, wordToGuess] = getRandomWords(),
			getTheWordArray = '',
			wordHtml = '';
		
		categoryTag.innerHTML = categoryName;
		
		let splitToarray = function (stringToSplit) {
			getTheWordArray = [...stringToSplit.toString()];
			return getTheWordArray;
		}
		
		splitToarray(wordToGuess).map(function (value, index) {
			if (value !== ",") {
				wordHtml += `<span>.</span>`;
			} else {
				wordHtml += '<span class="separator">-</span>';
			}
		});
		
		wordTag.innerHTML = wordHtml;
		
		//Keep it globally for other functions
		chosenWord.push(wordToGuess);
	};
	
	// initialize the guessing game
	let init = function () {
		
		// TODO implement this function
		// reset game state
		
		// return the current state of the word
		placeTheWords();
		guessLetter();
	};
	
	// will receive a letter as argument and will return the updated state
	let guessLetter = function () {
		// TODO implement this function
		
		let errMsgField = $("#errorMsg"),
			trigger = $('#guess'),
			wordToParse = chosenWord[0].toString(),
			lettersGuessed = [],
			failAttemp = 1,
			currentScore = 0,
			failLetters = [];
		
		trigger.on('click', function () {
			let inputField = document.getElementById('inputLetter'),
				letterAttemp = inputField.value;
			inputField.focus();
			inputField.value = '';
			
			
			if (isValidLetter(letterAttemp)[0].length >= 1) {
				let errMsg = isValidLetter(letterAttemp)[0].toString();
				errMsgField.html(errMsg);
			} else {
				let regex = new RegExp(letterAttemp, 'gi'),
					matches = chosenWord[0].toString().match(regex),
					wordVariant = [],
					html = "";
				
				//console.log(wordVariant);
				

				/*if(wordVariant.indexOf(letterAttemp) != -1){
					console.log(letterAttemp);
					showPopover('#errorMsg', `You already intered the letter ${letterAttemp} once`)
				}*/
				
				if ((matches) !== null) {
					currentScore += matches.length;
					updateScore(currentScore);
					
					let chosenWordToArray = [...chosenWord[0].toString()];
					
					lettersGuessed.push(letterAttemp);
					
					chosenWordToArray.map(function (value) {
						if (lettersGuessed.indexOf(value) != -1) {
							wordVariant.push(value);
						} else if (value !== ',') {
							wordVariant.push('.')
						} else {
							wordVariant.push(',')
						}
					});
					
					$.each(wordVariant, function (index, value) {
						if(value!== ",") {
							html += `<span>${value}</span>`;
						}else{
							html += `<span class="separator">-</span>`
						}
					});
					
					$("#wordToGuess").html(html);
				} else {
					failLetters.push(letterAttemp);
					updateFailTriesCount(failAttemp++, failLetters);
				}
			}
		});
	};
	
	let isValidLetter = function (letter) {
		// TODO implement this function
		let errCount = 0,
			errMsg = [];
		
		if (letter == '') {
			errCount += 1;
			errMsg.push('You have to provide a letter first');
		} else if (!isNaN(letter)) {
			errCount += 1;
			errMsg.push('Only letters are allowed');
		}
		
		return [errMsg, errCount];
	};
	
	// return an object with the functions we want exposed
	return {
		init/*,
		guessLetter,
		isValidLetter*/
	};
};

$(document).ready(function () {
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
