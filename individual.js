class Individual {
  constructor(type) {
    if (simulType == 1) {
      this.positionX = random(5, canvasSize - 5);
      this.positionY = random(5, canvasSize - 5);
      this.directionX = random(-5, 5);
      this.directionY = random(-5, 5);
    } else if (simulType == 2) {
      this.positionX = random(5, canvasSize - 5);
      if (this.positionX >= 200 && this.positionX <= 300) {
        randomNum = random();
        if (randomNum >= 0.5) {
          this.positionY = random(5, 200);
        } else {
          this.positionY = random(300, canvasSize - 5);
        }
      } else {
        this.positionY = random(5, canvasSize - 5);
      }

      this.destinationX = random(205, 296);
      this.destinationY = random(205, 296);

      this.directionX = (this.destinationX - this.positionX) * 0.01;
      this.directionY = (this.destinationY - this.positionY) * 0.01;

      this.headingIn = true;

      this.StartX = this.positionX;
      this.StartY = this.positionY;

      //disse to linjer er nødvendige så this.positionX og Y ikke er lig this.startX og Y i starten. I så fald ville de bevæge sig væk fra midten fra start
      this.positionX = this.positionX + this.directionX;
      this.positionY = this.positionY + this.directionY;
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
    } else if (simulType == 2) {
      if (this.headingIn) {
        if (this.directionX > 0 && this.directionY > 0) {
          if (
            this.positionX >= this.destinationX &&
            this.positionY >= this.destinationY
          ) {
            this.directionX = -this.directionX;
            this.directionY = -this.directionY;
            this.headingIn = false;
          }
        } else if (this.directionX < 0 && this.directionY > 0) {
          if (
            this.positionX <= this.destinationX &&
            this.positionY >= this.destinationY
          ) {
            this.directionX = -this.directionX;
            this.directionY = -this.directionY;
            this.headingIn = false;
          }
        } else if (this.directionX > 0 && this.directionY < 0) {
          if (
            this.positionX >= this.destinationX &&
            this.positionY <= this.destinationY
          ) {
            this.directionX = -this.directionX;
            this.directionY = -this.directionY;
            this.headingIn = false;
          }
        } else if (this.directionX < 0 && this.directionY < 0) {
          if (
            this.positionX <= this.destinationX &&
            this.positionY <= this.destinationY
          ) {
            this.directionX = -this.directionX;
            this.directionY = -this.directionY;
            this.headingIn = false;
          }
        }
      } else {
        if (this.directionX > 0 && this.directionY > 0) {
          if (this.positionX >= this.StartX && this.positionY >= this.StartY) {
            this.directionX = -this.directionX;
            this.directionY = -this.directionY;
            this.headingIn = true;
          }
        } else if (this.directionX < 0 && this.directionY > 0) {
          if (this.positionX <= this.StartX && this.positionY >= this.StartY) {
            this.directionX = -this.directionX;
            this.directionY = -this.directionY;
            this.headingIn = true;
          }
        } else if (this.directionX > 0 && this.directionY < 0) {
          if (this.positionX >= this.StartX && this.positionY <= this.StartY) {
            this.directionX = -this.directionX;
            this.directionY = -this.directionY;
            this.headingIn = true;
          }
        } else if (this.directionX < 0 && this.directionY < 0) {
          if (this.positionX <= this.StartX && this.positionY <= this.StartY) {
            this.directionX = -this.directionX;
            this.directionY = -this.directionY;
            this.headingIn = true;
          }
        }
      }
    }
    this.positionX = this.positionX + this.directionX;
    this.positionY = this.positionY + this.directionY;
  }
}
