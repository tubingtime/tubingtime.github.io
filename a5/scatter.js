d3.csv("video_games.csv", function(d) {
  return {
      avgSales: +d["Metrics.Sales"],
      avgUsedPrice: +d["Metrics.Used Price"] // can rename properties such as "land_area" instead of "land area" 
};
}).then(function(wdata) {
  let minSales = (d3.min(wdata, function(d){
    return d.avgSales;
}))
  let maxSales = (d3.max(wdata, function(d){
      return d.avgSales;
  }))
  let maxUsed = (d3.max(wdata, function(d){
      return d.avgUsedPrice;
  }))
  let minUsed = (d3.min(wdata, function(d){
    return d.avgUsedPrice;
}))
  
  

  console.log(minUsed + " " + maxUsed);

  var w = 800;
  var h = 500;
  const margin = { top : 0, bottom : 50, left : 50, right : 20}
  const innerWidth = w - margin.left - margin.right;
  const innerHeight = h - margin.top - margin.bottom;


  let svg = d3.select("svg")
          .attr("width", w)
          .attr("height", h);
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  function drawScatter(dataset){
    console.log(dataset);
    let xScale = d3.scaleLinear()
        .domain([minSales,maxSales])   // Data space
        .range([2, innerWidth]); // Pixel space
    let yScale = d3.scaleLinear()
        .domain([minUsed, maxUsed])   // Data space
        .range([innerHeight, 10]); // Pixel space

    var xAxis = d3.axisBottom(xScale);
      


    var yAxis = d3.axisLeft(yScale);
    g.append('g').call(d3.axisLeft(yScale));
    let xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`); // move axis to bottom
    



    // begin drawing of dots
    //add svgs


    let dots = svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle");

    //change svg attrs
    dots
        .attr("cx", function(d){ 
          return xScale(d.avgSales)+margin.left;
        })
        .attr("cy", function(d){
          return (yScale(d.avgUsedPrice))
        })
        .attr("r", 3)
        .attr("fill","steelblue");


}
  drawScatter(wdata);
  var labelx = svg.append("text")
                  .text("Average Sales")
                  .attr("x", innerWidth/2)
                  .attr("y", innerHeight+40);
  var labelx = svg.append("text")
                  .attr("transform", "translate(20,250)rotate(-90)" )
                  .text("Average used price")

    
});
