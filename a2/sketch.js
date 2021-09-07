var count = 0;
let csvTable;
let totalUsedSales = 0;
function preload() {
    csvTable = loadTable('video_games.csv','csv','header');
}

function setup() {
  createCanvas(450, 450); // w, h
  angleMode(DEGREES);
  x = csvTable.getRowCount();
  var year;
  for (var i = 0; i < csvTable.getRowCount(); i++){
/*       switch(year = csvTable.getNum(i,"Release.Year")){
          case 2004:

          case 2005:

          case 2006:

          case 2007:

          case 2008:
      } */
      totalUsedSales += csvTable.getNum(i,"Metrics.Used Price");
  }
  totalUsedSales = (totalUsedSales/csvTable.getRowCount());
  console.log(x);
}

function draw() {
  background(220);
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
  for(var i =1; i < 10; i++){ //draw label
    text(i*2, -82, (height+4)-i*50, 120, 60);
  }
  textAlign(CENTER);
  text(Math.round(totalUsedSales)+"$", 55, totalUsedSales*10+50, 120, 60);
  fill("#2980b9");
  rect(90,height-40,50,-totalUsedSales*10);
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