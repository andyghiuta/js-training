class DrawingShapes {
	constructor(x, y, fill = 'rgba(0, 0, 200, 0.5)'){
		this.x = document.getElementById('x').value;
		this.y = document.getElementById('y').value;
		/*this.x = x;
		this.y = y;*/
		this.fill = fill;
		this.canvas = document.getElementById('drawing');
		this.canvasDiv = document.getElementById('drawingCnt');
		this.ctx = this.canvas.getContext('2d');
	}
	
	Circle(radius){
		this.radius = radius;
		this.ctx.fillStyle = this.fill;
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, radius, 0, Math.PI * 2); // Outer circle
		this.ctx.fill();
	}
	
	/*Depends on the number of params, single parameter - square, two parameters - rectangle*/
	SquareRectangle(width, height = width){
		this.width = width;
		this.height = height;
		this.ctx.fillStyle = this.fill;
		this.ctx.beginPath();
		this.ctx.rect(this.x, this.y, width, height);
		this.ctx.fill();
	}
	
	Line(x2, y2, lineWidth){
		this.lineWidth = lineWidth;
		this.ctx.beginPath();
		this.ctx.moveTo(this.x, this.y);
		this.ctx.lineTo(x2, y2);
		this.ctx.strokeStyle = this.fill;
		this.ctx.lineWidth = this.lineWidth;
		this.ctx.stroke();
	}
	
	Ark(radius, angleStart, angleEnd){
		this.ctx.beginPath(radius, angleStart, angleEnd);
		this.ctx.arc(this.x, this.y, radius, angleStart, angleEnd * Math.PI)
		this.ctx.stroke();
	}
	
	Text(textSample = 'Hello World', fontSize = 30, font = 'Arial'){
		this.ctx.font = `${fontSize}px ${font}`;
		this.ctx.fillStyle = this.fill;
		this.ctx.textAlign = "center";
		this.ctx.fillText(textSample, this.x, this.y);
	}
	
	CreateShape(shape, params){
		switch (shape) {
			case 'Circle':
				//console.log(this.Circle(this.radius))
				return this.Circle(params.radius);
			case 'Square':
				return this.SquareRectangle(params.width);
			case 'Rectangle':
				return this.SquareRectangle(params.width, params.height);
			case 'Line':
				return this.Line(params.x2, params.y2, this.lineWidth);
			case 'Ark':
				return this.Ark(params.radius, params.angleStart, params.angleEnd, params.fill)
			case 'Text':
				return this.Text(params.textSample, params.fontSize, params.font);
			default:
				throw new Error(`Shape type '${this.type}' constructor not handled in factory`);
		}
	}
}

let addShapeBtn = document.getElementById('addShape');
let shapeAttr = document.getElementById(`attr${this.value}`);
shapeAttr.classList.remove('d-none');
addShapeBtn.addEventListener('click', function () {
	
	switch (shapeTypeSelect.value) {
		case 'Circle':
			let radius = document.getElementById('circleR').value;
			new DrawingShapes().Circle(radius);
			break;
		case 'Rectangle':
			// rectangle has width and height
			let width = document.getElementById('rectWidth').value;
			let height = document.getElementById('rectHeight').value;
			// create and draw the shape
			let rectangle = createShape({
				type: shapeTypeSelect.value,
				x,
				y,
				width,
				height
			});
			rectangle.draw();
			break;
		case 'Square':
			// rectangle has width and height
			let size = document.getElementById('sqSize').value;
			// create and draw the shape
			let square = createShape({
				type: shapeTypeSelect.value,
				x,
				y,
				size
			});
			square.draw();
			break;
		case 'Line':
			// rectangle has width and height
			let x2 = document.getElementById('lineX2').value;
			let y2 = document.getElementById('lineY2').value;
			let lineWidth = document.getElementById('lineWidth').value;
			// create and draw the shape
			let line = createShape({
				type: shapeTypeSelect.value,
				x1: x,
				y1: y,
				x2,
				y2,
				lineWidth
			});
			line.draw();
			break;
		case 'Ark':
			let startAngle = document.getElementById('startAngle').value;
			let endAngle = document.getElementById('endAngle').value;
			let radius = document.getElementById('radius').value;
			let color = document.getElementById('colorArk').value;
			
			let ark = createShape({
				type: shapeTypeSelect.value,
				x,
				y,
				angleStart: startAngle,
				angleEnd: endAngle,
				r: radius,
				color
			});
			ark.draw()
			break;
		case 'Text':
			let textToWrite = document.getElementById('textToWrite').value;
			let fill = document.getElementById('textColor').value;
			let fontSize = document.getElementById('fontSize').value;
			
			let drawText = createShape({
				x,
				y,
				fontSize,
				type: shapeTypeSelect.value,
				textSample: textToWrite,
				fill
			});
			drawText.draw()
			break;
		default:
	}
}, false);

/**@TODO - investigate export/import */

/*new DrawingShapes(90, 70).CreateShape('Circle', {radius: 20});
new DrawingShapes(120, 70).CreateShape('Square', {width: 20});*/

