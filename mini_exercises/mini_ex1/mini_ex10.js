var img;
var img2;

function preload() {
  img = loadImage('Images/eye.jpg');
  img2 = loadImage('Images/Yes.jpg');

}

function setup() {
  createCanvas(1280, 600, WEBGL);
}

function draw() {
  //ackground(0);
  rotateY(frameCount * 0.001);
  rotateZ(frameCount * 0.001);
  texture(img2)
  box(280, 280);
  rotateY(frameCount * 0.03);
  texture(img)
  sphere(210);
}
