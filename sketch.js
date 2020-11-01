let simulType = 2;

let sus = [];
let exp = [];
let inf = [];
let rec = [];
let dea = [];

let tAkk = [];
let susAkk = [];
let expAkk = [];
let infAkk = [];
let recAkk = [];
let deaAkk = [];

let tData = "t: ";
let susData = "sus: ";
let expData = "exp: ";
let infData = "inf: ";
let recData = "rec: ";
let deaData = "dea: ";

let populationSize = 500;
let canvasSize = 500;

let randomNum;
let riskRadius = 10;
let expProb = 0.01;
let infProb = 0.5;
let deaProb = 0.5;

let initialExpTime = 100;
let infExpTime = 300;

let button;

function setup() {
  createCanvas(canvasSize, canvasSize);
  button = createButton("Print data");
  button.position(10, 10);
  button.mousePressed(printData);

  patientZero();
}

function draw() {
  background("grey");

  setUpSimul(simulType);

  for (let i = 0; i < sus.length; i++) {
    sus[i].move();
    sus[i].draw();
    infectSus(sus[i]);
  }

  for (let i = 0; i < sus.length; i++) {
    if (sus[i].isExp) {
      moveCategory(sus[i], sus, exp, i);
    }
  }

  for (let i = 0; i < exp.length; i++) {
    exp[i].move();
    exp[i].draw();
  }

  for (let i = 0; i < exp.length; i++) {
    if (exp[i].expEndTime <= frameCount && !exp[i].infPass) {
      infectExp(exp[i]);
      if (exp[i].isInf) {
        moveCategory(exp[i], exp, inf, i);
      }
    } else if (exp[i].expEndTime <= frameCount && exp[i].infPass) {
      exp[i].isExp = false;
      exp[i].isRec = true;
      moveCategory(exp[i], exp, rec, i);
    }
  }

  for (let i = 0; i < inf.length; i++) {
    inf[i].move();
    inf[i].draw();
  }

  for (let i = 0; i < inf.length; i++) {
    if (inf[i].infEndTime <= frameCount) {
      destiny(inf[i]);
      if (inf[i].isRec) {
        moveCategory(inf[i], inf, rec, i);
      } else if (inf[i].isDea) {
        moveCategory(inf[i], inf, dea, i);
      }
    }
  }

  for (let i = 0; i < rec.length; i++) {
    rec[i].move();
    rec[i].draw();
  }

  for (let i = 0; i < dea.length; i++) {
    dea[i].draw();
  }

  if (frameCount % 10 == 0) {
    append(tAkk, frameCount);
    append(susAkk, sus.length);
    append(expAkk, exp.length);
    append(infAkk, inf.length);
    append(recAkk, rec.length);
    append(deaAkk, dea.length);
  }
}

function setUpSimul(type) {
  if (type == 2) {
    strokeWeight(3);
    line(200, 200, 300, 200);
    line(300, 200, 300, 300);
    line(200, 200, 200, 300);
    line(200, 300, 300, 300);
    strokeWeight(1);
  }
}

function patientZero() {
  for (let i = 0; i < populationSize - 1; i++) {
    append(sus, new Individual("sus"));
  }
  append(exp, new Individual("exp"));
}

function distance(indi1, indi2) {
  return (
    ((indi1.positionX - indi2.positionX) ** 2 +
      (indi1.positionY - indi2.positionY) ** 2) **
    0.5
  );
}

function moveCategory(individual, currentCat, destinationCat, index) {
  append(destinationCat, individual);
  currentCat.splice(index, 1);
}

function infectSus(currentSus) {
  for (let j = 0; j < exp.length; j++) {
    if (distance(currentSus, exp[j]) < riskRadius) {
      randomNum = random();
      if (randomNum <= expProb) {
        currentSus.isExp = true;
        currentSus.expEndTime = frameCount + initialExpTime;
      }
    }
  }

  for (let j = 0; j < inf.length; j++) {
    if (distance(currentSus, inf[j]) < riskRadius) {
      randomNum = random();
      if (randomNum <= expProb) {
        currentSus.isExp = true;
        currentSus.expEndTime = frameCount + initialExpTime;
      }
    }
  }
}

function infectExp(currentExp) {
  randomNum = random();
  if (randomNum <= infProb) {
    currentExp.isExp = false;
    currentExp.isInf = true;
    currentExp.infEndTime = frameCount + infExpTime;
  } else {
    currentExp.expEndTime += infExpTime;
    currentExp.infPass = true;
  }
}

function destiny(currentInf) {
  randomNum = random();
  currentInf.isInf = false;
  if (randomNum <= deaProb) {
    currentInf.isDea = true;
  } else {
    currentInf.isRec = true;
  }
}

function printData() {
  for (let i = 0; i < tAkk.length; i++) {
    tData += tAkk[i] + ",";
  }
  for (let i = 0; i < susAkk.length; i++) {
    susData += susAkk[i] + ",";
  }
  for (let i = 0; i < expAkk.length; i++) {
    expData += expAkk[i] + ",";
  }
  for (let i = 0; i < infAkk.length; i++) {
    infData += infAkk[i] + ",";
  }
  for (let i = 0; i < recAkk.length; i++) {
    recData += recAkk[i] + ",";
  }
  for (let i = 0; i < deaAkk.length; i++) {
    deaData += deaAkk[i] + ",";
  }

  console.log(tData);
  console.log(susData);
  console.log(expData);
  console.log(infData);
  console.log(recData);
  console.log(deaData);
}
