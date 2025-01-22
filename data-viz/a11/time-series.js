var svg = d3.select("svg"),
	margin = { top: 20, right: 80, bottom: 40, left: 50 },
	width = svg.attr("width") - margin.left - margin.right,
	height = svg.attr("height") - margin.top - margin.bottom,
	g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y%");

var x = d3.scaleLinear().range([0, width - margin.right]), //margin.right ?
	y = d3.scaleLinear().range([height, 0]);


const makeLine = (xScale) => d3.line()
	.curve(d3.curveBasis)
	.x(function (d) { return xScale(d.year); })
	.y(function (d) { return y(d.temperature); });

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
	x.domain(d3.extent(data, function (d) { return d.year; }));	
	y.domain([
		d3.min(tempArray),
		d3.max(tempArray)
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

	g.append("g")
		.attr("class", "axis axis--y")
		.call(d3.axisLeft(y))
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", "0.71em")
		.attr("fill", "#000")
		.text("Change in Global Temperature, ºC");

	g.append("path")
		.datum(data)
		.attr("class", "line")
		.attr("d", function (d) { console.log(d);return line(d); })
		.attr("visibility", "visible")

	
})
/*  */