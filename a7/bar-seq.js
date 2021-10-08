d3.csv("weather.csv", function(d) {
  if (d["Station.City"] == "San Francisco" && d["Date.Year"] == "2016")
    return {
        month: d["Date.Full"],
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
  
  let pData = [
    {name : "Min", val : min},
    {name : "Median", val : median},
    {name : "Max", val : max}
  ]
  console.log(pData);

  var w = 800;
  var h = 500;
  const margin = { top : 0, bottom : 20, left : 50, right : 20}
  const innerWidth = w - margin.left - margin.right;
  const innerHeight = h - margin.top - margin.bottom;


  let svg = d3.select("svg")
          .attr("width", w)
          .attr("height", h);
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  function drawBars(dataset, barPadding){
  let xScale = d3.time.scale()
      .domain([2016-01-03,])   // Data space
      .range([0, innerWidth]); // Pixel space
  let yScale = d3.scaleLinear()
      .domain([0, max])   // Data space
      .range([innerHeight, 0]); // Pixel space

  var xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%m"))

  var yAxis = d3.axisLeft(yScale);
  g.append('g').call(d3.axisLeft(yScale));
  g.append('g').call(d3.axisBottom(xScale))
    .attr('transform', `translate(0,${innerHeight})`); // move axis to bottom


  let rects = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect");

  rects.attr("x", function(d, i) {

    return xScale(d.month)+margin.left+5; //not sure why i need + 30 here (i think it has to do with barwidth func )
})
    .attr("y", function(d){
/*       console.log(d.avgTemp)
      console.log(yScale(d.avgTemp)) */
      return yScale(d.avgTemp)
    })
    .attr("height",function(d){
      return innerHeight - yScale(d.avgTemp);
    })
    .attr("width", 5) // this is problematic
    .attr("fill","steelblue")
}
  drawBars(wdata, 100);
  var labelx = svg.append("text")
                  .attr("transform", "translate(20,300)rotate(-90)" )
                  .text("Temperature in Farenheit")

    
});
