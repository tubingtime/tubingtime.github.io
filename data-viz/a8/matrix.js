let nodeArr = []; let linkArr = []; let adjMatrix = []

d3.csv("soc-firm-hi-tech.csv", function(d, i) {
  let src = d["source"];
  let target = d["destination"];

  // Not sure how I would go about checking for duplicates using this javascript anon function stuff 
  //     I would need to access the data from the d array but idk how
        
  // For now I will check for dupes my usual way

  if (!(nodeArr.some(node => node.id == src))){ 
    let node = {id : src};
    nodeArr.push(node);
  }
  if (!(nodeArr.some(node => node.id == target))){ 
    let node = {id : target};
    nodeArr.push(node);
  }

  linkArr[i] = {
    source : src,
    target : target
  }


}).then(function() {
  
  console.log(nodeArr);
  let max = 0;
  // find largest node (to determine size of array matrix)
  nodeArr.map(function(d){
    if (+d.id > max)
      max = d.id;
  })
  max++;
  let adjMatrix = Array.from(Array(max), () => new Array(max)) // create 2d array

  linkArr.map(function(link){ 
    adjMatrix[link.source][link.target] = 1;
    adjMatrix[link.target][link.source] = 1;
  })
  // printAdjMatrix(adjMatrix);

  var w = 600; // right now needs to be at least 600 or else axis ticks start to overlap
  var h = 600;
  const margin = { top : 30, bottom : 20, left : 30, right : 20}
  const innerWidth = w - margin.left - margin.right;
  const innerHeight = h - margin.top - margin.bottom;


  let xScale = d3.scaleLinear()
    .domain([0, adjMatrix.length-1])
    .range([0,innerWidth]);
  let yScale = d3.scaleLinear()
    .domain([0, adjMatrix.length-1])
    .range([0,innerHeight]);


  let svg = d3.select("svg")
          .attr("width", w)
          .attr("height", h);
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
  //set up axis
  var yAxis = d3.axisLeft(yScale).ticks(adjMatrix.length-1);
  var xAxis = d3.axisTop(xScale).ticks(adjMatrix.length-1);
  let squareLen = xScale(1); squareLen = squareLen/2;
  g.append('g').call(yAxis)
    .attr('transform', `translate(0,${squareLen})`);
  g.append('g').call(xAxis)
    .attr('transform', `translate(${squareLen},0)`);
  
  for(let row = 0; row < adjMatrix.length; row++){
    let rectRow = g.selectAll("rect"+row) // if i set this to anything except "rect" it works, why?
      .data(adjMatrix[row])
      .enter()
      .append("rect");

      rectRow
        .attr("x", function(d, i){
          return xScale(i);
          
        })
        .attr("y",function(d, i){
          return yScale(row);
        })
        .attr("height",xScale(1))
        .attr("width",xScale(1))
        .attr("stroke","black")
        .attr("fill", function(d){
          if (d == 1){
            return "black";
          } else {
            return "white";
          }
        });
  }
  
});

function printAdjMatrix(arr){
  console.log(arr);
  let stringMatrix = "";
  for(var i = 0; i < arr.length; i++) {
    for(var p = 0; p < arr.length; p++) {
      if (arr[i][p] == null)
        stringMatrix = (stringMatrix + "0" + " ");
      else 
        stringMatrix = (stringMatrix + arr[p][i] + " ");
    }
    stringMatrix = stringMatrix + "\n";
  }
  console.log(stringMatrix);
}

