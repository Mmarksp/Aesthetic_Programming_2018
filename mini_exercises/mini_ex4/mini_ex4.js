var capture;
var mic;
var Img = [];
var x, y;

class Imgs { //Defining a class with related function. I still need to really practice Object Oriented Programming a lot.
  display(xPs, yPs) { //Structuring code this way helps a lot in larger projects.
    this.xPs = xPs;
    this.yPs = yPs;
    this.x = windowWidth/5;
    this.y = windowHeight/4;

    image(capture, this.xPs, this.yPs, this.x, this.y); //Every image drawn will show the capture feed
  }
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  capture = createCapture();
  capture.size(800,400);
  capture.hide(); //Setup of canvas, capture with camera and then hiding the capture feed

  mic = new p5.AudioIn();
  mic.start(); //Setup of audio

  Img.push(new Imgs()); //This is me adding every new "Imgs" to the array of Img

  let h1 = createElement('h1', "Just speak up");
  // This is me being lazy and just writing this in setup instead of within in its own class
}

function draw() {
  x = windowWidth/5
  y = windowHeight/4
  for(let xPs = 0; xPs < width; xPs += x) {
    for(let yPs = 0; yPs < height; yPs += y) {  //A nested loop determining where to put each image of the capture feed.
      for(let i = 0; i < Img.length; i++) { //This is to progress the array
        Img[i].display(xPs, yPs);
      }
    }
  }
  microphone_and_colouring(); //This is lazy me putting the rest into one function and pretending my code is "cleaned up"
}


function microphone_and_colouring() {
  let vol = mic.getLevel();
  let backgroundcolour = color(255);
  backgroundcolour.setAlpha(map(vol, 0, 1, 255, 0)); //By using map, I can take the value of the mic input and control the transparency of the canvas
  background(backgroundcolour);
}
