var count = 0;
let csvTable;
let totalUsedSales = 0; //AVG
function preload() {
    csvTable = loadTable('video_games.csv','csv','header');
}

function setup() {
  createCanvas(450, 450); // w, h
  angleMode(DEGREES);
  x = csvTable.getRowCount();
  var year;
  for (var i = 0; i < csvTable.getRowCount(); i++){
      totalUsedSales += csvTable.getNum(i,"Metrics.Used Price");
  }
  totalUsedSales = (totalUsedSales/csvTable.getRowCount());
  console.log(x);
}

function draw() {
  background("#ecf0f1");
  stroke('black');
  fill(255);
  rect(40,0,width-40,height-40);
  stroke('grey');
  for(var i =1; i < 10; i++){ //draw grid
    line(40,(height-40)-50*i,width,(height-40)-50*i); //x1 y1 x2 y2
    line((width+40)-50*i,0,(width+40)-50*i,height-40); //x1 y1 x2 y2
  }

  noStroke();
  fill("black");
  textSize(10);
  textAlign(RIGHT);
  for(var i =0; i < 10; i++){ //draw label
    text(i*5, -82, (height-44)-i*50, 120, 60);
  }
  textAlign(CENTER);
  text(totalUsedSales.toFixed(1)+"$", 56, totalUsedSales*10+41, 120, 60);
  fill("#2980b9");
  circle(114.5,(height-40)-(totalUsedSales*10),20);

  for (var i = 0; i < 4; i++){
  circle(114.5,((height-40)-(totalUsedSales*10)+i*50),20);
  }
  fill(0);
  textSize(14);
  //text("XLABEL", width/2-60, height-15, 120, 60);
  text("2004-2008", 60, height-15, 120, 60);
  
  push();
  translate(5,height/2);
  rotate(-90);
  text("Average Used Price ($)",-40,0,180,30);
  pop();
}