var img;
var smiley;
var y = 150;
var x = 0;
var speed = 200;

function preload() {
img = loadImage('Images/Fun.jpg');
smiley = loadImage('Images/smiley.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  image(img, width/8, height/100, 0, 0);
}

function draw() {
    noFill();
    stroke(random(4000));
    strokeWeight(random(10));
    //texture(smiley);
    ellipse(x, y, 40, 40);
    x = x + speed

  if (x >= width) {
    speed = -200
    x = x + random(77)
    y = y + random(150)
  } //Adding a bounce effect if it hits right "wall" + assigning a new y-value

  if (x <= 0) {
    speed = 200
    x = x - random(79)
    y = y - random(150)
  } //Adding a bounce effect if it hits left "wall" + assigning a new y-value

  if (y >= height) {
    y = y - random(400)
  } //If it ends up outside of canvas, bring it back

  if (y <= 0) {
    y = y + random(400)
  } //If it ends up outside of canvas, bring it back
}
