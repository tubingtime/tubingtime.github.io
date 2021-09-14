var count = 0;
let csvTable;
let totalUsedSales = 0;
var seasons;

function preload() {
    csvTable = loadTable('weather.csv','csv','header');
}

function setup() {
  createCanvas(480, 600); // w, h
  background("#ecf0f1");
  angleMode(DEGREES);
  x = csvTable.getRowCount();
  console.log("ROWCOUNT ="+x);
  var month;
  let jan = [0,0],feb = [0,0],mar = [0,0],apr = [0,0],may = [0,0],jun = [0,0],jul = [0,0],aug = [0,0],sep = [0,0],oct = [0,0],nov = [0,0],dec = [0,0];
  for (var i = 0; i < csvTable.getRowCount(); i++){
       switch(month = csvTable.getNum(i,"Date.Month")){
          case 1:
            jan[0] += csvTable.getNum(i,"Data.Temperature.Avg Temp");
            jan[1]++; //record count
          case 2:
            feb[0] += csvTable.getNum(i,"Data.Temperature.Avg Temp");
            feb[1]++;
          case 3:
            mar[0] += csvTable.getNum(i,"Data.Temperature.Avg Temp");
            mar[1]++;
          case 4:
            apr[0] += csvTable.getNum(i,"Data.Temperature.Avg Temp");
            apr[1]++;
          case 5:
            may[0] += csvTable.getNum(i,"Data.Temperature.Avg Temp");
            may[1]++;
          case 6:
            jun[0] += csvTable.getNum(i,"Data.Temperature.Avg Temp");
            jun[1]++;
          case 7:
            jul[0] += csvTable.getNum(i,"Data.Temperature.Avg Temp");
            jul[1]++;
          case 8:
            aug[0] += csvTable.getNum(i,"Data.Temperature.Avg Temp");
            aug[1]++;
          case 9:
            sep[0] += csvTable.getNum(i,"Data.Temperature.Avg Temp");
            sep[1]++;
          case 10:
            oct[0] += csvTable.getNum(i,"Data.Temperature.Avg Temp");
            oct[1]++;
          case 11:
            nov[0] += csvTable.getNum(i,"Data.Temperature.Avg Temp");
            nov[1]++;
          case 12:
            dec[0] += csvTable.getNum(i,"Data.Temperature.Avg Temp");
            dec[1]++;
      } 
  }
  jan = (jan[0] / jan[1]);
  feb = (feb[0] / feb[1]);
  mar = (mar[0] / mar[1]);
  apr = (apr[0] / apr[1]);
  may = (may[0] / may[1]);
  jun = (jun[0] / jun[1]);
  jul = (jul[0] / jul[1]);
  aug = (aug[0] / aug[1]);
  sep = (sep[0] / sep[1]);
  oct = (oct[0] / oct[1]);
  nov = (nov[0] / nov[1]);
  dec = (dec[0] / dec[1]);
  var spring = ((mar+apr+may)/3).toFixed(1);
  var summer = ((jun+jul+aug)/3).toFixed(1);
  var fall = ((sep+oct+nov)/3).toFixed(1);
  var winter = ((jan+feb+mar)/3).toFixed(1);
  seasons = [spring,summer,fall,winter];

  console.log(winter);



  //BEGIN DRAWING

  stroke('black');
  fill(254);
  rect(40,0,width-40,height-40);
  fill(90);
  drawchart(width,height,40,40,5);

  push();
  translate(5,height/2);
  rotate(-90);
  text("Average Tempurature (Celcius)",-40,0,180,30);
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
  drawBars(w,h,8,gridMargin,axisMargin);
  
}

function drawBars(w, h, multiplier,gridMargin,axisMargin){
  fill('black');
  textAlign(CENTER)
  var txt = ["Spring","Summer","Fall","Winter"];
  for(var i = 1; i <= 4; i++){
    rect(((gridMargin*i)*2 + (axisMargin)), h-axisMargin, gridMargin, -seasons[i-1]*multiplier)
    text(txt[i-1]+"\n"+seasons[i-1]+" C",((gridMargin*i)*2 + (axisMargin) + (axisMargin/2)), h-axisMargin+20)
    console.log(seasons[i-1])
  }
}

function draw() {


}