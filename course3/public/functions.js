// DOM handling functions
let getInputValue = function (button, selector = '.input') {
	let inputGroup = button.closest('.input-group');
	return inputGroup.querySelector(selector).value;
};

let setOutputValue = function (button, out, selector = '.output') {
	let inputGroup = button.closest('.input-group');
	inputGroup.querySelector(selector).value = out;
};

// algorithm functions
let leapYear = function () {
	let input = getInputValue(this);
	let output = "";

	if ((input % 100 === 0)) {
		output = (input % 400 === 0);
	} else {
		output = (input % 4 === 0)
	}
	
	// set the output value
	setOutputValue(this, output === false ? input + ' Not leap Year' : input + ' is/was a Leap Year');
};

let fibonacci = function () {
	let number = getInputValue(this);

	let getFibPriorTo = (value) =>{
		let mem = 1,
			fib = [0,1];

		while(mem <=value){
			mem += fib[fib.length-2];
			if(mem<=value){
				fib.push(mem);
			}
		}
		return fib;
	};

	setOutputValue(this, getFibPriorTo(number).join(','));
};

let reverseString = function(){
	let input = getInputValue(this);
	let reverseString = input.split('').reverse().join('')
	setOutputValue(this, reverseString);
};

let isPalindrom = function(){
	let compareletters = () => {
		let input = getInputValue(this);

		//And reverse it
		let reversedInput = input.split('').reverse().join('');

		//And compare them
		return input === reversedInput;
	};

	setOutputValue(this, true === compareletters() ? "Palindrom" : "Not Palindrom");
};


let stringParse = function(input){
	this.input = input;
	this.inputValue = getInputValue(this.input).replace(/\s/g,'');
	
	/*@TODO - why this one being declared inside reversedString() is not visible in palindromWord()*/
	this.reversedString = this.inputValue.split('').reverse().join('');
	
	this.stringReverse = function(){
		setOutputValue(this.input, this.reversedString);
	};
	
	this.palindromWord = function(){
		setOutputValue(this.input, this.inputValue === this.reversedString ? "Palindrom" : "Not Palindrom");
		console.log(this.inputValue)
	}

};


/*@TODO - try more to use prototype*/
/*parseString.prototype.strReverse = function(){
	this.reversedString = this.inputValue.split('').reverse().join('');
	setOutputValue(this.input, this.reversedString);
	return this.reversedString;
};

parseString.prototype.palindrom = function(){
	*//*@TODO - why this.reversedString from strReverse is undefined here?*//*
	setOutputValue(this.input, this.inputValue === this.reversedString ? "Palindrom" : "Not Palindrom");
};*/

// Register click handlers
document.getElementById('leapYearBtn').onclick = leapYear;
document.getElementById('fibonacciBtn').onclick = fibonacci;

/*document.getElementById('reverseBtn').onclick = reverseString;
document.getElementById('palindromeBtn').onclick = isPalindrom;*/

document.getElementById('reverseBtn').onclick = function(){
	let word = new stringParse(this);
	word.stringReverse()
	//word.strReverse(this);
};

document.getElementById('palindromeBtn').onclick = function(){
	let word = new stringParse(this);
	word.palindromWord();
	//word.palindrom(this);
};
