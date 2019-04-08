 INSTRUCTIONS
-Copy/Paste to p5.js Web Editor
-Click the play-button to initiate the sketch
-Click the sketch itself to activate it
-Enjoy!

//Code
var what = []; //is red
var where = []; //is green
var when = []; //is blue

var whatStrings = "Processing_Community_Day";
var whereStrings = "Aarhus,DK";
var whenStrings = "09-02-2019";

var bounce = -1; //when hitting the wall
var pull = 0.01; //towards an angle
var maxSpeed = 7;
var decelerate = 0.01; //from the maximum speed
var minSpeed = 0.1;
var accelerate = 1.01; //from the minimum speed
var txtSize = 17;

var a = 600;
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  frameRate(30);
  background(255)

  let stringWidth = textWidth(whatStrings[2]);
  let whatStringsWidth = textWidth(whatStrings);
  for(let i = 0; i <= whatStrings.length; i++) {
    what[i] = new Letter(whatStrings[i], width/2 - whatStringsWidth + (stringWidth+6)*i, height*0.25, random(0,360), txtSize, i, color(255, 0 , 0, 25), what);
    what[i].display()
  }

  let whereStringsWidth = textWidth(whereStrings);
  for(let i = 0; i <= whereStrings.length; i++) {
    where[i] = new Letter(whereStrings[i], width/2 - whereStringsWidth + (stringWidth+7)*i, height*0.50, random(0,360), txtSize, i, color(0, 255, 0, 40), where);
    where[i].display()
  }

  let whenStringsWidth = textWidth(whenStrings);
  for(let i = 0; i <= whenStrings.length; i++) {
    when[i] = new Letter(whenStrings[i], width/2 - whenStringsWidth + (stringWidth+6)*i, height*0.75, random(0,360), txtSize, i, color(0, 0, 255, 100), when)
    when[i].display()
  }
}

function draw() {
  if (bool == true) {
    if (keyIsPressed) {
      background(0);
      bool2 = true;
    } else {
      background(255);
      push()
      textAlign(CENTER, BOTTOM);
      textFont('Georgia');
      textSize(20);
      noFill();
      if (frameCount > 300) {
        stroke(a);
        if (bool2 == false) {
          text('Press and hold any key', width/2, height);
        } else if (bool2 == true) {
          text('Click to learn more', width/2, height);
        }
      }
      pop()
      a = a - 1
    }

    for(let i = 0; i < what.length; i++) {
      what[i].collide()
      what[i].setMove()
      what[i].move()
      what[i].edge()
      what[i].display()
      if (i < what.length - 1) {
        what[i].displayLine()
      }
    }

    for(let i = 0; i < where.length; i++) {
      where[i].collide()
      where[i].setMove()
      where[i].move()
      where[i].edge()
      where[i].display()
      if (i < where.length - 1) {
        where[i].displayLine()
      }
    }

    for(let i = 0; i < when.length; i++) {
      when[i].collide()
      when[i].setMove()
      when[i].move()
      when[i].edge()
      when[i].display()
      if (i < when.length - 1) {
        when[i].displayLine()
      }
    }

  }
}

var bool = false;
var bool2 = false;
var bool3 = false;

function mousePressed() {
  bool = true;
  if (bool3 == true) {
    window.open("https://www.pcdaarhus.net/");
  }
  bool3 = true;
}

//CLASS
function Letter(txt, x, y, angle, sz, id, col, others) {
  this.txt = txt;
  this.pos = createVector(x, y)
  this.sz = sz;
  this.angle = angle;
  this.id = id;
  this.col = col;
  this.others = others;
  this.vel = createVector(0, 0);

  this.display = function() {
  textAlign(CENTER, CENTER);
  textSize(this.sz);
  text(this.txt, this.pos.x, this.pos.y);
  }

  this.displayLine = function() {
    push()
    strokeWeight(15);
    stroke(this.col);
    if (keyIsPressed) {
      line(this.pos.x, this.pos.y, this.others[this.id + 1].pos.x, this.others[this.id + 1].pos.y);
    }
    pop()
  }

  this.collide = function() { //Code here is based on Keith Peters: https://p5js.org/examples/motion-bouncy-bubbles.html

    for (var i = this.id + 1; i < others.length; i++) {
      var dx = this.others[i].pos.x - this.pos.x;
      var dy = this.others[i].pos.y - this.pos.y;
      var distance = dist(this.pos.x, this.pos.y, this.others[i].pos.x, this.others[i].pos.y);
      var minDist = this.others[i].sz + this.sz;
      if (distance < minDist) {
        var angle = atan2(dy, dx);
        var targetX = this.pos.x + cos(angle) * minDist;
        var targetY = this.pos.y + sin(angle) * minDist;
        var ax = (targetX - this.others[i].pos.x);
        var ay = (targetY - this.others[i].pos.y);
        this.vel.x -= ax;
        this.vel.y -= ay;
        this.others[i].vel.x += ax;
        this.others[i].vel.y += ay;
      }
    }
  }

  this.setMove = function() {
    let force = p5.Vector.fromAngle(this.angle);
    force.mult(pull);
    this.vel.add(force);

    if (this.vel.x <= minSpeed || this.vel.y <= minSpeed) {
      this.vel.x *= accelerate
      this.vel.y *= accelerate
    }
    if (this.vel.x >= maxSpeed || this.vel.y >= maxSpeed) {
      this.vel.y *= decelerate
      this.vel.x *= decelerate
    }
  }

  this.move = function() {
    this.pos.add(this.vel)
  }

  this.edge = function() {
    if (this.pos.x + this.sz / 2 > width) {
      this.pos.x = width - this.sz / 2;
      this.vel.x *= bounce
    } else if (this.pos.x - this.sz / 2 < 0) {
      this.pos.x = this.sz / 2;
      this.vel.x *= bounce
    }
    if (this.pos.y + this.sz / 2 > height) {
      this.pos.y = height - this.sz / 2;
      this.vel.y *= bounce
    } else if (this.pos.y - this.sz / 2 < 0) {
      this.pos.y = this.sz / 2;
      this.vel.y *= bounce
    }
  }
}
