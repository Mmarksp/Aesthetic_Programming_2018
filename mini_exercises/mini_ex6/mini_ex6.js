new p5(); //I need to write this in order to utilize random() outside of a function

var fixations = []; //These are my two objects named after some characteristics about them
var changers = [];

var background_colour = random(255);

var fixations_amount = [3, 5, 10, 15, 30];
var fixations_size = [5, 10, 30, 100, 150];
var fixation_colour = [0, 55, 100, 155, 200, 255];
var fixation_alpha = [20, 60, 100, 150, 200, 255];  //I have named arrays of setups that I want my program to be able to choose from.

var changers_amount = [25, 50, 75, 100, 250, 500, 750, 950]; //If you have trouble running my program, try removing the highest number in size and amount of both objects.
var changers_size = [25, 50, 100, 100, 150];
var changers_alpha = [30, 40, 50, 100, 150, 230];

var toggle_fixation = Math.random() >= 0.5; //credit: https://gist.github.com/pavelbinar/6333285
var toggle_changer = Math.random() >= 0.5; //This gives me a random true/false-value for every reload of the page. This them determines, whether the shapes will be squares or circles.



function setup() { //I have started by defining a variable for a random value of all of the arrays.
  var fix_am = random(fixations_amount);
  var fix_sz = random(fixations_size);
  var fix_col = random(fixation_colour);
  var fix_alph = random(fixation_alpha);

  var chan_am = random(changers_amount);
  var chan_sz = random(changers_size);
  var chan_alph = random(changers_alpha);

  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  rectMode(CENTER);
  frameRate(30); //fixing a reduced framerate improves the program, as it was very demanding on my computer


  for(let i = 0; i < fix_am; i++) { //I first create a loop making ready for a specified amount of objects. The colour values in the last three parameters are meant for colouring the changers.
    fixations[i] = new fixation(fix_col, fix_alph, random(width), random(height), random(fix_sz), random(0, 360), random(255), random(255), random(255));
    fixations[i].setMovement() //Here I fix a movement speed in a given direction.
  }

  for(let i = 0; i < chan_am; i++) { //Similarly with the other class of object
    changers[i] = new changer(random(255), chan_alph, random(width), random(height), random(chan_sz));
    fill(changers[i].col, changers[i].alph) //I also state an initial colour prior to being interacted with by the "fixations".
  }
}


function draw() {
  background(background_colour);

  for(let i = 0; i < fixations.length; i++) {
    push()
    fixations[i].edge(); //Going over the edge of the canvas means ending up at the opposite edge.
    fixations[i].movement(); //Here I then continuously draw the previously fixed speed in a fixed direction.
    fixations[i].show(toggle_fixation); //The argument here is to determine the shape from the other js-file.
    pop()
  }

  for (let i = 0; i < changers.length; i++) {
    changers[i].setIntercept(i); //I continuously determine if a fixation is touching a changer. Funny unanticipated results happened through the use of such function.
    changers[i].show(toggle_changer);
  }
}


function keyPressed() { //Ability for the user to change the shape of the objects, while the sketch is running.
  if (keyCode == 90) { //Z
    toggle_fixation = !toggle_fixation;
  }
  if (keyCode == 88) { //X
    toggle_changer = !toggle_changer;
  }
}
