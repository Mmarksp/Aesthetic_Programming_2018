var txt;      //variabler: txt bliver en array, words er objekter, j er increment og cycleNum er modolu
var words = [];
var j = 0;
var cycleNum = 30;

function preload() {
  txt = loadStrings("words.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let col = random(0, 255); //startvaerdi for farve. Den aendrer sig laengere nede.
  let alpha = 255;
  textSize(72);

  for(let i = 0; i < txt.length; i++) {
    words[i] = new ord(txt[i], random(24, 100), col, alpha, width/2, height/2);  // Det er width/2 og height/2 som skal indstilles til musikken
  } //Alle arrayenheder fra word.txt bliver transformeret til et objekt med argumenter for det enkelte objekt.
}

function draw() {
  words[j].display();
  words[j].fixTimeLoop(cycleNum); //Callback med variabel. FixTimeLoop er alle funktioner, der er afhaengige af modolu.
}



class ord {
  constructor(text, textSz, col, alpha, x, y) { //Vi lader alpha staa, hvis du vil bruge den til musikken. Ellers cutter vi den ud.
    this.pos = new createVector(x, y); //Har ikke nogen anden betydning. Huk at henvise med "this/word[i]".pos.x/y.
    this.text = text;
    this.textSz = textSz;
    this.col = col;
    this.alpha = alpha;
  }

  setPosition() {
    // position, numberOfTextElement       Denne skal nok henvises gennem draw
  }

  display() {
      background(0);
      this.col = random(0, 255);
      // this.alpha = random(200, 255);
      fill(this.col, this.alpha);
      textAlign(CENTER)
      textSize(this.textSz);
      text(this.text, this.pos.x, this.pos.y);
  }

  fixTimeLoop(num) { //NO TOUCH. Aaah. Hvis du vil have noget slaaet sammen med oscillationen, saa put det ind her. Den koeres igennem draw.
    let n = frameCount % num;
    if (n == 0) {
      background(50);
      j++ //Det er random tekst. Den koerer i raekkefoelge.
    }
  }
}
