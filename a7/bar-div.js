d3.csv("weather.csv", function(d) {
  if (d["Station.City"] == "San Francisco" && d["Date.Year"] == "2016")
    return {
        month: d3.isoParse(d["Date.Full"]),
        avgTemp: +d["Data.Temperature.Avg Temp"] // can rename properties such as "land_area" instead of "land area" 
  };
}).then(function(wdata) {
  let min = (d3.min(wdata, function(d){
      return d.avgTemp;
  }))
  let max = (d3.max(wdata, function(d){
      return d.avgTemp;
  }))
  let mean = (d3.mean(wdata, function(d){
      return d.avgTemp;
  }))
  
  paddedExtent = [
    d3.min(wdata.map(d => d.month)), 
    d3.max(wdata.map(d => d.month))
  ];


  var w = 800;
  var h = 500;
  const margin = { top : 50, bottom : 20, left : 50, right : 20}
  const innerWidth = w - margin.left - margin.right;
  const innerHeight = h - margin.top - margin.bottom;


  let svg = d3.select("svg")
          .attr("width", w)
          .attr("height", h);
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  let sequentialScale = d3.scaleDiverging()
    .domain([max,mean,min])
    .interpolator(d3.interpolateRdBu);


  function drawBars(dataset, barPadding){

    let xTime = d3.scaleTime()
      .domain(paddedExtent)
      .rangeRound([0,innerWidth])
    let xScale = d3.scaleBand()
        .domain(dataset.map(d => d.month))   // Data space
        .rangeRound([0,innerWidth]) // Pixel space
        .padding(.1)
    let yScale = d3.scaleLinear()
        .domain([0, max])   // Data space
        .range([innerHeight, 0]); // Pixel space

    var xAxis = d3.axisBottom(xTime);
    var yAxis = d3.axisLeft(yScale);
    g.append('g').call(yAxis);
    g.append('g').call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`); // move axis to bottom
    
    /* Draw mean on axis */
    let points = [
      [0,yScale(mean)],
      [innerWidth,yScale(mean)]
    ]
    console.log(points);
    let line = d3.line();
    g.append("path")
      .attr("fill","none")
      .attr("stroke","pink")
      .attr("stroke-width", 1.5)
      .attr("d", line(points));
    
    
    /* BEGIN Drawing rects */

    let rects = svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect");

    rects.attr("x", function(d, i) {

      return xScale(d.month)+margin.left; //not sure why i need + marginleft here (i think it has to do with barwidth func )
  })
      .attr("y", function(d){
        return yScale(d.avgTemp) + margin.top-1;
      })
      .attr("height",function(d){
        return innerHeight - yScale(d.avgTemp);
      })
      .attr("width", xScale.bandwidth()) // this is problematic
      .attr("fill",function(d){
        return sequentialScale(d.avgTemp);
      })
      .attr("date",function(d){
        return d.month; /* for debugging */
      })
}

function drawScale(){
  svg.append("g")
  .attr("class", "colorLegend")
  .attr("transform", `translate(${innerWidth-150},00)`);
  let colorLegend = d3.legendColor()
    .shapeWidth(40)
    .orient('horizontal')
    .cells(5)
    .scale(sequentialScale);
  svg.select(".colorLegend")
    .call(colorLegend);
  
  
}
  drawBars(wdata, 100);
  var labelx = svg.append("text")
                  .attr("transform", "translate(20,300)rotate(-90)" )
                  .text("Temperature in Farenheit")
  drawScale();

    
});
