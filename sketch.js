/*Simulationstyper:
1 - Alle cirkler bevæger sig tilfældigt rundt på hele canvas
2 - Alle cirkler bevæger sig frem og tilbage mellem to faste punkter. Et omkring centrum i canvas og et uden for centrum
3 - Alle cirkler er placeret i en af fire kasser. Halvdelen af cirklerne rejser tilfældigt ud og hjem fra deres kasse, mens resten altid bliver hjemme i deres egen kasse.
4 - Alle cirkler er placeret i en af fire kasser. 1/8 af cirklerne rejser tilfældigt ud og hjem fra deres kasse, mens resten altid bliver hjemme i deres egen kasse.
5 - Alle cirkler er placeret i en af fire kasser. Alle bliver hjemme i deres egen kasse.
(ikke lavet) 6 - Alle cirkler bevæger sig tilfældigt rundt på hele canvas. Alle inficerede (røde cirkler) kommer i karantæne
(ikke lavet) 7 - Cirklerne holder "afstand" (på en eller anden måde)

Ryk rundt på 6,7 og 3,4,5
Lav særlig printordninger for 3, så man kan printe data fra hver kasse
Eksperimenter m. tider og måske smitte, så kurverne bliver pænere


*/

let simulType = 0;
let simulStart = 0;

let sus = [],
  exp = [],
  inf = [],
  rec = [],
  dea = [];

let tAkk = [],
  susAkk = [],
  expAkk = [],
  infAkk = [],
  recAkk = [],
  deaAkk = [];

let tData = "t: ",
  susData = "sus: ",
  expData = "exp: ",
  infData = "inf: ",
  recData = "rec: ",
  deaData = "dea: ";

let populationSize = 500;
let canvasSize = 500;

let randomNum;
let riskRadius = 10;
let expProb = 0.01,
  infProb = 0.5,
  deaProb = 0.5;

let initialExpTime = 100;
let infExpTime = 300;

let radioInput, button1, button2;

function setup() {
  createCanvas(canvasSize, canvasSize);

  radioInput = createRadio();
  radioInput.option(1, "Stor region");
  radioInput.option(2, "Stor region m. mødecentrum");
  radioInput.option(3, "4 regioner m. rejse-rate på 1/2");
  radioInput.option(4, "4 regioner m. rejse-rate på 1/8");
  radioInput.option(5, "4 regioner uden rejse");

  button1 = createButton("Begynd");
  button1.position(200, 250);
  button1.mousePressed(beginSimulation);
}

function draw() {
  background("grey");
  if (frameCount % 5 == 0) {
  }

  if (simulType == 2) {
    setUpSimul(2);
  }

  if (simulType == 3 || simulType == 4 || simulType == 5) {
    setUpSimul(3);
  }

  if (simulType != 0) {
    moveAndDraw();
  } else {
    fill("white");
    textSize(19);
    text("Vælg herunder hvilken simulationstype, du ønsker at køre", 10, 225);
  }
}

function beginSimulation() {
  if (radioInput.value()) {
    simulType = int(radioInput.value());
    simulStart = frameCount;
    button1.hide();
    patientZero();
    button2 = createButton("Print data");
    button2.position(10, 10);
    button2.mousePressed(printData);
  } else {
    alert("Vælg en simulation på knapperne under det grå vindue.");
  }
}

function moveAndDraw() {
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

  if ((frameCount - simulStart) % 10 == 0) {
    append(tAkk, frameCount - simulStart);
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

  if (type == 3 || type == 4 || type == 5) {
    strokeWeight(3);

    line(25, 25, 225, 25);
    line(225, 25, 225, 225);
    line(25, 25, 25, 225);
    line(25, 225, 225, 225);

    line(275, 25, 475, 25);
    line(475, 25, 475, 225);
    line(275, 25, 275, 225);
    line(275, 225, 475, 225);

    line(25, 275, 225, 275);
    line(225, 275, 225, 475);
    line(25, 275, 25, 475);
    line(25, 475, 225, 475);

    line(275, 275, 475, 275);
    line(475, 275, 475, 475);
    line(275, 275, 275, 475);
    line(275, 475, 475, 475);

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
