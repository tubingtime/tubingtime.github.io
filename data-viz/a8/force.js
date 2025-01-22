/* Following this example:
https://observablehq.com/@d3/force-directed-graph
&&
https://flowingdata.com/2012/08/02/how-to-make-an-interactive-network-visualization/
*/
let nodeArr = []; let linkArr = [];

d3.csv("soc-firm-hi-tech.csv", function(d, i) {
  let src = d["source"];
  let target = d["destination"];

  /* Not sure how I would go about checking for duplicates using this javascript anon function stuff 
      I would need to access the data from the d array but idk how */
      /* Another option would be to just get all the data into an array and then do some more processing later */
  

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
  console.log(linkArr);

  var w = 600;
  var h = 600;
  const margin = { top : 50, bottom : 20, left : 50, right : 20}
  const innerWidth = w - margin.left - margin.right;
  const innerHeight = h - margin.top - margin.bottom;



  let svg = d3.select("svg")
          .attr("width", w)
          .attr("height", h);
/*   const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`) */
  
  /* Setup physics engine */
  let forceSim = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(node){
      return node.id;
    }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(w/2, h/2));
  
  let links = svg.append("g")
    .attr("class","links")
    .selectAll("line")
    .data(linkArr)
    .enter()
    .append("line");
    links.attr("stroke-width", 1);
  
  let nodes = svg.append("g")
    .attr("class","nodes")
    .selectAll("circle")
    .data(nodeArr)
    .enter()
    .append("circle");
  nodes
    .attr("r",5)
    .attr("fill", "black");

  nodes.append("title")
    .text(function(node){return node.id});

  
  forceSim
      .nodes(nodeArr)
      .on("tick", ticked);

  forceSim.force("link")
      .links(linkArr);

  function ticked() {
    links
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    nodes
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }


});
