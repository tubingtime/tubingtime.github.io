var svg = d3.select("svg"),
    margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y%m%d");

var x = d3.scaleTime().range([0, width - margin.right]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);


const makeLine = (xScale) => d3.line()
	.curve(d3.curveBasis)
	.x(function(d) { return xScale(d.date); })
    .y(function(d) { return y(d.temperature); });

var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });

d3.tsv("data.tsv", function(d) {
	return d;
}).then(function(data) {

	  let columns = ['date', 'New York', 'San Francisco', 'Austin']
	  for (d of data) {
		  d.date = parseTime(d.date);
  	      for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
	  }

	  var cities = data.columns.slice(1).map(function(id) {
	    return {
	      id: id,
	      values: data.map(function(d) {
	        return {date: d.date, temperature: d[id]};
	      })
	    };
	  });

	  x.domain(d3.extent(data, function(d) { return d.date; }));

	  y.domain([
	    d3.min(cities, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }),
	    d3.max(cities, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); })
	  ]);

	  z.domain(cities.map(function(c) { return c.id; }));

	  const x_axis = g.append("g")
	      .attr("class", "axis axis--x")
	      .attr("id", 'x_axis')
	      .attr("transform", "translate(0," + height + ")")
	      .call(d3.axisBottom(x));

	  g.append("g")
	      .attr("class", "axis axis--y")
	      .call(d3.axisLeft(y))
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", "0.71em")
	      .attr("fill", "#000")
	      .text("Temperature, ºF");

	  var city = g.selectAll(".city")
	    .data(cities)
	    .enter().append("svg")
	      .attr("class", "city")
		  .attr("width", width - margin.right);


	  function hover(elem) {
		let myLineId = "path#" + elem.originalTarget.dataset.id;
        let myLine = svg.select(myLineId);
		if (myLine.attr('visibility') == 'hidden') {
			return;
	   }

        let paths = ["SAN","NEW","AUS"].filter(function(d){
			return elem.originalTarget.dataset.id != d;
		})
		myLine.style("stroke","red");
		for(let i = 0; i < paths.length; i++){
			myLineId = "path#" + paths[i];
			myLine = svg.select(myLineId)
			myLine.style("stroke","grey");
		}
	  }

	  function exit(elem) {
	     var attrs = elem.srcElement.attributes;
	     let id = attrs['data-id'].value;
	     let path = city.select('#' + id);
	     if (path.attr('visibility') == 'hidden') {
	  		return;
	     }
	     city.selectAll('.line').style('stroke', d => {
	  		return z(d.id)
	     });
	  }

	  function click(elem) {
                      
        let myLineId = "path#" + elem.originalTarget.dataset.id;
        let myLine = svg.select(myLineId);
        console.log(myLine.attr("visibility"))
        if (myLine.attr("visibility") == "visible"){
			exit(elem);
            myLine.attr("visibility", "hidden");
        }
        else {
            myLine.attr("visibility", "visible")
        }
	    
	  }

	  const xAxis = (g, x) => g
	      .attr("transform", `translate(0,${height})`)
	      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

	  function zoomed(event) {
		// Add code here for zooming 
	  }

	  const zoom = d3.zoom()
	      .scaleExtent([1, 5])
	      .extent([[margin.left, 0], [width - margin.right, height]])
	      .translateExtent([[margin.left, -Infinity], [width - margin.right, Infinity]])
	      .on("zoom", zoomed);

	  svg.call(zoom)
	    .transition()
	      .duration(100)
	      .call(zoom.scaleTo, 1, [x(Date.UTC(2012, 1, 1)), 0]);



	  city.append("path")
	      .attr("class", "line")
	      .attr("d", function(d) { return line(d.values); })
		  .attr("id", d => d.id.substring(0, 3).toUpperCase())
		  .attr("data-id", d => d.id.substring(0, 3).toUpperCase())
		  .attr("visibility", "visible")
	      .style("stroke", function(d) { return z(d.id); })
		  .on("mouseout", exit);

	  svg.selectAll(".label")
		  .data(cities)
		  .enter()
          .append("text")
	      .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
		  .attr("class", "label")
	      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
	      .attr("x", 55)
		  .attr("y", 15)
	      .attr("dy", "0.35em")
		  .attr("data-id", d => d.id.substring(0, 3).toUpperCase())
	      .style("font", "10px sans-serif")
	      .text(function(d) { return d.id; })
          .on("click",function(d){click(d)})
		  .on("mouseover",function(d){hover(d)})
		  .on("mouseout", exit)

})
/*  */