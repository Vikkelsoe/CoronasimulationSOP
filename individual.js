class Individual {
  constructor(type) {
    if (simulType == 1) {
      this.constructDirPos1();
    } else if (simulType == 2) {
      this.constructDirPos2();
    }

    this.d = 10;
    this.type = type;

    this.expEndTime;
    this.infEndTime;
    this.infPass = false;

    if (this.type == "sus") {
      this.isExp = false;
      this.isInf = false;
      this.isRec = false;
      this.isDea = false;
    } else if (this.type == "exp") {
      this.isExp = true;
      this.isInf = false;
      this.isRec = false;
      this.isDea = false;

      this.expEndTime = initialExpTime;
    }
  }

  draw() {
    if (!this.isExp && !this.isInf && !this.isRec && !this.isDea) {
      fill("green");
    } else if (this.isExp) {
      fill("yellow");
    } else if (this.isInf) {
      fill("red");
    } else if (this.isRec) {
      fill("blue");
    } else if (this.isDea) {
      fill("black");
    }

    circle(this.positionX, this.positionY, this.d);
  }

  move() {
    if (simulType == 1) {
      this.move1();
    } else if (simulType == 2) {
      this.move2();
    }
    this.positionX = this.positionX + this.directionX;
    this.positionY = this.positionY + this.directionY;
  }

  constructDirPos1() {
    this.positionX = random(5, canvasSize - 5);
    this.positionY = random(5, canvasSize - 5);
    this.directionX = random(-5, 5);
    this.directionY = random(-5, 5);
  }

  constructDirPos2() {
    this.positionX = random(5, canvasSize - 5);

    if (this.positionX >= 190 && this.positionX <= 310) {
      randomNum = random();
      if (randomNum >= 0.5) {
        this.positionY = random(5, 190);
      } else {
        this.positionY = random(310, canvasSize - 5);
      }
    } else {
      this.positionY = random(5, canvasSize - 5);
    }

    this.destinationX = random(205, 296);
    this.destinationY = random(205, 296);

    this.randomMultiplier = random(0.01, 0.02);
    this.directionX =
      (this.destinationX - this.positionX) * this.randomMultiplier;
    this.directionY =
      (this.destinationY - this.positionY) * this.randomMultiplier;

    this.StartX = this.positionX;
    this.StartY = this.positionY;

    this.headingIn = true;

    this.distanceToLastGoal =
      ((this.StartX - this.positionX) ** 2 +
        (this.StartY - this.positionY) ** 2) **
      0.5;

    this.travelDistance =
      ((this.destinationX - this.StartX) ** 2 +
        (this.destinationY - this.StartY) ** 2) **
      0.5;
  }

  move1() {
    if (
      this.positionX - this.d / 2 <= 0 ||
      this.positionX + this.d / 2 >= canvasSize
    ) {
      this.directionX = -this.directionX;
    }

    if (
      this.positionY - this.d / 2 <= 0 ||
      this.positionY + this.d / 2 >= canvasSize
    ) {
      this.directionY = -this.directionY;
    }
  }

  move2() {
    if (this.headingIn) {
      this.distanceToLastGoal =
        ((this.StartX - this.positionX) ** 2 +
          (this.StartY - this.positionY) ** 2) **
        0.5;
    } else {
      this.distanceToLastGoal =
        ((this.destinationX - this.positionX) ** 2 +
          (this.destinationY - this.positionY) ** 2) **
        0.5;
    }

    if (this.distanceToLastGoal >= this.travelDistance) {
      this.directionX = -this.directionX;
      this.directionY = -this.directionY;
      this.headingIn = !this.headingIn;
    }
  }
}
