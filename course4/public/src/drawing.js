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
	};
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
	let shapeOptions = {
		type: shapeTypeSelect.value,
		x: Math.floor(document.getElementById('x').value),
		y: Math.floor(document.getElementById('y').value),
	};
	
	let createShape = new DrawingShapes(shapeOptions.x, shapeOptions.y);
	
	switch (shapeTypeSelect.value) {
		case 'Circle':
			Object.assign(shapeOptions, {
				r: Math.floor(document.getElementById('circleR').value)
			});
			createShape.Circle(shapeOptions.r);
			break;
		
		case 'Rectangle':
			Object.assign(shapeOptions, {
				width: Math.floor(document.getElementById('rectWidth').value),
				height: Math.floor(document.getElementById('rectHeight').value)
			});
			createShape.SquareRectangle(shapeOptions.width, shapeOptions.height);
			break;
		
		case 'Square':
			Object.assign(shapeOptions, {
				size: Math.floor(document.getElementById('sqSize').value)
			});
			createShape.SquareRectangle(shapeOptions.size);
			break;
		
		case 'Line':
			Object.assign(shapeOptions, {
				x2: Math.floor(document.getElementById('lineX2').value),
				y2: Math.floor(document.getElementById('lineY2').value),
				lineWidth: Math.floor(document.getElementById('lineWidth').value)
			})
			createShape.Line(shapeOptions.x2, shapeOptions.y2, shapeOptions.lineWidth);
			break;
		
		case 'Ark':
			Object.assign(shapeOptions, {
				startAngle: Math.floor(document.getElementById('startAngle').value),
				endAngle: Math.floor(document.getElementById('endAngle').value),
				radius: Math.floor(document.getElementById('radius').value),
				color: Math.floor(document.getElementById('colorArk').value)
			});
			createShape.Ark(shapeOptions.radius, shapeOptions.startAngle, shapeOptions.endAngle, shapeOptions.color);
			break;
		
		case 'Text':
			Object.assign(shapeOptions, {
				textToWrite: document.getElementById('textToWrite').value,
				fill: Math.floor(document.getElementById('textColor').value),
				fontSize: Math.floor(document.getElementById('fontSize').value)
			});
			createShape.Text(shapeOptions.textToWrite, shapeOptions.fontSize, shapeOptions.fill);
			break;
		
		default:
	}
	//axios.post('/data', {"ceva": "altceva"}).then((data, arguments) => {console.log(data, arguments)}).catch(error => {console.log(error)});
	
	new crudOperator(shapeOptions).Save();
	//createShape.Save(shapeOptions);
	
}, false);

let clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', function () {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}, false);
