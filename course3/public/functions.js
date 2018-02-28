// DOM handling functions
let getInputValue = function (button, selector = '.input') {
	let inputGroup = button.closest('.input-group');
	return inputGroup.querySelector(selector).value;
};

let setOutputValue = function (button, out, selector = '.output') {
	let inputGroup = button.closest('.input-group');
	inputGroup.querySelector(selector).value = out;
};

let leapYear = function () {
	let input = getInputValue(this);
	
	// set the output value
	setOutputValue(this, (input % 4 === 0) ? input + ' is/was a Leap Year' : input + ' Not leap Year');
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

/*Plain functions - working good but no inheritance or prototyping on them
but workind as a charm with references
* Advanced functionality in stringParse
* */
let reverseString = function(){
	let input = getInputValue(this).replace(/\s/g,'');
	let reverseString = input.split('').reverse().join('')
	setOutputValue(this, reverseString);
};

let isPalindrom = function(){
	let compareletters = () => {
		let input = getInputValue(this);

		//And reverse it
		/*@TODO - even so - how this one can be replaced with let reverseString from the reverseString()?
		* a call to the reverseString() cannot be made because  it calls the setOutputValue and I don't want that*/
		let reversedInput = input.split('').reverse().join('');

		//And compare them
		return input === reversedInput;
	};

	setOutputValue(this, true === compareletters() ? "Palindrom" : "Not Palindrom");
};

/*@TODO - I found myself in need to use a parameter and instantiate
* the stringParse on each click of the button - I'm pretty sure there's a better way, not proud of this one*/
let stringParse = function(input){
	this.input = input;
	this.inputValue = getInputValue(this.input).replace(/\s/g,'');
	
	this.reversedString = this.inputValue.split('').reverse().join('');
	
	this.stringReverse = function(){
		setOutputValue(this.input, this.reversedString);
	};
	
	this.palindromWord = function(){
		setOutputValue(this.input, this.inputValue === this.reversedString ? "Palindrom" : "Not Palindrom");
		console.log(this.inputValue)
	}

};


let parseString = function(){
	let input = getInputValue(this);
}

/*@TODO - try more to use prototype. Not sure how to instantiate the reference to them
* on the button*/
/*parseString.prototype.strReverse = function(){
	this.reversedString = this.inputValue.split('').reverse().join('');
	setOutputValue(this.input, this.reversedString);
	return this.reversedString;
};

parseString.prototype.palindrom = function(){
	/*@TODO - why this.reversedString from strReverse is undefined here?
	how to call strReverse here
	 */
	// setOutputValue(this.input, this.inputValue === this.reversedString ? "Palindrom" : "Not Palindrom");
//};

// Register click handlers
document.getElementById('leapYearBtn').onclick = leapYear;
document.getElementById('fibonacciBtn').onclick = fibonacci;

/*document.getElementById('reverseBtn').onclick = reverseString;
document.getElementById('palindromeBtn').onclick = isPalindrom;*/

document.getElementById('reverseBtn').onclick = function(){
	/*@TODO - how to avoid doubled instance here and in palindrom*/
	let word = new stringParse(this);
	word.stringReverse()
	//word.strReverse(this);
};

document.getElementById('palindromeBtn').onclick = function(){
	let word = new stringParse(this);
	word.palindromWord();
	//word.palindrom(this);
};
