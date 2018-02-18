var img;
var img2;
var img3;
var img4;
var y = 150;
var x = 0;
var speed = 200;

function preload() {
img = loadImage('Images/Fun.jpg');
img2 = loadImage('Images/img2.jpg');
img3 = loadImage('Images/img3.jpg');
img4 = loadImage('Images/img4.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  image(img, width/8, height/100, 0, 0);
}

function draw() {
    noFill();
    stroke(255);
    strokeWeight(random(7));
    ellipse(x, y, 20, 20);
    x = x + speed

  if (x >= width) {
    speed = -200
    x = x + random(140)
    y = y + random(150)
  } //Adding a bounce effect if it hits right "wall" + assigning a new y-value

  if (x <= 0) {
    speed = 200
    x = x - random(140)
    y = y - random(150)
  } //Adding a bounce effect if it hits left "wall" + assigning a new y-value

  if (y >= height) {
    y = y - random(400)
  } //If it ends up outside of canvas, bring it back

  if (y <= 0) {
    y = y + random(400)
  } //If it ends up outside of canvas, bring it back

  img.mousePressed(Image(img)) {

  }
}
