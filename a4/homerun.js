var animationYear = 1;
var time = 0;
let csvTable;
var homeruns = [[]];
function preload() {
    csvTable = loadTable('baseball.csv','csv','header');
}

function homerunSort(a, b) {
  if (a[1] === b[1]) {
      return 0;
  }
  else {
      return (a[1] > b[1]) ? -1 : 1;
  }
}
function processCSV(){
  var year; var curLength;
  console.log(homeruns);
  for (var i = 0; i < csvTable.getRowCount(); i++){
    year = csvTable.getNum(i,"year");
    try {
    curLength = homeruns[year].length;
  } catch (error) {
    homeruns[year] = []; //expand list if needed
    curLength = 0;
  }
    //console.log("homeruns[year].length ="+homeruns[year].length);
    homeruns[year][curLength] = [csvTable.getString(i,"name"),csvTable.getNum(i,"hr")]
  } // Finished loading data
  for(var i = 1; i < homeruns.length; i++){
    homeruns[i].sort(homerunSort);
  }
}

function canvasSetup(){
  createCanvas(600, 600); // w, h
  background("#ecf0f1");
  angleMode(DEGREES);

  stroke('black');
  fill(254);
  rect(40,0,width-40,height-40);
  fill(90);
  drawchart(width,height,40,40,60);

  push();
  translate(5,height/2);
  rotate(-90);
  text("Homeruns",-40,0,180,30);
  pop();
}
function setup() {
  processCSV();
  canvasSetup();
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
    line(i,h-axisMargin,i,0); // vert line
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
  fill('black');
}

function drawBars(w, h, multiplier,gridMargin,axisMargin){
  fill('black');
  textAlign(CENTER)
  var txt = ["Spring","Summer","Fall","Winter"];
  for(var i = 1; i <= 4; i++){
    rect(((gridMargin*i)*2 + (axisMargin)), h-axisMargin, gridMargin, -seasons[i-1]*multiplier)
    text(txt[i-1]+"\n"+seasons[i-1]+" F",((gridMargin*i)*2 + (axisMargin) + (axisMargin/2)), h-axisMargin+20)
    console.log(seasons[i-1])
  }
}

function draw() {
  if (time % 50 == 0){
    animationYear++;
    console.log(animationYear);
    if (animationYear > 23){
      animationYear = 1;
      clear();
      canvasSetup();
    }
  }
  animatedBars(width,height,40,40,60,animationYear);

  time++;
}

function animatedBars(w, h,gridMargin,axisMargin, labelRatio, year){
  var scalar = gridMargin / labelRatio;
  var top6 = (takeTopx(year, 6));
  //console.log(top6);
  fill('black');
  textAlign(CENTER)
  for(var i = 1; i < top6.length; i++){
    rect((((gridMargin*i)*2)), h-axisMargin, gridMargin, -(top6[i-1][1])*scalar ) // gridMargin - (-seasons[i-1]*multiplier)
    //text(txt[i-1]+"\n"+seasons[i-1]+" F",((gridMargin*i)*2 + (axisMargin) + (axisMargin/2)), h-axisMargin+20)
  }
  
}

function takeTopx(year, x){
  var topx = [];
  for (var i = 0; i < x; i++){
    var hrUnit = homeruns[year][i];
    if (hrUnit == null){
      topx[i] = [0,0];
    } else
        topx[i] = hrUnit;
  }
  return topx;
}