class DrawingShapes {
	constructor(x, y, fill = 'rgba(0, 0, 200, 0.5)'){
		this.x = x;
		this.y = y;
		this.fill = fill;
		this.canvas = document.getElementById('drawing');
		this.canvasDiv = document.getElementById('drawingCnt');
		this.ctx = this.canvas.getContext('2d');
		this.updatedData = {};
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
	
	Text(textSample = 'Hello World', fontSize = 30, font = 'Arial', fill = this.fill){
		this.ctx.font = `${fontSize}px ${font}`;
		this.ctx.fillStyle = fill;
		this.ctx.fillText(textSample, this.x, this.y);
	}
	
	async Save(shapeOptions) {
		let newData = [shapeOptions],
			existingData = await this.GetAllTheShapes();
		Object.assign(existingData, newData);
		Object.assign(this.updatedData, existingData);
		
		axios.post('/data', this.updatedData);
		
		return this.updatedData;
	}
	
	async GetAllTheShapes(){
		try {
			const response = await axios.get('/data');
			console.log(response);
			return response.data;
		}catch (error){
			console.log(error);
		}
	}
}

new DrawingShapes(120, 140).GetAllTheShapes();

/**@TODO - investigate export/import */

/*new DrawingShapes(90, 70).CreateShape('Circle', {radius: 20});
new DrawingShapes(120, 70).CreateShape('Square', {width: 20});*/

