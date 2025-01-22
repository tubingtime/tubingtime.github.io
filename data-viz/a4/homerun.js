var animationYear = 1;
var time = 0;
let csvTable;
var homeruns = [[]];
var paused = false;
var bounds = [];
var top6;

function preload() {
    csvTable = loadTable('baseball.csv','csv','header');
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



/* 
function genBarRaceTable(){
  for (var year = 1; year < 22; year++){
    console.log(year);
    var player = 0
    var top6 = takeTopx(year,6)
    for (player = 0; player < top6.length; player++){
      for (var nextplayer = 0; nextplayer < top6.length; nextplayer++){
        if (top6[player][1] == homeruns[year+1][nextplayer][1]){
          player = 99;
          break;
        }
        if (top6[player][1] > homeruns[year+1][nextplayer][1]){
          homeruns[year+1][nextplayer] = top6[player]; // stop if player already exists too
          break; // and move to next player
        }
      }
    }
  }
} */

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

  //add over missing values for final year
  for(var i = 0; i < 6; i++){
    homeruns[23][i] = homeruns[22][i];

  }
  homeruns[23][0][1] = 755; 


  for(var i = 1; i < homeruns.length; i++){
    homeruns[i].sort(homerunSort);
  }
  //genBarRaceTable();
}

function canvasSetup(){
  canvas = createCanvas(600, 600); // w, h
  var x = (windowWidth - width) / 2;
  var y = ((windowHeight - height) / 2)+60;
  canvas.position(x, y);
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
  text("Homeruns",-100,0,180,30);
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
    //line(i,h-axisMargin,i,0); // vert line
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

function draw() {
  if (time % 100 == 0){
    animationYear++;
    //console.log(animationYear);
    clear();
    canvasSetup();
    if (animationYear > 23){
      animationYear = 1;time = 0;
      clear();
      canvasSetup();
    }
    animatedBars(width,height,40,40,60,animationYear);
  }
  if (!paused)
    time++;
  for(var bar = 0; bar < top6.length; bar++){
    if (
      bounds[bar].activated == false &&
      mouseX >= bounds[bar].x1 &&
      mouseX <= bounds[bar].x2 &&
      mouseY <= bounds[bar].y1 &&
      mouseY >= bounds[bar].y2
    ) {
      text(top6[bar][1],bounds[bar].x1+20,bounds[bar].y2-10);
      bounds[bar].activated = true;
    }
  }
}

function animatedBars(w, h,gridMargin,axisMargin, labelRatio, year){
  var scalar = gridMargin / labelRatio;
  top6 = (takeTopx(year, 6)); //possibly need to compare to last top 6
  //console.log(top6);
  fill('black');
  textAlign(CENTER)
  for(var i = 1; i < top6.length+1; i++){
    colorhash = [(top6[i-1][0].charCodeAt(0)), (top6[i-1][0].charCodeAt(1)),(top6[i-1][0].charCodeAt(2))+(top6[i-1][0].charCodeAt(3))];
    fill(colorhash[0]*2, colorhash[1]*2, colorhash[2]);
    rect((((gridMargin*i)*2)), h-axisMargin, gridMargin, -(top6[i-1][1])*scalar ) // gridMargin - (-seasons[i-1]*multiplier)
    bounds[i-1] = {
      activated: false,
      x1 : (gridMargin*i)*2,
      y1 : h-axisMargin,
      x2 : ((gridMargin*i)*2)+gridMargin,
      y2 : (h-axisMargin)-((top6[i-1][1])*scalar)
    }
/*     stroke('red')  // debug to see bounds
    strokeWeight(5);
    point(bounds[i-1].x1,bounds[i-1].y1);
    point(bounds[i-1].x2,bounds[i-1].y2);
    noStroke(); */
    fill('black')
    text(top6[i-1][0],((gridMargin*i)*2)+20,h-axisMargin/2,)
  }
  text("Year: "+(year-1),w/2,h-5)
}

