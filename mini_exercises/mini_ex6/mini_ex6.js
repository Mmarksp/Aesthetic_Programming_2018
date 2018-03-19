new p5();

var fixations = [];
var changers = [];

var bg_col = random(0, 255);

var fixations_amount = [3, 5, 10, 15, 30];
var fixations_size = [5, 10, 30, 100];
var fixation_colour = [0, 55, 100, 155, 200, 255];
var fixation_alpha = [0, 20, 100, 200, 255];

var changers_amount = [5, 10, 50, 75, 100, 500, 750];
var changers_size = [25, 50, 100, 100, 150, 250];
var changers_alpha = [10, 20, 20, 30, 40, 50, 100, 150, 255];



var fix_am = random(fixations_amount);
var fix_sz = random(fixations_size);
var fix_col = random(fixation_colour);
var fix_alph = random(fixation_alpha);

var chan_am = random(changers_amount);
var chan_sz = random(changers_size);
var chan_alph = random(changers_alpha);






function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(RADIUS);
  rectMode(CENTER);


  for(let i = 0; i < fix_am; i++) {
    fixations[i] = new fixation(fix_col, fix_alph, random(width), random(height), random(fix_sz), random(0, 360), random(255), random(255), random(255));
    fixations[i].setMovement()
  }

  for(let i = 0; i < chan_am; i++) {
    changers[i] = new changer(random(255), chan_alph, random(width), random(height), random(chan_sz));
    fill(changers[i].col, changers[i].alph)
  }
}


function draw() {
  background(bg_col);

  for(let i = 0; i < fixations.length; i++) {
    push()
    fixations[i].edge();
    fixations[i].movement();
    fixations[i].show();
    pop()
  }

  for (let i = 0; i < changers.length; i++) {
    changers[i].setIntercept(i);
    changers[i].show();
  }
}
