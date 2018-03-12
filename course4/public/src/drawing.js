// TODO 1. Create more shapes. EG: Square, Line, Arc, Text
// TODO 2. Extend the objects with a method that validates the input parameters and prompts the user
// 3. Load the objects from the "database"
// TODO 4. Save the objects in the "database"
let canvas = document.getElementById('drawing');
let canvasDiv = document.getElementById('drawingCnt');


function resize() {
	canvas.width = canvasDiv.offsetWidth * (2 / 3);
	canvas.height = canvas.width * (2 / 3);
}

resize();

var ctx = canvas.getContext('2d');

// factory
function createShape(shape) {
	let myDrawings = new DrawingShapes(shape.x, shape.y);
	switch (shape.type) {
		case 'Circle':
			return myDrawings.Circle(shape.r);
		case 'Rectangle':
			return myDrawings.SquareRectangle(shape.width, shape.height);
		case 'Square':
			return myDrawings.SquareRectangle(shape.width);
		case 'Line':
			return myDrawings.Line(shape.x2, shape.y2, shape.lineWidth);
		case 'Ark':
			return myDrawings.Ark(shape.r, shape.angleStart, shape.angleEnd, shape.fill);
		case 'Text':
			return myDrawings.Text(shape.textSample, shape.fontSize, shape.font, shape.fill);
		default:
			throw new Error(`Shape type '${shape.type}' constructor not handled in factory`);
	}
	;
	
	
};

function retrieveAllTheShapes(success, error) {
	axios
		.get('/data')
		.then(function ({ data, status }) {
			if (200 === status) {
				success(data);
			} else {
				error('Could not retrieve data');
			}
		});
};

let drawAllTheShapes = function () {
	// show progress bar
	toggleProgress(true);
	let doneCallback = function (shapes) {
		shapes.forEach(shape => {
			createShape(shape);
		});
		// hide progress bar
		toggleProgress(false);
	};
	retrieveAllTheShapes(doneCallback, (myError) => {
		alert(myError);
	});
};

drawAllTheShapes();

// add window resize listener
window.addEventListener('resize', () => {
	// this will update the canvas with/height, which will also redraw it, so we need to redraw all the shapes
	resize();
	drawAllTheShapes();
}, false);

function toggleProgress(show) {
	document.getElementById('loading').classList.toggle('d-none', !show);
};

let addShapeBtn = document.getElementById('addShape');

// add event listener on the select type
let shapeTypeSelect = document.getElementById('type');

shapeTypeSelect.addEventListener('change', function () {
	// hide all "attr" rows
	let allAttrs = document.querySelectorAll('.attr');
	for (let item of allAttrs) {
		item.classList.add('d-none');
	}
	// show the selected one
	let shapeAttr = document.getElementById(`attr${this.value}`);
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
	let x = document.getElementById('x').value;
	let y = document.getElementById('y').value;
	let createShape = new DrawingShapes(x, y);
	
	switch (shapeTypeSelect.value) {
		case 'Circle':
			let r = document.getElementById('circleR').value;
			createShape.Circle(r);
			break;
		case 'Rectangle':
			let width = document.getElementById('rectWidth').value;
			let height = document.getElementById('rectHeight').value;
			createShape.SquareRectangle(width, height);
			break;
		case 'Square':
			let size = document.getElementById('sqSize').value;
			createShape.SquareRectangle(size);
			break;
		case 'Line':
			let x2 = document.getElementById('lineX2').value;
			let y2 = document.getElementById('lineY2').value;
			let lineWidth = document.getElementById('lineWidth').value;
			createShape.Line(x2, y2, lineWidth);
			break;
		case 'Ark':
			let startAngle = document.getElementById('startAngle').value;
			let endAngle = document.getElementById('endAngle').value;
			let radius = document.getElementById('radius').value;
			let color = document.getElementById('colorArk').value;
			
			createShape.Ark(radius, startAngle, endAngle, color);
			
			break;
		case 'Text':
			let textToWrite = document.getElementById('textToWrite').value;
			let fill = document.getElementById('textColor').value;
			let fontSize = document.getElementById('fontSize').value;
			createShape.Text(textToWrite, fontSize, fill);
			
			break;
		default:
	}
	createShape.Save()
}, false);

let clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', function () {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}, false);
