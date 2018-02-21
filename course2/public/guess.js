//console.log(wordsToGuess);

// guess the word module
let guessTheWord = function () {
	// "config" options
	const MAX_FAILS = 6;
	const BONUS_PER_LETTER = 5; // bitcoins
	const chosenWord = [];
	let isGameOver = false;
	
	
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
		//guessLetter();
		//wordToBeGuessed();
		fireEvent();
	};


	let wordToBeGuessed = function(letter){
		let wordToArray = [...chosenWord.toString()],
			guessedLetters = [],
			failAttemps = 0,
			formattedWord = [];


		let found = wordToArray.some(r=> letter.includes(r));

		console.log(letter, found);

		if(found){
			guessedLetters.push(letter);

			console.log(guessedLetters);

			wordToArray.map(function (value) {



				/*if(value == ','){
					formattedWord.push('-')
				}else if(value == letter){
					formattedWord.push(letter);
				}else{
					formattedWord.push('.');
				}*/
			});
		}else{
			failAttemps++;
		}

		return failAttemps, formattedWord;
	};


	let fireEvent = function(){
		let letter = [];
		$('#inputLetter').on('keyup', function(){
			letter.push($(this).val());

			console.log(wordToBeGuessed($(this).val()))

			$(this).val('');


		})
	}

	// will receive a letter as argument and will return the updated state
	let guessLetter = function () {
		// TODO implement this function
		
		let errMsgField = $("#errorMsg"),
			trigger = $('#guess'),
			wordToParse = chosenWord[0].toString(),
			lettersGuessed = [],
			failAttemp = 0,
			currentScore = 0,
			failLetters = [];

		$('#staticTries').val(MAX_FAILS);

		trigger.on('click', function () {
			let inputField = document.getElementById('inputLetter'),
				letterAttemp = inputField.value.toLowerCase();

			inputField.focus();
			inputField.value = '';
			
			if (isValidLetter(letterAttemp)[0].length >= 1) {
				let errMsg = isValidLetter(letterAttemp)[0].toString();
				errMsgField.html(errMsg);
			} else {
				let regex = new RegExp(letterAttemp, 'gi'),
					matches = wordToParse.match(regex),
					wordVariant = [],
					html = "";
				
				let checkAttemp = function (letter) {
					if (lettersGuessed.indexOf(letter) !== -1) {
						return 1;
					} else {
						return -1;
					}
				};

				if ((matches) !== null) {
					if (checkAttemp(letterAttemp) == -1) {
						lettersGuessed.push(letterAttemp);
						currentScore += matches.length;
						updateScore(currentScore);
					}
					
					let chosenWordToArray = [...wordToParse.toString()];
					
					lettersGuessed.push(letterAttemp);
					
					chosenWordToArray.map(function (value) {
						value = value.toLowerCase();
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

					if (wordVariant.indexOf('.') == -1) {
						gameOver(true);
					 }

					$("#wordToGuess").html(html);

				} else {

					if (failAttemp >= MAX_FAILS) {
						failLetters = [];
						$('#mainMsg').text('GAME OVER');
						gameOver(false);

					}else{
						failLetters.push(letterAttemp);
					}

					updateFailTriesCount(MAX_FAILS - (++failAttemp), failLetters);
				}
			}
		});
	};

	let gameOver = function(status){
		$('#staticScore').val('-')
		$('#staticTries').val(MAX_FAILS);

		isGameOver = false;

		if(!status){
			$('#mainMsg').text('Sorry, you loose!');
		}else{
			$('#mainMsg').text('Congrats, you win!');
		}

		let resetBtn = $('#guess');

		resetBtn
			.on('click', function(){
				$(this).text('Guess!');
				$('#mainMsg').text('Guess the word GAME!');
				$('#inputLetter').focus();
				placeTheWords();
				guessLetter();
			})
			.text('Reset the game')
	}

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
		init
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
