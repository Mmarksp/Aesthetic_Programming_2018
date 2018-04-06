/*
_____/\\\\\\\\\_____/\\\\\\\\\\\\\____/\\\\\\\\\\\_______________/\\\\\\\\\\\\__/\\\\\\\\\\\__/\\\\\\\\\\\\\\\_____/\\\\\\\\\\\___
 ___/\\\\\\\\\\\\\__\/\\\/////////\\\_\/////\\\///______________/\\\//////////__\/////\\\///__\/\\\///////////____/\\\/////////\\\_
  __/\\\/////////\\\_\/\\\_______\/\\\_____\/\\\________________/\\\_________________\/\\\_____\/\\\______________\//\\\______\///__
   _\/\\\_______\/\\\_\/\\\\\\\\\\\\\/______\/\\\_______________\/\\\____/\\\\\\\_____\/\\\_____\/\\\\\\\\\\\_______\////\\\_________
    _\/\\\\\\\\\\\\\\\_\/\\\/////////________\/\\\_______________\/\\\___\/////\\\_____\/\\\_____\/\\\///////___________\////\\\______
     _\/\\\/////////\\\_\/\\\_________________\/\\\_______________\/\\\_______\/\\\_____\/\\\_____\/\\\_____________________\////\\\___
      _\/\\\_______\/\\\_\/\\\_________________\/\\\_______________\/\\\_______\/\\\_____\/\\\_____\/\\\______________/\\\______\//\\\__
       _\/\\\_______\/\\\_\/\\\______________/\\\\\\\\\\\___________\//\\\\\\\\\\\\/___/\\\\\\\\\\\_\/\\\_____________\///\\\\\\\\\\\/___
        _\///________\///__\///______________\///////////_____________\////////////____\///////////__\///________________\///////////_____
*/
var data = [], words, word = [], gif, gifs, v1 = [], pos, j, canvas;
var xoff = 0.0; //noise variable

function preload() {
  words = loadJSON("encouraging_words.json");
}

function setup() {
  canvas = createCanvas(windowWidth/2, windowHeight/2);
  canvas.position(0,0);
  rectMode(CENTER);
  getRandom();
  askGiphy();
  setInterval(getRandom, 15000);
  setInterval(askGiphy, 15000);
}


function getRandom() {
  removeElements();
  for(let i = 0; i < 6; i++) {
    word[i] = random(words.encouraging_words);
    let ord = createP(word[i]);
    ord.position(50+ 200 * i, 350);
  }
}

function askGiphy() {
  for(i = 0; i < 6; i++) {
    x = 316*i
    data[i] = loadJSON("http://api.giphy.com/v1/gifs/search?q=" + word[i] + "&api_key=dc6zaTOxFJmzC&limit=25", gotData);
  }
}

function gotData(data) {
  let number = floor(random(0, 25));
  console.log(number); //Numrene bliver indlaest!
  // x = random(map(floor(1, 10),0,1,100,1000));
  // y = random(0, height);
  // v1 = new createVector(x, y);
  gifs = createImg(data.data[number].images.fixed_width_downsampled.url);
  // gifs.position(x+100, y);
}

// function textDisplay() {
//     textSize(46);
//     text(word[i], pos.x, pos.y);
// }



// function draw() {
//   for(let i = 0; i < gifs.length; i++) {
//     xoff = xoff + 0.01;
//     let nX = noise(xoff)*width;
//     let nY = noise(xoff)*height;
//     gifs[i].position(nX, nY);
//   }
// }


//                    we have chosen not to use objects for this program,
//                      because it conflicted with the way gif function
// class glitch {
//   constructor(gif, x, y, alpha) {
//     this.gif = gif;
//     this.pos = new createVector(x, y)
//     this.alpha = alpha;
//   }
//
//   display() {
//     image(this.gif, this.pos.x, this.pos.y); //Erstat med Image
//   }
// }
