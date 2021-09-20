var count = 0;
let csvTable;
var arr = [];
var lwr_q; var upr_q;
var median; var max; var min;

function findMedianIndex(length){
  var midP = (length-1) / 2;
  var pMed = [-1,-1, 0]; // 1st point, 2nd point, boolean two-points?
  if (midP % 1 == 0){
    pMed[0] = midP;
  }
  else {
    median = arr[(midP-0.5)] + arr[(midP+0.5)]
    median = median / 2;
    pMed = [midP-0.5,midP+0.5,1] 
  }
  return pMed;
}

function medianIndexArraytoMedian(MIA){
  return ( (arr[MIA[0]] + arr[MIA[1]]) / 2)
}

function findDistance(x, y){
  return Math.abs(x - y);
}
function preload() {
    csvTable = loadTable('weather.csv','csv','header'); 
}

function sortdesc(a, b){
  return a - b; 
}
function setup() {
  createCanvas(480, 600); // w, h
  background("#ecf0f1");
  angleMode(DEGREES);
  x = csvTable.getRowCount();
  console.log("ROWCOUNT ="+x);
  var recordCount = 0;
  for (var i = 0; i < csvTable.getRowCount(); i++){
    if (csvTable.getString(i,"Station.City") == "San Francisco" && (csvTable.getNum(i,"Date.Year") == 2016)){
      arr[i] = csvTable.getNum(i,"Data.Temperature.Avg Temp");
      recordCount++;
    }
  }
  arr.sort(sortdesc);
  console.log(arr);
  console.log("recordC: " + recordCount);
  max = arr[recordCount-1];
  console.log(max);
  min = arr[0];
  console.log(min);
  //find median
  var mia = findMedianIndex(recordCount); 
  console.log("median: " + arr[mia[0]]);
  //find lower & upper qtile
  var lMia = findMedianIndex(mia[0]);
  if (lMia[2] == 1){ // first check if we have two midpoints
    lwr_q = medianIndexArraytoMedian(lMia);
    upr_q = medianIndexArraytoMedian([findDistance(findDistance(lMia[0], mia[0]), recordCount), findDistance(findDistance(lMia[1],mia[0]),recordCount), 1])
    /* else {
      lwr_q = arr[lMia[0]]; 
      upr_q = arr[findDistance(lMia[0], mia[0])+mia[1]]
    } */
  }
  else {
    lwr_q = arr[lMia[0]]; 
    upr_q = arr[findDistance(findDistance(lMia[0], mia[0]), recordCount)]
  }
  console.log("LQ: " + lwr_q);
  //find upper qtile
  console.log("UQ: " + upr_q);

  //BEGIN DRAWING

  stroke('black');
  fill(254);
  rect(40,0,width-40,height-40);
  fill(90);
  drawchart(width,height,40,40,5);

  push();
  translate(5,height/2);
  rotate(-90);
  text("Average Tempurature (Farenheit)",-40,0,180,30);
  pop();
}

function drawchart(w, h, axisMargin, gridMargin, labelRatio){
  stroke('grey');
  var longest;
  if (h > w){
    longest = h
  } else {
    longest = w;
  }
  for(var i = gridMargin; i < longest; i+=gridMargin){ //draw grid
    line(i,h-axisMargin,i,0); // horizontal line
    line(axisMargin,h-i,w,h-i);
    //console.log(i); 
  }
  noStroke();
  textAlign(RIGHT);
  textSize(10);

  var axisLabel = 0;
      //not sure why needs /2
  for(var i = h-(gridMargin/2); i > gridMargin; i-=gridMargin){ //draw axis nums - TODO: generalize
    text(axisLabel, gridMargin-20, i-24,20,20); //remove wrapping for generalization (last two args)
    axisLabel += labelRatio;
  }
  drawBoxes(w,h,8,gridMargin,axisMargin);
  
}

function drawBoxes(w, h, multiplier,gridMargin,axisMargin){
  fill('black');
  textAlign(CENTER)
  rect(((gridMargin)*5 + (axisMargin)), (h-axisMargin)-452, gridMargin, -52)
  stroke('black');
  line(((gridMargin)*5 + (axisMargin))+20,24, ((gridMargin)*5 + (axisMargin))+20, 192)
  noStroke();
  fill('red');
  rect(((gridMargin)*5 + (axisMargin)), (h-axisMargin)-496, gridMargin, -2)
  fill('black');

  text("San Fransisco",((gridMargin)*5 + (axisMargin))+20,h-25)

/*   var txt = ["Spring","Summer","Fall","Winter"];
  for(var i = 1; i <= 4; i++){
    rect(((gridMargin*i)*2 + (axisMargin)), h-axisMargin, gridMargin, -seasons[i-1]*multiplier)
    text(txt[i-1]+"\n"+seasons[i-1]+" C",((gridMargin*i)*2 + (axisMargin) + (axisMargin/2)), h-axisMargin+20)
    console.log(seasons[i-1])
  } */
}

function draw() {


}