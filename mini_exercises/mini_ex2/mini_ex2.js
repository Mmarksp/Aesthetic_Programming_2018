var sho;
var img;
var img2;
var img3;
var img4;
var img5;
var End;
var y = 150;
var x = 0;
var speed = 400;

function preload() {
  img = loadImage('Images/Fun.jpg');
  img2 = loadImage('Images/img2.jpg');
  img3 = loadImage('Images/img3.jpg');
  img4 = loadImage('Images/img4.jpg');
  img5 = loadImage('Images/img5.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  sho = img;
  image(sho, width/2, height/2, 0, 0);
}
// Setting up the environment. With "Mode"(CENTER) the image is drawn from its center

function draw() {
    if (mouseX >= 1190 && mouseX <= 1220 && mouseY >= 450 && mouseY <= 510) {
      cursor(HAND);
    } else {
      cursor(WAIT);
    }
    // Setting up a second state for cursor logo. I would have used !sho == img4, but it did not work
    noFill();
    stroke(255);
    strokeWeight(2);
    ellipse(x, y, 200, 200);
    x = x + speed
    // Drawing an ellipse and assigning its speed along the x-axis.

  if (x >= width || x <= 0) {
    speed = speed * -1
    x = random(width) + speed
    y = random(height)
  }
  // Adding a bounce effect if it hits the windowWidth + assigning a random y- and x-value

  if (y >= height || y <= 0) {
    y = random(height)
  }
  // If it ends up outside of the canvas on the y-axis, I bring it back in

  if (sho == img5) {
    fill(255);
    noStroke();
    beginShape();
    vertex(1190, 500);
    vertex(1200, 500);
    vertex(1200, 510);
    vertex(1220, 480);
    vertex(1200, 450);
    vertex(1200, 460);
    vertex(1190, 460);
    endShape(CLOSE);
  } else {
    fill(100);
    beginShape();
    vertex(1190, 500);
    vertex(1200, 500);
    vertex(1200, 510);
    vertex(1220, 480);
    vertex(1200, 450);
    vertex(1200, 460);
    vertex(1190, 460);
    endShape(CLOSE);
  }
  // An arrow shape. It is drawn after the ellipses to avoid visible curves on the shape
  // I would have used the exclamation point (!sho == img4), but then it wouldn't draw the shape, even if sho=img.

  if (mouseIsPressed && (mouseX <= 1190 || mouseX >= 1220 || mouseY <= 450 || mouseY >= 510)) {
    fill(255);
    ellipse(mouseX, mouseY, 5, 5);
    return false;
  }
  // If this condition is true, the mouse will paint an ellipse shape in white colour
}

function mousePressed() {
  if (mouseX >= 1190 && mouseX <= 1220 && mouseY >= 450 && mouseY <= 510) {
    if (sho == img) {
        sho = img2;
        image(sho, width/2, height/2, 0, 0);
    } else if (sho == img2) {
        sho = img3;
        image(sho, width/2, height/2, 0, 0);
    } else if (sho == img3) {
        sho = img4;
        image(sho, width/2, height/2, 0, 0);
    } else if (sho == img4) {
        sho = img5;
        image(sho, width/2, height/2, 0, 0);
    } else if (sho == img5) {
        sho = End;
        End = background(0);
        print('memory.txt deleted?');
    }
  }
}
/* Previous arrow shape has become clickable.
 Furthermore, I use the variable, sho, to define a location in a progression of images.
 Thus, the results are that I can have a functioning series of images.
 Previously I would have thought that I needed a command to obtain more than two stages (true vs. false).
 This is achieved within that logic */
