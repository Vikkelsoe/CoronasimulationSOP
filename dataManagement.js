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

function logData() {
  if ((frameCount - simulStart) % 10 == 0) {
    append(tCount, frameCount - simulStart);
    if (simulType == 5 || simulType == 6 || simulType == 7) {
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
  if (simulType == 5 || simulType == 6 || simulType == 7) {
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
