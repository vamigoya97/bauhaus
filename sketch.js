// Global Variables

var recs = [];
var condition = false;
var condition2 = false;
let canvas, button1, title, author, info, img;
let x = 0;
let y = 0;
let dim = 950;

function setup() {
  // Create HTML elements and canvas
  // title = createElement('h1', 'Square from Nine Rectangles');
  // author = createElement('h3', 'Mark Bill');
  // info = createElement('p', 'Painted in 1944 in Zurich Switzerland. Acrylic on Canvas. <br> This is a perfect example of the distinctive geometric patterns and colors present in Bauhaus art. Therefore, I decided to make an interactive version of it.<br> Click on the top right corner of each rectangle to change its color. Wasn`t able to create a rotation effect. <br> Press the button below to see the rectangle fall!');
  // img = createImg('img.png','painting');
  // img.style('width', '100px');
  // img.style('height', '100px');
  canvas = createCanvas(1024, 768);
  button1 = createButton('Gravity Effect');


  // Position HTML elements in the canvas
  // title.position(30, 0);
  // author.position(30, 40);
  // img.position(30, 90);
  // info.position(30, 190);
  button1.position(50, 50);
  canvas.position(50, 50);

  button1.mousePressed(gravityEffect);

  // Create rectangles using Rectangle 
  recs[0] = new Rectangle(400, 0, 100, 200, 52, 61, 70);
  recs[1] = new Rectangle(0, 200, 500, 100, 245, 195, 194);
  recs[2] = new Rectangle(450, 300, 50, 50, 184, 15, 10);
  recs[3] = new Rectangle(450, 350, 800, 50, 156, 204, 156);
  recs[4] = new Rectangle(450, 400, 50, 800, 225, 173, 1);
}

function draw() {

  // Fill background and display rectangles
  background(0, 0, 0);
  for (let i = 0; i < recs.length; i++) {
    recs[i].display();
  }

  // Add line and ellipses to the edges of the canvas
  // push();
  //   strokeWeight(10);
  //   stroke(153, 153, 153);
  //   // fill(40, 20, 30);
  //   line(0, 0, width, 0);
  //   line(0, 0, 0, height);
  //   line(width, height, 0, height);
  //   line(width, height, width, 0);
  //   // fill(255, 255, 255);
  //   ellipse(25, 25, 10, 10);
  //   ellipse(width - 25,  height - 25, 10, 10);
  //   ellipse(width - 25, 25, 10, 10);
  //   ellipse(25, height - 25, 10, 10);
  // pop();

  // Add points using beginShape and endShape
  beginShape(POINTS);
    vertex(25, 25);
    vertex(width - 25,  height - 25);
    vertex(width - 25, 25);
    vertex(25, height - 25);
  endShape();


  // Condition for gravity effect
  if (condition == true) {
    for (let i = 0; i < 5; i++) {
      let wind = createVector(0.01,0);
      let gravity = createVector(0, 0.1 * recs[i].mass);
      
      // All of these functions were cited from https://p5js.org/examples/simulate-forces.html
      recs[i].applyForce(gravity);
      recs[i].applyForce(wind);
      recs[i].display();
      recs[i].update();
      recs[i].checkEdges();
    }
  }

  // Transparent text translation
  push();
    y = y + 0.8;
    if (y > width + dim) {
      y = -dim;
    }
    translate(width/2 - dim/2, y);
    textSize(200);
    let textColor = color(0, 0, 0);
    textColor.setAlpha(128);
    fill(textColor, 127);
    text('BAUHAUS', x, y);
  pop();
}

// Event listener
function mousePressed() {
  condition2 = true;
  for (let i = 0; i < recs.length; i++) {
    recs[i].clicked();
  }
}
//custom function
function gravityEffect() {
  condition = true;
}
// function mouseDragged() {
//   for (let i = 0; i < recs.length; i++) {
//     recs[i].dragged();
//   }
// }

// Custom constructor
function Rectangle(x, y, w, h, r, g, b) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.c = color(r, g, b);
  this.mass = random(0, 4);
  this.position = createVector(x,y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
}

// Rectangle.prototype.dragged = function() {
//   var centerX = (this.x + (this.x + this.w))/2
//   var centerY = (this.y + (this.y + this.h))/2;
//   var d = dist(centerX, centerY, mouseX, mouseY);
//   if (d <= 25 && condition2) {
//     this.x = mouseX;
//   }
// }

// Custom constructor functions that allow for the different features of the app
Rectangle.prototype.clicked = function() {
  var d = dist(this.x, this.y, mouseX, mouseY);
  if (d <= 25) {
    this.c = color(random(0, 255), random(0, 255), random(0, 255))
  }
}

Rectangle.prototype.display = function() {
  stroke(1);
  fill(this.c);
  rect(this.position.x, this.position.y, this.w, this.h);
}

Rectangle.prototype.applyForce = function(force) {
  var f = p5.Vector.div(force, this.mass);
  this.acceleration.add(f);
}

Rectangle.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.acceleration.set(0,0);
}

Rectangle.prototype.checkEdges = function() {
  if (this.position.y > (height/2 - this.mass*10)) {
    this.velocity.y *= -0.9;
    this.position.y = (height/2 - this.mass*10)
  }
  if (this.position.x > (width/2 - this.mass*8)) {
    this.velocity.x *= -0.9;
    this.position.x = width/2 - this.mass*8;
  }
  if (this.position.x < this.mass*6) {
    this.velocity.x *= -0.9;
    this.position.x = this.mass*6;
  }
}