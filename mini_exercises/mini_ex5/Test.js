var sprite = [];

function setup() {
  createCanvas(800, 400);
}

function draw() {
  if (mouseIsPressed) {
    sprite[0] = new Sprite(400, 100, 50, 50);
    sprite[0].display(100, 255, 100);
    sprite[1] = new Sprite(150, 100, 100, 100);
    sprite[1].display(200, 200, 100);
    sprite[2] = new Sprite(280, 250, 300, 50);
    sprite[2].display(random(0, 255), random(0, 255), random(0, 255));
  }
}

class Sprite {
  constructor(x, y, szx, szy) {
    this.x = x;
    this.y = y;
    this.szx = szx;
    this.szy = szy;
  }
  display(red, blue, green, alpha) {
    this.red = red;
    this.blue = blue;
    this.green = green;
    this.alpha = alpha;
    fill(this.red, this.blue, this.green, this.alpha);
    rect(this.x, this.y, this.szx, this.szy);
  }
}
