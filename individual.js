class Individual {
  constructor() {
    this.positionX = random(5, canvasSize - 5);
    this.positionY = random(5, canvasSize - 5);
    this.directionX = random(-5, 5);
    this.directionY = random(-5, 5);
    this.d = 10;
    this.isExp = false;
    this.isInf = false;
    this.isRec = false;
    this.isDea = false;
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

    this.positionX = this.positionX + this.directionX;
    this.positionY = this.positionY + this.directionY;
  }
}
