'use strict';

var _withClass = require('with-class');

var _withClass2 = _interopRequireDefault(_withClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO 1. Create more shapes. EG: Square, Line, Arc, Text
// TODO 2. Extend the objects with a method that validates the input parameters and prompts the user
// 3. Load the objects from the "database"
// TODO 4. Save the objects in the "database"
var canvas = document.getElementById('drawing');
var canvasDiv = document.getElementById('drawingCnt');

console.log(_withClass2.default);

function resize() {
	canvas.width = canvasDiv.offsetWidth * (2 / 3);
	canvas.height = canvas.width * (2 / 3);
}

resize();

var ctx = canvas.getContext('2d');

// Shape "constructor"
function Shape(x, y) {
	var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'rgba(0, 0, 200, 0.5)';

	this.x = x;
	this.y = y;
	this.fill = fill;
};

// the function that draws the shape
Shape.prototype.draw = function () {
	var _this = this;

	window.requestAnimationFrame(function () {
		return _this.drawFrame();
	});
};

// extend the drawFrame
//@TODO - why do we need basically an empty function that is going to be extended afterwards?
Shape.prototype.drawFrame = function () {
	// actual drawing logic
	// to be implemented in each shape type
	throw new Error('Implement this function in your shape type');
};

// Circle "constructor"
function Circle(x, y, r) {
	var fill = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'rgba(0, 0, 200, 0.5)';

	// call the shape constructor
	Shape.call(this, x, y);
	this.r = r;
};

// Circle extends Shape
//@TODO - why Circle extends Shape and then extends drawFrame?
Circle.prototype = Object.create(Shape.prototype);

// extend the drawFrame
Circle.prototype.drawFrame = function () {
	// fill with a blue color, 50% opacity
	ctx.fillStyle = this.fill;
	ctx.beginPath();
	// an arc starting at x/y position, "r"px radius, start at 0, end at PI*2 (end of the circle)
	ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); // Outer circle
	ctx.fill();
};

// Rectangle "constructor"
function Rectangle(x, y, width, height) {
	var fill = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'rgba(0, 0, 200, 0.5)';

	// call the shape constructor
	Shape.call(this, x, y, fill);
	this.width = width;
	this.height = height;
};

// Circle extends Shape @TODO - Circle or rectangle extends Shape?
Rectangle.prototype = Object.create(Shape.prototype);

// extend the drawFrame @TODO - again, why do we need drawFrame in each form that we are going to draw?
Rectangle.prototype.drawFrame = function () {
	// fill with a blue color, 50% opacity
	ctx.fillStyle = this.fill;
	ctx.beginPath();
	// a rectangle starting at x/y position, with width/height
	ctx.rect(this.x, this.y, this.width, this.height); // Outer circle
	ctx.fill();
};

// Square "constructor"
function Square(x, y, size) {
	var fill = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'rgba(0, 0, 200, 0.5)';

	// call the shape constructor
	Rectangle.call(this, x, y, size, size, fill);
};

// Square extends Rectangle
//Square.prototype = Object.create(Rectangle.prototype);
function Line(x1, y1, x2, y2, lineWidth) {
	var fill = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'rgba(0, 0, 200, 0.5)';

	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.lineWidth = lineWidth;
	this.fill = fill;
};

Line.prototype = Object.create(Shape.prototype);

Line.prototype.drawFrame = function () {
	ctx.beginPath();
	ctx.moveTo(this.x1, this.y1);
	ctx.lineTo(this.x2, this.y2);
	ctx.strokeStyle = this.fill;
	ctx.lineWidth = this.lineWidth;

	ctx.stroke();
};

/*Ark constructor*/
function Ark(x, y, r, angleStart, angleEnd) {
	var fill = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'rgba(0, 0, 200, 0.5)';

	this.x = x;
	this.y = y;
	this.r = r;
	this.angleStart = angleStart;
	this.angleEnd = angleEnd;
	this.fill = fill;
	console.log(this);
}

Ark.prototype = Object.create(Shape.prototype);

Ark.prototype.drawFrame = function () {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, this.angleStart, this.angleEnd * Math.PI);
	ctx.stroke();
};

function drawText(x, y, fontSize, textSample) {
	var fill = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'rgba(0, 0, 200, 0.5)';

	Shape.call(this, x, y, fill);
	this.fontSize = fontSize;
	this.font = this.fontSize + 'px Arial';
	this.textSample = textSample;
}

drawText.prototype = Object.create(Shape.prototype);

drawText.prototype.drawFrame = function () {
	ctx.font = this.font;
	ctx.fillText(this.textSample, this.x, this.y);
	ctx.fillStyle = this.fill;
};

function drawClock(x, y) {
	var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'rgba(0, 0, 200, 0.5)';

	Shape.call(this, x, y, fill);
}

// factory
function createShape(shape) {
	switch (shape.type) {
		case 'Circle':
			return new Circle(shape.x, shape.y, shape.r);
		case 'Rectangle':
			return new Rectangle(shape.x, shape.y, shape.width, shape.height);
		case 'Square':
			return new Square(shape.x, shape.y, shape.size);
		case 'Line':
			return new Line(shape.x1, shape.y1, shape.x2, shape.y2, shape.lineWidth);
		case 'Ark':
			return new Ark(shape.x, shape.y, shape.r, shape.angleStart, shape.angleEnd, shape.fill);
		case 'Text':
			return new drawText(shape.x, shape.y, shape.fontSize, shape.textSample, shape.fill);
		default:
			throw new Error('Shape type \'' + shape.type + '\' constructor not handled in factory');
	}
};

function retrieveAllTheShapes(success, error) {
	axios.get('/data').then(function (_ref) {
		var data = _ref.data,
		    status = _ref.status;

		if (200 === status) {
			success(data);
		} else {
			error('Could not retrieve data');
		}
	});
};

var drawAllTheShapes = function drawAllTheShapes() {
	// show progress bar
	toggleProgress(true);
	var doneCallback = function doneCallback(shapes) {
		shapes.forEach(function (shape) {
			var shapeObject = createShape(shape);
			shapeObject.draw();
		});
		// hide progress bar
		toggleProgress(false);
	};
	retrieveAllTheShapes(doneCallback, function (myError) {
		alert(myError);
	});
};

drawAllTheShapes();

// add window resize listener
window.addEventListener('resize', function () {
	// this will update the canvas with/height, which will also redraw it, so we need to redraw all the shapes
	resize();
	drawAllTheShapes();
}, false);

function toggleProgress(show) {
	document.getElementById('loading').classList.toggle('d-none', !show);
};

var addShapeBtn = document.getElementById('addShape');

// add event listener on the select type
var shapeTypeSelect = document.getElementById('type');
shapeTypeSelect.addEventListener('change', function () {
	// hide all "attr" rows
	var allAttrs = document.querySelectorAll('.attr');
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = allAttrs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var item = _step.value;

			item.classList.add('d-none');
		}
		// show the selected one
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	var shapeAttr = document.getElementById('attr' + this.value);
	if (shapeAttr) {
		shapeAttr.classList.remove('d-none');
		addShapeBtn.classList.remove('d-none');
	} else {
		addShapeBtn.classList.add('d-none');
	}
}, false);

// add event listener on the button
addShapeBtn.addEventListener('click', function () {
	// read the shape position
	var x = document.getElementById('x').value;
	var y = document.getElementById('y').value;
	switch (shapeTypeSelect.value) {
		case 'Circle':
			// circle also has a radius
			var r = document.getElementById('circleR').value;
			// create and draw the shape
			var circle = createShape({
				type: shapeTypeSelect.value,
				x: x,
				y: y,
				r: r
			});
			circle.draw();
			break;
		case 'Rectangle':
			// rectangle has width and height
			var width = document.getElementById('rectWidth').value;
			var height = document.getElementById('rectHeight').value;
			// create and draw the shape
			var rectangle = createShape({
				type: shapeTypeSelect.value,
				x: x,
				y: y,
				width: width,
				height: height
			});
			rectangle.draw();
			break;
		case 'Square':
			// rectangle has width and height
			var size = document.getElementById('sqSize').value;
			// create and draw the shape
			var square = createShape({
				type: shapeTypeSelect.value,
				x: x,
				y: y,
				size: size
			});
			square.draw();
			break;
		case 'Line':
			// rectangle has width and height
			var x2 = document.getElementById('lineX2').value;
			var y2 = document.getElementById('lineY2').value;
			var lineWidth = document.getElementById('lineWidth').value;
			// create and draw the shape
			var line = createShape({
				type: shapeTypeSelect.value,
				x1: x,
				y1: y,
				x2: x2,
				y2: y2,
				lineWidth: lineWidth
			});
			line.draw();
			break;
		case 'Ark':
			var startAngle = document.getElementById('startAngle').value;
			var endAngle = document.getElementById('endAngle').value;
			var radius = document.getElementById('radius').value;
			var color = document.getElementById('colorArk').value;

			var ark = createShape({
				type: shapeTypeSelect.value,
				x: x,
				y: y,
				angleStart: startAngle,
				angleEnd: endAngle,
				r: radius,
				color: color
			});
			ark.draw();
			break;
		case 'Text':
			var textToWrite = document.getElementById('textToWrite').value;
			var fill = document.getElementById('textColor').value;
			var fontSize = document.getElementById('fontSize').value;

			var _drawText = createShape({
				x: x,
				y: y,
				fontSize: fontSize,
				type: shapeTypeSelect.value,
				textSample: textToWrite,
				fill: fill
			});
			_drawText.draw();
			break;
		default:
	}
}, false);

var clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', function () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}, false);