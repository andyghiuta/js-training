// 1. Create more shapes. EG: Square, Line, Arc, Text
// 2. Extend the objects with a method that validates the input parameters and prompts the user
// 3. Load the objects from the "database"
// TODO 4. Save the objects in the "database"
let canvas = document.getElementById('drawing');
let canvasDiv = document.getElementById('drawingCnt');
function resize() {
  canvas.width = canvasDiv.offsetWidth * (2/3);
  canvas.height = canvas.width * (2/3);
}
resize();

let ctx = canvas.getContext('2d');

// Shape class
class Shape {
  constructor(x, y, fill = 'rgba(0, 0, 200, 0.5)') {
    this.x = x;
    this.y = y;
    this.fill = fill;
  }
  draw() {
    window.requestAnimationFrame(() => this.drawFrame());
  }
  drawFrame() {
    // actual drawing logic
    // to be implemented in each shape type
    throw new Error('Implement this function in your shape type');
  }
  validate() {
    let errors = {};
    if ('undefined' === typeof this.x || '' === this.x) {
      errors.x = 'Shape must have "x" property';
    }
    if ('undefined' === typeof this.y || '' === this.y) {
      errors.y = 'Shape must have "y" property';
    }
    return errors;
  }
  save() {
    let data = JSON.parse(JSON.stringify(this));
    // Note: constructor.name is available only in ES2015
    data.type = this.constructor.name;
    axios.post('/data', data);
  }
}

// Circle class
class Circle extends Shape {
  constructor(x, y, r, fill = 'rgba(0, 0, 200, 0.5)') {
    // call the shape constructor
    super(x, y);
    this.r = r;
  }
  drawFrame() {
    // fill with a blue color, 50% opacity
    ctx.fillStyle = this.fill;
    ctx.beginPath();
    // an arc starting at x/y position, "r"px radius, start at 0, end at PI*2 (end of the circle)
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); // Outer circle
    ctx.fill();
  }
  validate() {
    // first get the parent errors
    let errors = super.validate();
    if ('undefined' === typeof this.r || '' === this.r) {
      errors.r = 'Shape must have "r" property';
    }
    return errors;
  }
}
// Rectangle class
class Rectangle extends Shape {
  constructor(x, y, width, height, fill = 'rgba(0, 0, 200, 0.5)') {
    // call the shape constructor
    super(x, y, fill);
    this.width = width;
    this.height = height;
  }
  drawFrame() {
    // fill with a blue color, 50% opacity
    ctx.fillStyle = this.fill;
    ctx.beginPath();
    // a rectangle starting at x/y position, with width/height
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }
  validate() {
    // first get the parent errors
    let errors = super.validate(this);
    if ('undefined' === typeof this.width || '' === this.width) {
      errors.width = 'Shape must have "width" property';
    }
    if ('undefined' === typeof this.height || '' === this.height) {
      errors.height = 'Shape must have "height" property';
    }
    return errors;
  }
}

// Square class
class Square extends Shape {
  constructor(x, y, size, fill = 'rgba(0, 0, 200, 0.5)') {
    // call the shape constructor
    super(x, y, fill);
    this.size = size;
  }
  drawFrame() {
    // fill with a blue color, 50% opacity
    ctx.fillStyle = this.fill;
    ctx.beginPath();
    // a square starting at x/y position, with the same width/height=size
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fill();
  }
  validate() {
    // first get the parent errors
    let errors = super.validate();
    if ('undefined' === typeof this.size || '' === this.size) {
      errors.size = 'Shape must have "size" property';
    }
    return errors;
  }
}

// Line constructor does not call Shape constructor because it doesn't have x/y
class Line extends Shape {
  constructor(x1, y1, x2, y2, lineWidth, fill = 'rgba(0, 0, 200, 0.5)') {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.lineWidth = lineWidth;
    this.fill = fill;
  }
  drawFrame() {
    ctx.beginPath();

    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = this.fill;
    ctx.lineWidth = this.lineWidth;

    ctx.stroke();
  }
  validate() {
    let errors = {};
    if ('undefined' === typeof this.x1 || '' === this.x1) {
      errors.x1 = 'Shape must have "x1" property';
    }
    if ('undefined' === typeof this.y1 || '' === this.y1) {
      errors.y1 = 'Shape must have "y1" property';
    }
    if ('undefined' === typeof this.x2 || '' === this.x2) {
      errors.x2 = 'Shape must have "x2" property';
    }
    if ('undefined' === typeof this.y2 || '' === this.y2) {
      errors.y2 = 'Shape must have "y2" property';
    }
    if ('undefined' === typeof this.lineWidth || '' === this.lineWidth) {
      errors.lineWidth = 'Shape must have "lineWidth" property';
    }
    return errors;
  }
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
    default:
      throw new Error(`Shape type '${shape.type}' constructor not handled in factory`);
  }
}

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
}

async function retrieveAllTheShapesAsync() {
  try {
    const response = await axios.get('/data');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

let drawAllTheShapes = function() {
  // show progress bar
  toggleProgress(true);
  let doneCallback = function(shapes) {
    shapes.forEach(shape => {
      let shapeObject = createShape(shape);
      shapeObject.draw();
    });
    // hide progress bar
    toggleProgress(false);
  };
  retrieveAllTheShapes(doneCallback, (myError) => {
    alert(myError);
  });
}

let drawAllTheShapesAsync = async function() {
  // show progress bar
  toggleProgress(true);
  let shapes = await retrieveAllTheShapesAsync();
  shapes.forEach(shape => {
    let shapeObject = createShape(shape);
    shapeObject.draw();
  });
  // hide progress bar
  toggleProgress(false);
}

drawAllTheShapesAsync();

// add window resize listener
window.addEventListener('resize', () => {
  // this will update the canvas with/heightt, which will also redraw it, so we need to redraw all the shapes
  resize();
  drawAllTheShapes();
}, false);

function toggleProgress(show) {
  document.getElementById('loading').classList.toggle('d-none', !show);
}

let addShapeBtn = document.getElementById('addShape');
// add event listener on the select type
let shapeTypeSelect = document.getElementById('type');
shapeTypeSelect.addEventListener('change', function() {
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
addShapeBtn.addEventListener('click', function() {
  // read the shape position
  let x = document.getElementById('x').value;
  let y = document.getElementById('y').value;
  let shapeOptions = {
    type: shapeTypeSelect.value,
    x,
    y
  };

  switch (shapeTypeSelect.value) {
    case 'Circle':
      // circle also has a radius
      shapeOptions.r = document.getElementById('circleR').value;
      break;
    case 'Rectangle':
      // rectangle has width and height
      shapeOptions.width = document.getElementById('rectWidth').value;
      shapeOptions.height = document.getElementById('rectHeight').value;
      break;
    case 'Square':
      // rectangle has width and height
      shapeOptions.size = document.getElementById('sqSize').value;
      break;
    case 'Line':
      // rectangle has width and height
      shapeOptions.x2 = document.getElementById('lineX2').value;
      shapeOptions.y2 = document.getElementById('lineY2').value;
      shapeOptions.lineWidth = document.getElementById('lineWidth').value;
      break;
    default:
  }
  // create and draw the shape
  let shape = createShape(shapeOptions);
  // validate the shape
  let errors = Object.values(shape.validate());
  if (0 !== errors.length) {
    // show the errors
    alert(errors.join('\n'));
  } else {
    shape.draw();
    shape.save();
  }
}, false);

let clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}, false);
