d3.csv("billionaires.csv", function(d) {
  return {
      year: +d["year"], 
      name: d["name"], 
      wealth: +d["wealth.worth in billions"]
};
}).then(function(wdata) {
  let yearMinMax = (d3.extent(wdata, function(d){
    return d.year;
    }))
  let wealthMinMax = (d3.extent(wdata, function(d){
    return d.wealth;
    }))

  
  
  console.log(wdata);
  console.log(yearMinMax[0] + " " + yearMinMax[1]);


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
        .domain(yearMinMax)   // Data space
        .range([0, innerWidth]); // Pixel space 
    let yScale = d3.scaleLinear()
        .domain(wealthMinMax)   // Data space
        .range([innerHeight, 4]); // Pixel space

    var xAxis = d3.axisBottom(xScale);
      


    var yAxis = d3.axisLeft(yScale);
    g.append('g').call(d3.axisLeft(yScale));
    let xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`); // move axis to bottom
  

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

      /* Make the points for the lines */
}
  drawScatter(wdata);


  var labelx = svg.append("text")
                  .text("Horsepower")
                  .attr("x", innerWidth/2)
                  .attr("y", innerHeight+40);
  var labelx = svg.append("text")
                  .attr("transform", "translate(20,250)rotate(-90)" )
                  .text("Miles per galon")

    
});
