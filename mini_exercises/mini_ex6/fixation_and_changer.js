class fixation { //colour of object, opaqueness, x-position, y-position, size (width and height), angle of moving direction, colour values for interaction with changers.
  constructor(colour, alpha, x, y, sz, angle, red, green, blue) {
    this.col = colour;
    this.alph = alpha;
    this.pos = new createVector(x, y);
    this.sz = sz;
    this.angle = angle;
    this.vel = new createVector(0, 0); //The speed in a direction that I then add to the this.pos later

    this.re = red;
    this.gre = green;
    this.blu = blue;
  }

  show() {
    fill(this.col, this.alph);
    if (toggle_fixation == true) { //Boolean variable determining its shape.
      ellipse(this.pos.x, this.pos.y, this.sz, this.sz);
    } else {
      rect(this.pos.x, this.pos.y, this.sz, this.sz);
    }
  }

  setMovement() { //A vector is defined as force. It has a fixed angle.
    let force = p5.Vector.fromAngle(radians(this.angle));
    force.mult(map(this.sz, 0, 150, 5, 0.1)); //This force is multiplied with values stemming from 4 to 0.1. The value is determined by the size of the object. Big = slow. Small = fast.
    this.vel.add(force); //The vector speed and angle is added to the initial vector. Makes me think if couldn't just leave out creating the "force"-variable and going directly with this.vel.
  }

  movement() {
    this.pos.add(this.vel) //The final setMovement is then added to the position of the object, making the object move.
  }

  edge() { //Going over an edge moves you to the opposite side.
    if (this.pos.x > width + this.sz) {
      this.pos.x = -this.sz
    } else if (this.pos.x < -this.sz) {
      this.pos.x = width + this.sz
    }
    if (this.pos.y > height + this.sz) {
      this.pos.y = -this.sz
    } else if (this.pos.y < -this.sz) {
      this.pos.y = height + this.sz
    }
  }
}



class changer {
  constructor(col, alph, x, y, sz) {
    this.col = col;
    this.alph = alph;
    this.x = x;
    this.y = y;
    this.sz = sz;
  }

  setIntercept(index) { //The index number of changers[] as argument here is used to get all of the changers through this function.
    for(let j = 0; j < fixations.length; j++) { //Goes through all of the drawn fixations. I think this especially makes the program demanding on computers. Every changer needs to check for all of the fixations for 30 times a second (framerate).
      let d = dist(changers[index].x, changers[index].y, fixations[j].pos.x, fixations[j].pos.y) //The dist is the distance between location of the changer and the fixation.
      if (d < changers[index].sz/2 + fixations[j].sz/2) { //This is only true if those two objects are intersecting one another. Half the size is because the ojects are drawn from the CENTER.
        fill(fixations[j].re, fixations[j].gre, fixations[j].blu, changers[index].alph); //Every fixation brings its own colour!
      }
    } // Very interestingly, it is all of the changers that are affected if just one fixation is touching a changer. This was unexpected, but ultimately proved to be something I wanted.
  } //Furthermore, this is just me guessing, but I think the reason why not all changers then turn only one colour even if many fixations are touching, is related to the query of changers as they are drawn.
    //If a fixation with blue colour touches changer[1], and a fixation with green colour touches changer[200], then changer[1] through changer [199] will be blue, and the rest will be green. This is just me guessing.

  show() {
    noStroke();
    if (toggle_changer == true) {
      rect(this.x, this.y, this.sz, this.sz);
    } else {
      ellipse(this.x, this.y, this.sz, this.sz);
    }
  }
}
