var img;
var img2;

function preload() {
  img = loadImage('eye.jpg');
  img2 = loadImage('Yes.jpg');

}

function setup() {
  createCanvas(1280, 600, WEBGL);
}

function draw() {
  background(0);
  rotateY(frameCount * 0.001);
  rotateZ(frameCount * 0.001);
  texture(img2)
  box(900,900);
  rotateY(frameCount * 0.03);
  texture(img)
  sphere(150);
}
