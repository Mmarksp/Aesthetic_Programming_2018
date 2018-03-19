//Do note that changing the shape from ellipse to rect, and the other way around as well, can change the experience a lot

class fixation {
  constructor(colour, alpha, x, y, sz, angle, red, green, blue) {
    this.col = colour;
    this.alph = alpha;
    this.pos = new createVector(x, y);
    this.sz = sz;
    this.angle = angle;
    this.vel = new createVector(0, 0);

    this.re = red;
    this.gre = green;
    this.blu = blue;
  }

  show() {
    fill(this.col, this.alph);
    ellipse(this.pos.x, this.pos.y, this.sz, this.sz); //Change this to rectangle!!
  }

  setMovement() {
    let force = p5.Vector.fromAngle(radians(this.angle));
    force.mult(map(this.sz, 0, 150, 4, 0.1));
    this.vel.add(force);
  }

  movement() {
    this.pos.add(this.vel)
  }

  edge() {
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

  setIntercept(index) {
    for(let j = 0; j < fixations.length; j++) {
      let d = dist(changers[index].x, changers[index].y, fixations[j].pos.x, fixations[j].pos.y)
      if (d < fixations[j].sz) {
        ellipse(fixations[j].re, fixations[j].gre, fixations[j].blu, changers[index].alph);
      }
    }
  }

  show() {
    noStroke();
    rect(this.x, this.y, this.sz, this.sz); //Change this to rectangle!!
  }
}
