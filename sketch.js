sus = [];
exp = [];
inf = [];
rec = [];
dea = [];

populationSize = 500;
canvasSize = 500;

function setup() {
  createCanvas(canvasSize, canvasSize);
  patientZero();
}

function draw() {
  background("grey");
  for (let i = 0; i < sus.length; i++) {
    sus[i].move();
    sus[i].draw();
  }
}

function patientZero() {
  for (let i = 0; i < populationSize; i++) {
    append(sus, new Individual());
    console.log("Done");
  }
}
