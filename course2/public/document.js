// this file holds functions used for manipulating document objects (input, button, etc)

// function to update a word
let updateWord = function (word) {
	let wordLetters = '';
	word.split('').forEach((letter) => {
		wordLetters += `<span class="badge badge-secondary">${letter}</span>\n`;
	});
	$('#word').html(wordLetters);
};

// function to update score function
let updateScore = function (newScore) {
	$('#staticScore').val(newScore);
};
// function to update score function
let updateFailTriesCount = function (fails, letters) {
	$('#staticTries').val(fails);
	$('#letterAttemps').val(letters);
};
// function to show a popover
let showPopover = function ($element, message) {
	$element.popover({
		trigger: 'manual',
		placement: 'top',
		content: message
	}).popover('show');
	setTimeout(() => {
		$element.popover('hide');
	}, 5000);
};

let guessLetter = function (game) {
	let guessedLetter = $('#inputLetter').val();
	// check the input of the letter
	if (game.isValidLetter(guessedLetter)) {
		// TODO guess letter
		let letterIsGuessed = false;
		if (letterIsGuessed) {
			// TODO update the view with the new word state
			// TODO update the score
			showPopover($('#word'), 'Word updated!');
			$('#inputLetter').val('').focus();
		} else {
			// TODO update the trial count
			showPopover($('#inputLetter'), 'The letter was incorrect!');
			$('#inputLetter').focus().select();
		}
		let wordIsGuessed = false; // TODO check if the word is guessed
		let gameIsOver = false; // TODO check if the game is over
		if (wordIsGuessed) {
		
		} else if (gameIsOver) {
		
		}
	} else {
		showPopover($('#inputLetter'), 'The input is not a valid letter');
		$('#inputLetter').focus().select();
	}
};

function startGame(game) {
	// guess button click handler
	$('#guess').click(function () {
		guessLetter(game);
	});
	// keyup event on the input (detect enter)
	$('#inputLetter').keyup(function (e) {
		if (13 === e.keyCode) {
			// enter detected
			guessLetter(game);
		}
	});
}
