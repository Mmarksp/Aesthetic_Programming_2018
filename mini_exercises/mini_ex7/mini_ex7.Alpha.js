var txt, data;      //variabler: txt bliver en array, words er objekter, j er increment og cycleNum er modolu
var two_alpha = true;
var fonts = [];
var words = [];
var j = 0;
var cycleNum = 15;

function preload() {
  txt = loadStrings("words.txt");

  fonts[0] = loadFont('fonts/Boulding Work St.ttf');
  fonts[1] = loadFont('fonts/Alien.ttf');
  fonts[2] = loadFont('fonts/ninjagarden.ttf');
  fonts[3] = loadFont('fonts/budmo.ttf');
  fonts[4] = loadFont('fonts/ka1.ttf');
  fonts[5] = loadFont('fonts/LLPIXEL3.ttf');
  fonts[6] = loadFont('fonts/distortion.ttf');
  fonts[7] = loadFont('fonts/04b_30.ttf');
  fonts[8] = loadFont('fonts/2025.ttf');
  fonts[9] = loadFont('fonts/JordanBoldGrunge.ttf');
  fonts[10] = loadFont('fonts/Quesat Regular Demo.otf');
  fonts[11] = loadFont('fonts/Prisma.ttf');
  fonts[12] = loadFont('fonts/odessa.ttf');
  fonts[13] = loadFont('fonts/insider.ttf');
  fonts[14] = loadFont('fonts/Khalijaka.ttf');
  fonts[15] = loadFont('fonts/pixelchunker.ttf');
  fonts[16] = loadFont('fonts/SPACEBOY.ttf');
  fonts[17] = loadFont('fonts/Robotica.ttf');
  fonts[18] = loadFont('fonts/GriddyBlocks.ttf');
  fonts[19] = loadFont('fonts/BLUEFISH STENCIL DEMO.otf');
  fonts[20] = loadFont('fonts/Forvertz.ttf');
  fonts[21] = loadFont('fonts/BitMap.ttf');
  fonts[22] = loadFont('fonts/InvertedStencil.ttf');
  fonts[23] = loadFont('fonts/Withheld Data.otf');
  fonts[24] = loadFont('fonts/Cuatra-Bold.ttf');
  fonts[25] = loadFont('fonts/Quick.ttf');
  fonts[26] = loadFont('fonts/Danger on the Motorway.otf');
  fonts[27] = loadFont('fonts/UrbanInline.ttf');
  fonts[28] = loadFont('fonts/Doctor Glitch.otf');
  fonts[29] = loadFont('fonts/Slope Opera.otf');
  fonts[30] = loadFont('fonts/Domotika-Regular-trial.ttf');
  fonts[31] = loadFont('fonts/Screwdriver.otf');
  fonts[32] = loadFont('fonts/MaroonBold.ttf');
  fonts[33] = loadFont('fonts/AtariBold.ttf');
  fonts[34] = loadFont('fonts/TronBoldInline.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(27);

  for(let i = 0; i < txt.length; i++) {
    let col = color(random(0, 255), random(0, 255), random(0, 255)); //startvaerdi for farve. Den aendrer sig laengere nede.
    words[i] = new ord(txt[i], 125, random(fonts), col, width/10, height/4);  // Det er width/2 og height/2 som skal indstilles til musikken
  } //Alle arrayenheder fra word.txt bliver transformeret til et objekt med argumenter for det enkelte objekt.
}

function draw() {
  words[j].display();
  words[j].fixTimeLoop(cycleNum); //Callback med variabel. FixTimeLoop er alle funktioner, der er afhaengige af modolu.
}



class ord {
  constructor(text, textSz, font, col, x, y) { //Vi lader alpha staa, hvis du vil bruge den til musikken. Ellers cutter vi den ud.
    this.pos = new createVector(x, y); //Har ikke nogen anden betydning. Huk at henvise med "this/word[i]".pos.x/y.
    this.text = text;
    this.textSz = textSz;
    this.font = font;
    this.col = col;
  }

  display() {
      background(0);
      if (two_alpha) {
        this.col.setAlpha(255);
        two_alpha = false
      } else if (!two_alpha) {
        this.col.setAlpha(0);
        two_alpha = true
      }
      fill(this.col);
      textAlign(CENTER, TOP)
      textSize(this.textSz);
      textFont(this.font);
      text(this.text, this.pos.x, this.pos.y, width/1.2, height/1.2);
  }

  fixTimeLoop(num) { //NO TOUCH. Aaah. Hvis du vil have noget slaaet sammen med oscillationen, saa put det ind her. Den koeres igennem draw.
    let n = frameCount % num;
    if (n == 0) {
      j++ //Det er random tekst. Den koerer i raekkefoelge.
    }
  }
}
