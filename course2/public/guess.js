// guess the word module
let guessTheWord = function () {
	// "config" options
	const MAX_FAILS = 6;
	const BONUS_PER_LETTER = 5; // bitcoins
	let chosenWord = [];
	
	
	let updateFailTriesCount = function (fails, letters) {
		$('#staticTries').val(fails);
		$('#letterAttemps').val(letters);
	};
	
	
	let getRandomWords = function () {
		// randomly pick a word from the word list
		
		let randomCategoryKey = Math.floor(Math.random() * Object.keys(wordsToGuess).length), //get a random key between 0 and object length
			randomWordKey = Math.floor(Math.random() * Object.values(Object.values(wordsToGuess)[randomCategoryKey])[0].length), //get a random key between 0 and the length of words array from the category
			randomCategory = Object.keys(Object.values(wordsToGuess)[randomCategoryKey]).join(''), //get the category name which was choosed randomly
			randomWord = Object.values(Object.values(wordsToGuess)[randomCategoryKey])[0][randomWordKey].split(' '); //get the word from that cathegory which was choosed randomly
		chosenWord = [randomWord[0]];
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
	};
	
	let gameOver = function(status){
		
		$("#inputLetter").attr('readOnly', 'readOnly');
		switch (status){
			case true:
				$('#mainMsg').text('Congrats, you win!');
				break;
			case false:
				$('#mainMsg').text('You loose! Try again');
				break;
		}
		
		$('#gameReset').on('click', function(){
			location.reload();
		});
	}
	
	let guessMe = function(letter){
		let regex = new RegExp(letter, 'gi'),
			matches = chosenWord.toString().match(regex);
		
		return matches ? matches.length : 0;
	}
	
	let updateGuessingWord = function(letters){
		
		let wordToBeGuessed = [...chosenWord.toString()],
			finalWord = [];
		
		wordToBeGuessed.map(function(value){
			value = value.toLowerCase();
			if(letters.indexOf(value) !== -1){
				finalWord.push(value)
			}else if(value == ','){
				finalWord.push('-')
			}else{
				finalWord.push('.')
			}
		});
		
		if(finalWord.indexOf('.') == -1){
			gameOver(true);
		}
		
		return finalWord;
	}
	
	let markupUpdate = function(content){
		let html = '';
		
		content.map(function(value){
			if(value == '-'){
				html += `<span class="separator">-</span>`;
			}else if(value !== '.'){
				html += `<span>${value}</span>`
			}else{
				html += `<span>.</span>`
			}
		});
		
		$('#wordToGuess').html(html);
	}
	
	let isValidLetter = function (letter) {
		let errCount = 0,
			errMsg = [],
			validLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		
		if (letter == '') {
			errCount += 1;
			errMsg.push('You have to provide a letter first');
		}else if(validLetters.indexOf(letter) == -1){
			errCount += 1;
			errMsg.push('Only letters are allowed');
		}
		return [errMsg, errCount];
	};
	
	let guessLetter = function(){
		
		let guessedLetters = [],
			failAttemps = [],
			foundedLetters,
			bonus = 0;
		
		$('#staticTries').val(MAX_FAILS);
		
		$("#inputLetter").on('keyup', function(){
			
			let currentLetter = "";
			$('#errorMsg').text('');
			
			/*When typing fast - sometimes an empty value kiks in*/
			if($(this).val() !== ""){
				currentLetter = $(this).val();
			}
			
			if(isValidLetter(currentLetter)[0].length > 0) {
				$('#errorMsg').text(isValidLetter(currentLetter)[0].toString());
				$(this).val('')
				return;
			}else {
				
				let match = guessMe(currentLetter);
				
				if (match > 0) {
					if (guessedLetters.indexOf(currentLetter) == -1) {
						guessedLetters.push(currentLetter);
						foundedLetters = updateGuessingWord(guessedLetters);
						bonus += (match * BONUS_PER_LETTER);
						$('#errorMsg').text('');
					} else {
						$('#errorMsg').text('You already entered that letter')
					}
				} else{
					if (failAttemps.indexOf(currentLetter) != -1){
						$('#errorMsg').text('You already entered that letter')
					}else{
						failAttemps.push(currentLetter);
						$('#errorMsg').text('');
					}
				}
				
				if (foundedLetters !== undefined) {
					markupUpdate(foundedLetters);
				}
				
				if (failAttemps.length >= MAX_FAILS) {
					updateFailTriesCount(MAX_FAILS - failAttemps.length);
					gameOver(false);
				} else {
					updateFailTriesCount(MAX_FAILS - failAttemps.length);
					$('#letterAttemps').val(failAttemps);
				}
			}
			
			$('#staticScore').val(bonus);
			$(this).val('')
		})
	}
	
	
	// initialize the guessing game
	let init = function () {
		placeTheWords();
		guessLetter();
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
