function variance(max){
  return (Math.random() * max) + 1; 
}

function driveLine_to_color(driveline){
  if (driveline == "All-wheel drive"){
    return "blue";
  }
  else if (driveline == "Front-wheel drive"){
    return "green";
  }
  else 
    return "red";
}

d3.csv("cars.csv", function(d) {
  return {
      horsePower: +d["Engine Information.Engine Statistics.Horsepower"], /* X */ /* or could be year?? */
      mpg: +d["Fuel Information.City mpg"], /* Y */ 
      height: +d["Dimensions.Height"],
      driveline: driveLine_to_color(d["Engine Information.Driveline"])
};
}).then(function(wdata) {
  let minHp = (d3.min(wdata, function(d){
    return d.horsePower;
}))
  let maxHp = (d3.max(wdata, function(d){
      return d.horsePower;
  }))
  let maxMpg = (d3.max(wdata, function(d){
      return d.mpg;
  }))
  let minMpg = (d3.min(wdata, function(d){
    return d.mpg;
}))
  let heightMinMax = (d3.extent(wdata, function(d){
    return d.height;
  }))

  
  
  console.log(wdata);
  console.log(heightMinMax[0] + " " + heightMinMax[1]);
  console.log(variance(10));


  var w = 800;
  var h = 500;
  const margin = { top : 0, bottom : 50, left : 50, right : 20}
  const innerWidth = w - margin.left - margin.right;
  const innerHeight = h - margin.top - margin.bottom;


  let svg = d3.select("svg")
          .attr("width", w)
          .attr("height", h);
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);



  function drawScatter(dataset){
    console.log(dataset);
    let xScale = d3.scaleLinear()
        .domain([minHp,maxHp])   // Data space
        .range([0, innerWidth]); // Pixel space 
    let yScale = d3.scaleLinear()
        .domain([minMpg, maxMpg])   // Data space
        .range([innerHeight, 4]); // Pixel space
    let radiusScale = d3.scaleLinear()
        .domain(heightMinMax)   // Data space
        .range([1, 6]); // Pixel space

    var xAxis = d3.axisBottom(xScale);
      


    var yAxis = d3.axisLeft(yScale);
    g.append('g').call(d3.axisLeft(yScale));
    let xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`); // move axis to bottom
    



    // begin drawing of dots
    //add svgs


    let dots = g.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle");

    //change svg attrs
    dots
        .attr("cx", function(d){ 
          return xScale(d.horsePower);
        })
        .attr("cy", function(d){
          return (yScale(d.mpg)) /* +variance(.3)) */
        })
        .attr("r", function(d){
          return (radiusScale(d.height)) /* +variance(.3)) */
        })
        .attr("fill",function(d){
          return d.driveline;
        });


}
  /* 
  Draw a color legend in specified location
  @param lArray = [color, label]
  @return colorLegend (svg)
  */
  function drawColorLegend(lArray){ 
    console.log(lArray.length + " <-- LENNGGGTHHH") // debug 
    let height = 100;
    colorLegend = colorLabelG.append("rect")
    colorLegend
      .attr("x",0)
      .attr("y",0)
      .attr("width", 180)
      .attr("height", height)
      .attr("stroke","black")
      .attr("stroke-width",2)
      .attr("fill","none");
    
    let yScale = d3.scaleLinear()
      .domain([0,lArray.length])   // Data space
      .range([15, height+20]); // Pixel space
    
    let circles = colorLabelG.selectAll("circle")
        .data(lArray)
        .enter()
        .append("circle");
      circles
        .attr("cx",15)
        .attr("cy",function(d,i){
          return yScale(i);
        })
        .attr("r",10)
        .attr("fill",function(d){
          return d.color;
        })
        
    let labels = colorLabelG.selectAll("text")
        .data(lArray)
        .enter()
        .append("text");
        labels
        .style("font-size","13px")
        .attr("x",30)
        .attr("y",function(d,i){
          return yScale(i)+4;
        })
        .text(function(d){
          return d.label;
        });
    
    colorLabelG.append("text")
          .style("font-size","13px")
          .text("Size = Vehicle Height")
          .attr("x",05)
          .attr("y",120)


    
  }

  drawScatter(wdata);

  const colorLabelG = g.append('g')
    .attr('transform', `translate(${innerWidth-180}, ${20})`);
  let lilLegend = [
    {color : "green", label : "Front-Wheel Drive"},
    {color : "blue", label : "All-Wheel Drive"},
    {color : "red", label : "Rear-Wheel Drive"}
  ]
  drawColorLegend(lilLegend)

  var labelx = svg.append("text")
                  .text("Horsepower")
                  .attr("x", innerWidth/2)
                  .attr("y", innerHeight+40);
  var labelx = svg.append("text")
                  .attr("transform", "translate(20,250)rotate(-90)" )
                  .text("Miles per galon")

    
});
