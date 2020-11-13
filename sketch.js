/*Simulationstyper:
1 - Alle cirkler bevæger sig tilfældigt rundt på hele canvas
2 - Alle cirkler bevæger sig frem og tilbage mellem to faste punkter. Et omkring centrum i canvas og et uden for centrum
3 - Alle cirkler er placeret i en af fire kasser. Halvdelen af cirklerne rejser tilfældigt ud og hjem fra deres kasse, mens resten altid bliver hjemme i deres egen kasse.
4 - Alle cirkler er placeret i en af fire kasser. 1/8 af cirklerne rejser tilfældigt ud og hjem fra deres kasse, mens resten altid bliver hjemme i deres egen kasse.
5 - Alle cirkler er placeret i en af fire kasser. Alle bliver hjemme i deres egen kasse.
6 - Alle cirkler bevæger sig tilfældigt rundt på hele canvas. Alle inficerede (røde cirkler) kommer i karantæne
7 - Cirklerne holder "afstand" ved at blive frastødt hinanden

Ryk rundt på rækkefølgen, så det bliver 1,7,6,2,3,4,5
Få cirklerne til at bevæge sig langsommere
Eksperimenter m. tider og sandsynligheder, så kurverne bliver pænere
Organiser funktioner, så de deles ud i andre filer
Ret op på de mange region-printlister. Måske kan der laves fire lister i en liste?

*/

let simulType = 0;
let simulStart = 0;

let spawnCounter = 0; //anvendes ved spawn (patientZero-funktionen) i social distancering

let sus = [],
  exp = [],
  inf = [],
  rec = [],
  dea = [];

let tCount = [],
  susCount = [],
  expCount = [],
  infCount = [],
  recCount = [],
  deaCount = [];

let susCount1 = [],
  susCount2 = [],
  susCount3 = [],
  susCount4 = [],
  expCount1 = [],
  expCount2 = [],
  expCount3 = [],
  expCount4 = [],
  infCount1 = [],
  infCount2 = [],
  infCount3 = [],
  infCount4 = [],
  recCount1 = [],
  recCount2 = [],
  recCount3 = [],
  recCount4 = [],
  deaCount1 = [],
  deaCount2 = [],
  deaCount3 = [],
  deaCount4 = [],
  counter1,
  counter2,
  counter3,
  counter4;

let dataPrint;

let populationSize = 500;
let canvasSize = 500;

let randomNum;
let riskRadius = 15;
let expProb = 0.0075,
  infProb = 0.5,
  deaProb = 0.5;

let initialExpTime = 100;
let infExpTime = 300;

let radioInput, button1, button2;

function setup() {
  console.log(random());
  createCanvas(canvasSize, canvasSize);

  radioInput = createRadio();
  radioInput.option(1, "Stor region");
  radioInput.option(2, "Stor region m. mødecentrum");
  radioInput.option(3, "4 regioner m. 1/2 rejse");
  radioInput.option(4, "4 regioner m. 1/8 rejse");
  radioInput.option(5, "4 regioner uden rejse");
  radioInput.option(6, "Stor region m. karantæneafsnit");
  radioInput.option(7, "Stor region m. social distancering");

  button1 = createButton("Begynd");
  button1.position(200, 250);
  button1.mousePressed(beginSimulation);
}

function draw() {
  background("grey");

  if (simulType != 0) {
    setUpSimul(simulType);
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
    button2.mousePressed(printAllData);
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

  logData();
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

  if (type == 6) {
    strokeWeight(3);
    line(450, 450, 499, 450);
    line(450, 450, 450, 499);
    line(499, 450, 499, 499);
    line(450, 499, 499, 499);
    strokeWeight(1);
  }
}

function patientZero() {
  for (let i = 0; i < populationSize - 1; i++) {
    append(sus, new Individual("sus"));
    spawnCounter += 1; //anvendes kun til spawn ved social distancering
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

function logData() {
  if ((frameCount - simulStart) % 10 == 0) {
    append(tCount, frameCount - simulStart);
    if (simulType == 3 || simulType == 4 || simulType == 5) {
      logDataByRegion(sus, susCount1, susCount2, susCount3, susCount4);
      logDataByRegion(exp, expCount1, expCount2, expCount3, expCount4);
      logDataByRegion(inf, infCount1, infCount2, infCount3, infCount4);
      logDataByRegion(rec, recCount1, recCount2, recCount3, recCount4);
      logDataByRegion(dea, deaCount1, deaCount2, deaCount3, deaCount4);
    } else {
      append(susCount, sus.length);
      append(expCount, exp.length);
      append(infCount, inf.length);
      append(recCount, rec.length);
      append(deaCount, dea.length);
    }
  }
}

function logDataByRegion(dataSource, logList1, logList2, logList3, logList4) {
  counter1 = 0;
  counter2 = 0;
  counter3 = 0;
  counter4 = 0;
  for (let i = 0; i < dataSource.length; i++) {
    switch (dataSource[i].homeBox) {
      case 1:
        counter1++;
        break;
      case 2:
        counter2++;
        break;
      case 3:
        counter3++;
        break;
      case 4:
        counter4++;
    }
  }
  append(logList1, counter1);
  append(logList2, counter2);
  append(logList3, counter3);
  append(logList4, counter4);
}

function printAllData() {
  singleDataPrint(tCount, "t");
  if (simulType == 3 || simulType == 4 || simulType == 5) {
    singleDataPrint(susCount1, "sus1");
    singleDataPrint(susCount2, "sus2");
    singleDataPrint(susCount3, "sus3");
    singleDataPrint(susCount4, "sus4");
    singleDataPrint(expCount1, "exp1");
    singleDataPrint(expCount2, "exp2");
    singleDataPrint(expCount3, "exp3");
    singleDataPrint(expCount4, "exp4");
    singleDataPrint(infCount1, "inf1");
    singleDataPrint(infCount2, "inf2");
    singleDataPrint(infCount3, "inf3");
    singleDataPrint(infCount4, "inf4");
    singleDataPrint(recCount1, "rec1");
    singleDataPrint(recCount2, "rec2");
    singleDataPrint(recCount3, "rec3");
    singleDataPrint(recCount4, "rec4");
    singleDataPrint(deaCount1, "dea1");
    singleDataPrint(deaCount2, "dea2");
    singleDataPrint(deaCount3, "dea3");
    singleDataPrint(deaCount4, "dea4");
  } else {
    singleDataPrint(susCount, "sus");
    singleDataPrint(expCount, "exp");
    singleDataPrint(infCount, "inf");
    singleDataPrint(recCount, "rec");
    singleDataPrint(deaCount, "dea");
  }
}

function singleDataPrint(data, headline) {
  dataPrint = headline + ": ";
  for (let i = 0; i < data.length; i++) {
    dataPrint += data[i] + ",";
  }
  dataPrint = dataPrint.slice(0, -1);
  console.log(dataPrint);
}
