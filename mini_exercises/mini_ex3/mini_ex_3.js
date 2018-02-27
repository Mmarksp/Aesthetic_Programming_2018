var distanceIncr = [0.5, 1, 3, 5];
var rotationSpd = [0.25, 0.3, 0.5, 0.75, 1, 10, 100];
var rndomStart = [0.1, 0.5, 1];
var rndomEnd = [1, 1.5, 2];
var arcOpen = [10, 20, 50, 75, 100, 150, 180];

var sz;
var r;
var g;
var b;
var DInc;
var RSpd;
var RStart;
var RStop;        //Top: Selection of variables meant to be tampered with
var ArcO;         //Bottom: See their use in setup

function setup() {
createCanvas(windowWidth, windowHeight);
background(0);
angleMode(DEGREES);
r = random(0,255);
g = random(0,255);
b = random(0,255);
DInc = random(distanceIncr);
RSpd = random(rotationSpd);     //picks a random parameter from arrays
RStart = random(rndomStart);
RStop = random(rndomEnd);
ArcO = random(arcOpen);
sz = 0;
}

function draw() {
  noFill();
  strokeWeight(1);

  Circle1();   //Had plans for displaying three circles besides each other
  /*Circle2()  //They would have initiated one another so that a continuous
  Circle3()*/  //cycle of circles would commence = thobber.
}

function Circle1() {
    push()    //Important with other circles as called in draw()
    translate(width/2, height/2); //center of screen
    sz = sz + DInc;   //expansion of circle figure
    stroke(r, g, b, 50);
    rotate(frameCount*RSpd);    //fCount is one way to realize a rotation
    if (sz == 300 || sz == -300) {    //The second conditional statement is a guess, but it works
      DInc = DInc * -1;   //Expansion or withdrawal of circle figure
      RSpd = RSpd * -random(RStart,RStop);  //new rotation speed
    }
    arc(0, 0, sz, sz, 0, ArcO); //expanding (or withdrawing) figure
    pop()
}

function mousePressed() {
  setup();    //...
  draw();     //so easy, so very easy. And yet. Oh well.
}
