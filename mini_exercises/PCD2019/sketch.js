var what = [];
var where = [];
var when = [];
//"P","R","O","C","E","S","S","I","N","G"," ","C","O","M","M","U","N","I","T","Y"," ","D","A","Y"," ","2","0","1","9"
var tempWhat;
var whatStrings = "Processing Community Day";
var tempWhere;
var whereStrings = "@ DOKK1";
var tempWhen;
var whenStrings = "09-02-19"; //In that case I'd need to do something about this. Create one string first of all and then later (since it is stil an array) split it up in the object.

var txtSize = 12;
var box = [];

function setup() {
  createCanvas(400, 400);
  rectMode(RADIUS);
  textSize(txtSize);
  textAlign(CENTER); //Attempting to get width from whatStrings - to get a starting position
  //IDEA: Instead of having a box I may just want to have one stringline and then on impact create new objects that go everywhere

  tempWhat = new Letter(
    whatStrings,
    width/2,
    height*0.25,
    txtSize
  )

  tempWhere = new Letter(
    whereStrings,
    width/2,
    height*0.50,
    txtSize
  )

  tempWhen = new Letter(
    whenStrings,
    width/2,
    height*0.75,
    txtSize
  )

  let tempWidth = textWidth(whatStrings);
  whatStrings = ["Processing Community Day"];
  what[0] = new Letter(
    whatStrings[0],
    width/2 - textWidth/2,
    height*0.25,
    txtSize
  )
  for(let i = 1; i < whatStrings.length; i++) {
    what[i] = new Letter(
      whatStrings[i],
      what[i-1].x + textWidth(whatStrings[0]),
      height*0.30,
      txtSize
    )
  }

  // for(let i = 0; i <= box.length; i++) { //I'd then not need this
  //   box[i] = new Box(
  //     width
  //   ) //Use dist to calculate required width. Use ascent and descent.
  // }
}

function draw() {
  background(220);
  tempWhat.display();
  tempWhere.display();
  tempWhen.display();

  for(let i = 0; i < what.length; i++) {
    what[i].display();
  }
}

function Letter(txt, x, y, sz) {
  this.txt = txt;
  this.x = x;
  this.y = y;
  this.sz = sz;

  this.display = function() {
    textAlign(CENTER, CENTER);
    textSize(this.sz);
    text(txt, x, y);
  }
}

function Box(x, y, rX, rY) {
  this.x = x;
  this.y = y;
  this.rX = rX;
  this.rY = rY;

  this.display = function() {
    rect(this.x, this.y, this.rX, this.rY);
  }
}




for(let i = 0; i <= tempWhat.length; i++) {
  what[i] = new Letter(tempWhat[i], height*0.25, width/2, txtSize);
}
for(let i = 0; i <= tempWhere.length; i++) {
  where[i] = new Letter(tempWhere[i], height*0.50, width/2, txtSize);
}
for(let i = 0; i <= tempWhen.length; i++) {
  when[i] = new Lettet(te)
}
