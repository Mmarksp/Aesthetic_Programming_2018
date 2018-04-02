var txt; //text file
var two_alpha = true; //There are two alpha values. It switches between by switching the boolean value from true to false and to true again.
var fonts = [];
var words = [];   //The array containing an object that further containts txt-variable.
var j = 0; //an increment value. Used to go to the next object in words-array.
var cycleNum = 8; //Used with modulo. Basically, every multiple of 8 will trigger an event.

var freak, fft, peakDetect; //var for sound file.

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

  freak = loadSound('LFO-Freak.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  for(let i = 0; i < txt.length; i++) {
    let col = color(random(0, 255), random(0, 255), random(0, 255));
    words[i] = new ord(txt[i], 125, random(fonts), col, width/10, height/4);
  } //First I load all of the object and assign a specific colour, font andc text piece for every object. The amount of objects is based on the amount of lines in the txt-file.

  fft = new p5.FFT(0.1,64);
  peakDetect = new p5.PeakDetect(120, 540, 0.1, 20);

  freak.setVolume(0.3);
  freak.play();
}

function draw() {
    var spectrum = fft.analyze();
      for (var i = 0; i< spectrum.length; i++){
        var x = map(i, 0, spectrum.length, 0, width);
        var h = -height + map(spectrum[i], 0, 255, height, 0);
    }

    words[j].display();
    words[j].fixTimeLoop(cycleNum);
}



class ord {
  constructor(text, textSz, font, col, x, y) {
    this.pos = new createVector(x, y);
    this.text = text;
    this.textSz = textSz;
    this.font = font;
    this.col = col;
  }

  display() {
    var backcol = 0; //Detects peak in frequency. For every detection change bg-colour to white.
    fft.analyze();
    peakDetect.update(fft);
    if (peakDetect.isDetected) {
      backcol = 255;
    } else {
      backcol = 0;
    }

      background(backcol);
      if (two_alpha) { //For every frame switch the value of the boolean variable. This causes a flicker effect.
        this.col.setAlpha(255);
        two_alpha = false
      } else if (!two_alpha) {
        this.col.setAlpha(100);
        two_alpha = true
      }
      fill(this.col);
      textAlign(CENTER, TOP)
      textSize(this.textSz);
      textFont(this.font);
      text(this.text, this.pos.x, this.pos.y, width/1.2, height/1.2);
  }

  fixTimeLoop(num) { //Determines a cycle, which within the frameCount increases and eventually hits multiples of 8. This causes an increase in J, which then switches to the next object aka the next sentence in the text file.
    let n = frameCount*2 % num;
    if (n == 0) {
      j++
    }
  }
}
