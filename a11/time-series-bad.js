var svg = d3.select("svg"),
	margin = { top: 20, right: 80, bottom: 40, left: 50 },
	width = svg.attr("width") - margin.left - margin.right,
	height = svg.attr("height") - margin.top - margin.bottom,
	g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y%");

var x = d3.scaleLinear().range([0, width - margin.right]), //margin.right ?
	y = d3.scaleLinear().range([height, 0]);


const makeLine = (yScale) => d3.line()
	.curve(d3.curveBasis)
	.x(function (d) { return x(d.year); })
	.y(function (d) { return yScale(d.temperature); });

var line = d3.line()
	.curve(d3.curveBasis)
	.x(function (d) { return x(d.year); })
	.y(function (d) { return y(d.temperature); });

d3.csv("nasatemp.csv", function (d) {
	return d;
}).then(function (data) {

	let columns = ['date', 'temperature']
	for (d of data) {
		for (var i = 1, n = columns.length, c; i < n; ++i)
			d[c = columns[i]] = +d[c];
	}

	let tempArray = data.map(function(d){return d.temperature});
	let min = d3.min(tempArray), max = d3.max(tempArray);
	x.domain(d3.extent(data, function (d) { return d.year; }));	
	y.domain([
		-40,
		40
	]);

	const x_axis = g.append("g")
		.attr("class", "axis axis--x")
		.attr("id", 'x_axis')
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x))
		.append("text")
		.attr("transform", "rotate(0)")
		.attr("fill","black")
		.attr("x",x(d3.median(data.map(function(d){return d.year}))))
		.attr("y",32)
		.text("Year")

	let y_axis = g.append("g")
		.attr("class", "axis_y")
		.call(d3.axisLeft(y));
	y_axis
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", "0.71em")
		.attr("fill", "#000")
		.text("Change in Global Temperature, ºC");

	let path = 	g.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("d", line(data))
			.attr("visibility", "visible");
	const yAxis = (g, y) => g
	      .call(d3.axisLeft(y));
	function zoomed(event) {
		console.log(event);
		var y2 = event.transform.rescaleY(y);
		path.attr("d", function (d) {
			return makeLine(y2)(d);
			//const makeLine = (xScale) => d3.line()
			//.curve(d3.curveBasis)
			//.x(function(d) { return xScale(d.date); })
			//.y(function(d) { return y(d.temperature); });
		});
		y_axis.call(yAxis, y2);
	}

	const zoom = d3.zoom()
		.scaleExtent([0, 5])
		.extent([[margin.left, 0], [width - margin.right, height]])
		.translateExtent([[margin.left, -Infinity], [width - margin.right, Infinity]])
		.on("zoom", zoomed);

	svg.call(zoom)
		.transition()
		.duration(100)
		.call(zoom.scaleTo, 1, [y(Date.UTC(2012, 1, 1)), 0]); // ??
/* 	y.domain([
		min,
		max
	]);
	y_axis
		.transition()
		.duration(8000)
		.call(d3.axisLeft(y));
	path
		.transition()
		.duration(8000)
		.attr("d", line(data)) */
})
/*  */