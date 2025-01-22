d3.csv("weather.csv", function(d) {
  if (d["Station.City"] == "San Francisco" && d["Date.Year"] == "2016")
    return {
        city: d["Station.City"],
        avgTemp: +d["Data.Temperature.Avg Temp"] // can rename properties such as "land_area" instead of "land area" 
  };
}).then(function(wdata) {
  let min = (d3.min(wdata, function(d){
      return d.avgTemp;
  }))
  let max = (d3.max(wdata, function(d){
      return d.avgTemp;
  }))
  let median = (d3.median(wdata, function(d){
      return d.avgTemp;
  }))
  let upr_q = d3.quantile(wdata.map(d => d.avgTemp), 0.25); 
  let lwr_q = d3.quantile(wdata.map(d => d.avgTemp), 0.75); 
  console.log(upr_q+ " && " + median + " && " + lwr_q);
  var pData = [median];
  var w = 800;
  var h = 500;
  const margin = { top : 30, bottom : 40, left : 40, right : 20}
  const innerWidth = w - margin.left - margin.right;
  const innerHeight = h - margin.top - margin.bottom;


  let svg = d3.select("svg")
          .attr("width", w)
          .attr("height", h);
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  function drawBars(dataset, barPadding){



    let xScale = d3.scaleBand()
        .domain(dataset.map(d => d.name))   // Data space
        .range([0, innerWidth]); // Pixel space
    let yScale = d3.scaleLinear()
        .domain([0, max])   // Data space
        .range([innerHeight, 0]); // Pixel space

    var xAxis = d3.axisBottom(xScale);

    var yAxis = d3.axisLeft(yScale);
    g.append('g').call(d3.axisLeft(yScale));
    g.append('g').call(d3.axisBottom(xScale))
      .attr('transform', `translate(0,${innerHeight})`); // move axis to bottom


    let rects = svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect");

    rects.attr("x", function(d) {
      return innerWidth/2+10; //not sure why i need + 80 here (i think it has to do with barwidth func)
      })
      .attr("y", function(d){
        console.log(d)
        console.log(yScale(d))
        return yScale(upr_q)-(margin.bottom - margin.top)
      })
      .attr("height",function(d){
        return innerHeight - yScale(lwr_q-upr_q);
      })
      .attr("width", 60)
      .attr("fill","steelblue");
    svg.append('line')
      .style("stroke", "red")
      .style("stroke-width", 2)
      .attr("x1", innerWidth/2+10)
      .attr("y1", yScale(median)+margin.top)
      .attr("x2", innerWidth/2+70)
      .attr("y2", yScale(median)+margin.top);
    svg.append('circle')
      .attr("cx", innerWidth/2+40)
      .attr("cy", yScale(max)+margin.top)
      .attr("r",3);
    svg.append('circle')
      .attr("cx", innerWidth/2+40)
      .attr("cy", yScale(min)+margin.top)
      .attr("r",3)
    var labelx = svg.append("text")
      .attr("transform", "translate(14,290)rotate(-90)" )
      .style("font-size",2)
      .text("Temperature in F")
    var labelx = svg.append("text")
      .text("Temperature in 2016")
      .attr("x", innerWidth/2-40)
      .attr("y", innerHeight+50);

}
  drawBars(pData, 100);

});
