var img1, img2;
var enemies = [];
var avat;
var bullets = [];       //Defining variables for the three objects/arrays of objects, and then two for images


function preload() {
  img = loadImage("Images/space.jpg");
  img2 = loadImage("assets/asteroids_ship0001.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  imageMode(CENTER);    //Setting up preconditions for x- and y-values for rendering shapes and images. Changing angle from radians to degrees.
  angleMode(DEGREES);
//Player avatar. First four parameters are position and size. Next two are speed forward and backward. Second to last is decrease of speed. Last is rotation speed.
  avat = new avatar(width/2, height*0.75, 30, 18, 0.5, 0.2, 0.95, 3);   //Player avatar. See class for specific description of these parameters.

  enemies[0] = new square(width/2, height/4, 25, 25); //spawning first object prior to draw.

  bullets[0] = new bullet(width/2, height/4, 10); //Likewise here. However, it would be preferable if I could begin without it, as it the first instantation is not used.
}


function draw() {
  image(img, width/2, height/2, width, height);
        //Rendering the multiple functions for player avatar. They are ongoing as they are always ready for player input.
  avat.turn();    //Turning the ship
  avat.propel();    //Propelling the ship forward og backward
  avat.edges();    //Managing propelling outside the edges of the canvas - just as in Asteroids.
  avat.display();   //Simply displaying

  for(let i = 0; i < enemies.length; i++) { //with enemies.length, it will draw every instantation as they are initiated (for enemies it happens with mousePressed)
    enemies[i].display(); //simple display of square
    enemies[i].shoot();  //calling on the class "bullet". Their shooting does not work properly.
  }
} //I wanted a setInterval-effect on .shoot so as to have automation of shooting, but with a slight delay.


//All of the player operations
function keyPressed() {
  if (keyCode == 68) { //D
    avat.setRotation(avat.rotation_speed_thrusters) //rotation is set to 3 (rotation_speed_thrusters)
  } else if (keyCode == 65) { //A
    avat.setRotation(-avat.rotation_speed_thrusters) //negative symbol
  } else if (keyCode == 87) {  //W
    avat.thrusting_forward(true)                  //boolean value. If released it becomes false.
  } else if (keyCode == 83) {  //S
    avat.thrusting_backward(true)
  }
}

function keyReleased() {
  if (keyCode == 68) {
    avat.setRotation(0);
  } else if (keyCode == 65) {
    avat.setRotation(0);
  } else if (keyCode == 87) {
    avat.thrusting_forward(false);
  } else if (keyCode == 83) {
    avat.thrusting_backward(false);
  }
}

function mousePressed() {
  for(let i = 0; i < enemies.length; i++) {  //whichever enemy.object is rendered, clicking on it will initiate its death
    enemies[i].death();
  }
}




//Here come the classes. Sorry if it is a mess.
class square {
  constructor(x, y, xSz, ySz) {
    this.pos = new createVector(x, y); //x and y are combined in a vector, which I can refer to if needed
    this.xSz = xSz; //size
    this.ySz = ySz;
  }

  display() {
    noStroke();
    fill('red');
    rect(this.pos.x, this.pos.y, this.xSz, this.ySz);
  }

  shoot() {
      let boom = new bullet(this.pos, 10);    //new object. It's starting location is the square object's location (this.pos)
      append(bullets, boom);          //that is added to the array "bullets"
      bullets.splice(0, 1);       //and previous one (and in the first instantation the one expendable) removed from array. Yes I did not actually need an array for this.
      for(let i = 0; i < bullets.length; i++) {
        bullets[0].direction();
        bullets[0].movement();      //I don't know if it is in this loop, where the mistake with the bullets lie.
        bullets[0].display();
      }
  }

  death() {
    let click_access = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if (click_access < this.xSz && click_access < this.ySz) {   //can only be initiated if mouse clicks on the object specifically, and not just the canvas.
      let x = random(20, width - 20);     //Next instantation needs a new starting location
      let y = random(20, height - 20);
      let ny = new square(x, y, 25, 25);
      append(enemies, ny);
      enemies.splice(0, 1);   //new object, added to array, previous one is removed. Again, I could have done something easier, since there really only needs to be one object for this.
    }
  }
}


class bullet {
  constructor(ePos, radius) { //starting location calls on a vector, not the two individual values
    this.pos = new createVector(ePos.x, ePos.y); //though they certaintly need to be defined here. This.pos is also not for this class and not square.
    this.radius = radius;
  }

  display() {
    fill('green');
    ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
  }

  movement() {
    this.vel = p5.Vector.fromAngle(this.angle); //Attempt at increasing speed. The idea was to have the square shoot a ball at the player avatar.
    this.vel.mult(15); //It is velocity/speed in a defined direction specified with fromAngle. I think adding a "force effect" (see further below) could solve this.
    this.pos.add(this.vel); //this is then added to the starting location.
  }

  direction() { //Defining the direction through the use of trigonometry. I wanted the direction of the bullet to be towards the player avatar.
    var dy = avat.pos.y - this.pos.y
    var dx = avat.pos.x - this.pos.x
    this.angle = radians(atan2(dy, dx)); //special function after determining the relation between two locations that will then produce the corresponding angle.
  }
}


class avatar {
  constructor(x, y, xSz, ySz, forward, backward, friction, rotation_speed) {
    this.pos = new createVector(x, y);
    this.xSz = xSz;
    this.ySz = ySz;
    this.main_thrusters_forward = forward;
    this.main_thrusters_backward = backward;
    this.friction_thrusters = friction;   //Duh. There is no friction in Space. So it must be simulated.
    this.rotation_speed_thrusters = rotation_speed;

    this.direction = 270; //the image is pointing to the right so I rotate it 270 so that it points forward
    this.rotation = 0;    //starts at 0, shifts between 0 and 3 through user rotation.

    this.vel = new createVector(0, 0);
    this.isThrusting = false; //Starts off being false. Is changed with W or D
  }

  display() {
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.direction); //the image is pointing to the right so I spin it 270 degrees
    image(img2, 0, 0, this.xSz, this.ySz);
    pop()
  }

  edges() { //Makes sure the avatar pops up on the other side if the edge of the canvas is crossed
    if (this.pos.x > width + this.xSz) {
      this.pos.x = -this.xSz
    } else if (this.pos.x < -this.xSz) {
      this.pos.x = width + this.xSz
    }

    if (this.pos.y > height + this.ySz) {
      this.pos.y = -this.ySz
    } else if (this.pos.y < -this.ySz) {
      this.pos.y = height + this.ySz
    }
  }

  propel() {
    if (this.isThrustingForward) {    //If the boolean value is true, then full speed ahead.
      this.thrust_forward()
    } else if (this.isThrustingBackward) {    //Same goes for backwards.
      this.thrust_backward()
    }
    this.pos.add(this.vel)      //Adding the speed to the starting locations
    this.vel.mult(this.friction_thrusters)  //and then adding a friction effect. Try changing it to 1 for a fun experience.
  }

      thrust_forward() {
        let force = p5.Vector.fromAngle(radians(this.direction)) //direction is where the image is pointing.
        force.mult(this.main_thrusters_forward)   //Add a force-effect so that the speed dynamically increases. It is impacted by the friction effect.
        this.vel.add(force);
      }

      thrust_backward() {
        let force = p5.Vector.fromAngle(radians(this.direction - 180))
        force.mult(this.main_thrusters_backward);
        this.vel.add(force);
      }

      thrusting_forward(b) {      //are either true or false depending on keyPressed or keyReleased
        this.isThrustingForward = b;
      }

      thrusting_backward(b) {
        this.isThrustingBackward = b;
      }


  turn() {
    this.direction += this.rotation //this.direction is fixed and setRotation() defines this.rotation
  }

      setRotation(angle) {
        this.rotation = angle //angle is defined through user operation - namely keyPressed and keyReleased
      }


  death() {   //Did not quite make it that far.

  }
}
