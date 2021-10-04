d3.csv("billionaires.csv", function(d) {
  return {
      year: +d["year"], 
      wealth: +d["wealth.worth in billions"]
};
}).then(function(wdata) {
  let yearMinMax = (d3.extent(wdata, function(d){
    return d.year;
    }))
  let avgWealthArr = [];
  let yearsArr = [1996,2001,2014]
  for (let i = 0; i < 3; i++){
    avgWealthArr[i] = {
      year : yearsArr[i],
      wealth : d3.sum(wdata, function(d){
        if (d.year == yearsArr[i])
        return d.wealth;
      })
    }
  }
  console.log(avgWealthArr);
  let wealthMinMax = (d3.extent(avgWealthArr, function(d){
    return d.wealth;
    }))
  

  
  
  console.log(wdata);
  console.log(yearMinMax[0] + " " + yearMinMax[1]);


  var w = 800;
  var h = 500;
  const margin = { top : 0, bottom : 50, left : 70, right : 20}
  const innerWidth = w - margin.left - margin.right;
  const innerHeight = h - margin.top - margin.bottom;


  let svg = d3.select("svg")
          .attr("width", w)
          .attr("height", h);
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);



  function drawScatter(dataset){
    let xScale = d3.scaleLinear()
        .domain([1994,2016])   // Data space
        .range([0, innerWidth]); // Pixel space 
    let yScale = d3.scaleLinear()
        .domain([wealthMinMax[0]-500,wealthMinMax[1]+500])   // Data space
        .range([innerHeight, 4]); // Pixel space

    var xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
      


    var yAxis = d3.axisLeft(yScale);
    g.append('g').call(yAxis);
    let xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`); // move axis to bottom
  

    let dots = g.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle");

    //change svg attrs
    dots
        .attr("cx", function(d){
          
          return xScale(d.year);
        })
        .attr("cy", function(d){
          return yScale(d.wealth) /* +variance(.3)) */
        })
        .attr("r", function(d){
          return (2) /* +variance(.3)) */
        })
        .attr("fill","black");

    let line = d3.line();
    let points = [
      [0,100],
      [500,100]
    ]
    g.append("path")
     .datum(avgWealthArr)
     .attr("fill","none")
     .attr("stroke","steelblue")
     .attr("stroke-width", 1.5)
     .attr("d", d3.line()
       .x(function(d){return xScale(d.year)})
       .y(function(d){return yScale(d.wealth)})
     )
}
  drawScatter(avgWealthArr);


  var labelx = svg.append("text")
                  .text("Year")
                  .attr("x", innerWidth/2+60)
                  .attr("y", innerHeight+40);
  var labelx = svg.append("text")
                  .attr("transform", "translate(20,250)rotate(-90)" )
                  .text("Wealth in Billions")

    
});
