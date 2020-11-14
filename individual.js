class Individual {
  constructor(type) {
    if (simulType == 1) {
      this.constructDirPos1();
    } else if (simulType == 2) {
      this.constructDirPos2(type);
    } else if (simulType == 3) {
      this.constructDirPos3();
    } else if (simulType == 4) {
      this.constructDirPos4();
    } else if (simulType == 5 || simulType == 6 || simulType == 7) {
      this.constructDirPos567();
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

      this.expEndTime = simulStart + initialExpTime;
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
    } else if (simulType == 3) {
      this.move3();
    } else if (simulType == 4) {
      this.move4();
    } else if (simulType == 5 || simulType == 6 || simulType == 7) {
      this.move567();
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

  constructDirPos2(type) {
    if (type == "exp") {
      this.positionX = 250;
      this.positionY = 250;
    } else {
      this.positionX = ((spawnCounter * 21) % 500) + 5;
      this.positionY = floor(spawnCounter / 23) * 23 + 5;
    }
    this.directionX = random(-5, 5);
    this.directionY = random(-5, 5);
  }

  constructDirPos3() {
    this.positionY = random(5, canvasSize - 5);
    if (this.positionY > 450) {
      this.positionX = random(5, canvasSize - 55);
    } else {
      this.positionX = random(5, canvasSize - 5);
    }

    this.directionX = random(-5, 5);
    this.directionY = random(-5, 5);

    this.inQuarantine = false;
  }

  constructDirPos4() {
    this.positionX = random(5, canvasSize - 5);

    if (this.positionX >= 190 && this.positionX <= 310) {
      randomNum = random();
      if (randomNum <= 0.5) {
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

  constructDirPos567() {
    this.homeBox = int(random(1, 5));

    switch (this.homeBox) {
      case 1:
        this.positionX = random(30, 220);
        this.positionY = random(30, 220);
        break;
      case 2:
        this.positionX = random(280, 470);
        this.positionY = random(30, 220);
        break;
      case 3:
        this.positionX = random(30, 220);
        this.positionY = random(280, 470);
        break;
      case 4:
        this.positionX = random(280, 470);
        this.positionY = random(280, 470);
    }

    randomNum = random();
    switch (simulType) {
      case 5:
        if (randomNum <= 0.5) {
          this.traveller = true;
        } else {
          this.traveller = false;
        }
        break;

      case 6:
        if (randomNum <= 0.1) {
          this.traveller = true;
        } else {
          this.traveller = false;
        }
        break;

      case 7:
        this.traveller = false;
    }

    if (this.traveller) {
      this.destinationBox = int(random(1, 5));

      switch (this.destinationBox) {
        case 1:
          this.destinationX = random(30, 220);
          this.destinationY = random(30, 220);
          break;
        case 2:
          this.destinationX = random(280, 470);
          this.destinationY = random(30, 220);
          break;
        case 3:
          this.destinationX = random(30, 220);
          this.destinationY = random(280, 470);
          break;
        case 4:
          this.destinationX = random(280, 470);
          this.destinationY = random(280, 470);
      }

      this.randomMultiplier = random(0.01, 0.02);
      this.directionX =
        (this.destinationX - this.positionX) * this.randomMultiplier;
      this.directionY =
        (this.destinationY - this.positionY) * this.randomMultiplier;

      this.StartX = this.positionX;
      this.StartY = this.positionY;

      this.headingOut = true;

      this.distanceToLastGoal =
        ((this.StartX - this.positionX) ** 2 +
          (this.StartY - this.positionY) ** 2) **
        0.5;

      this.travelDistance =
        ((this.destinationX - this.StartX) ** 2 +
          (this.destinationY - this.StartY) ** 2) **
        0.5;
    } else {
      this.directionX = random(-5, 5);
      this.directionY = random(-5, 5);
    }
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
    if (
      this.socialDistancing(sus) ||
      this.socialDistancing(exp) ||
      this.socialDistancing(inf) ||
      this.socialDistancing(rec)
    ) {
      //this.positionX = this.positionX - this.directionX;
      //this.positionY = this.positionY - this.directionY;
      this.directionX = -this.directionX;
      this.directionY = -this.directionY;
    }

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

  socialDistancing(list) {
    for (let i = 0; i < list.length; i++) {
      if (
        ((this.positionX - list[i].positionX) ** 2 +
          (this.positionY - list[i].positionY) ** 2) **
          0.5 <=
          this.d &&
        ((this.positionX - list[i].positionX) ** 2 +
          (this.positionY - list[i].positionY) ** 2) **
          0.5 !=
          0
      ) {
        return true;
      }
    }
  }

  move3() {
    if (this.isInf == true && this.inQuarantine == false) {
      this.inQuarantine = true;
      this.positionX = random(455, 495);
      this.positionY = random(455, 495);
      this.directionX = 0;
      this.directionY = 0;
    } else if (this.isInf == false && this.inQuarantine == true) {
      this.inQuarantine = false;
      this.directionX = random(-5, 5);
      this.directionY = random(-5, 5);
    } else if (this.inQuarantine == false) {
      if (
        this.positionX - this.d / 2 <= 0 ||
        this.positionX + this.d / 2 >= canvasSize ||
        (this.positionX + this.d / 2 >= 450 &&
          this.positionY + this.d / 2 >= 450 &&
          this.positionX + this.d / 2 - this.directionX < 450)
      ) {
        this.directionX = -this.directionX;
      }

      if (
        this.positionY - this.d / 2 <= 0 ||
        this.positionY + this.d / 2 >= canvasSize ||
        (this.positionX + this.d / 2 >= 450 &&
          this.positionY + this.d / 2 >= 450 &&
          this.positionY + this.d / 2 - this.directionY < 450)
      ) {
        this.directionY = -this.directionY;
      }
    }
  }

  move4() {
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

  move567() {
    if (this.traveller) {
      if (this.headingOut) {
        this.distanceToLastGoal =
          ((this.StartX - this.positionX) ** 2 +
            (this.StartY - this.positionY) ** 2) **
          0.5;
        if (this.distanceToLastGoal >= this.travelDistance) {
          this.directionX = -this.directionX;
          this.directionY = -this.directionY;
          this.headingOut = !this.headingOut;
        }
      } else {
        this.distanceToLastGoal =
          ((this.destinationX - this.positionX) ** 2 +
            (this.destinationY - this.positionY) ** 2) **
          0.5;
        if (this.distanceToLastGoal >= this.travelDistance) {
          this.destinationBox = int(random(1, 5));

          switch (this.destinationBox) {
            case 1:
              this.destinationX = random(30, 220);
              this.destinationY = random(30, 220);
              break;
            case 2:
              this.destinationX = random(280, 470);
              this.destinationY = random(30, 220);
              break;
            case 3:
              this.destinationX = random(30, 220);
              this.destinationY = random(280, 470);
              break;
            case 4:
              this.destinationX = random(280, 470);
              this.destinationY = random(280, 470);
          }
          this.travelDistance =
            ((this.destinationX - this.StartX) ** 2 +
              (this.destinationY - this.StartY) ** 2) **
            0.5;
          this.directionX =
            (this.destinationX - this.positionX) * this.randomMultiplier;
          this.directionY =
            (this.destinationY - this.positionY) * this.randomMultiplier;
          this.headingOut = !this.headingOut;
        }
      }
    } else {
      switch (this.homeBox) {
        case 1:
          if (
            this.positionX + this.d / 2 >= 225 ||
            this.positionX - this.d / 2 <= 25
          ) {
            this.directionX = -this.directionX;
          }
          if (
            this.positionY + this.d / 2 >= 225 ||
            this.positionY - this.d / 2 <= 25
          ) {
            this.directionY = -this.directionY;
          }
          break;
        case 2:
          if (
            this.positionX + this.d / 2 >= 475 ||
            this.positionX - this.d / 2 <= 275
          ) {
            this.directionX = -this.directionX;
          }
          if (
            this.positionY + this.d / 2 >= 225 ||
            this.positionY - this.d / 2 <= 25
          ) {
            this.directionY = -this.directionY;
          }
          break;
        case 3:
          if (
            this.positionX + this.d / 2 >= 225 ||
            this.positionX - this.d / 2 <= 25
          ) {
            this.directionX = -this.directionX;
          }
          if (
            this.positionY + this.d / 2 >= 475 ||
            this.positionY - this.d / 2 <= 275
          ) {
            this.directionY = -this.directionY;
          }
          break;
        case 4:
          if (
            this.positionX + this.d / 2 >= 475 ||
            this.positionX - this.d / 2 <= 275
          ) {
            this.directionX = -this.directionX;
          }
          if (
            this.positionY + this.d / 2 >= 475 ||
            this.positionY - this.d / 2 <= 275
          ) {
            this.directionY = -this.directionY;
          }
      }
    }
  }
}
