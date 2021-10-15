/* Following this example:
https://observablehq.com/@d3/force-directed-graph
&&
https://flowingdata.com/2012/08/02/how-to-make-an-interactive-network-visualization/
*/
let nodeArr = []; let linkArr = [];

d3.csv("soc-firm-hi-tech.csv", function(d, i) {
  let src = d["source"];
  let dest = d["destination"];

  /* Not sure how I would go about checking for duplicates using this javascript anon function stuff 
      I would need to access the data from the d array but idk how */

  if (nodeArr[src] == null){ 
    nodeArr[src] = {
      id : src
    }
  }
  if (nodeArr[dest] == null){ 
    nodeArr[dest] = {
      id : dest
    }
  }

  linkArr[i] = {
    source : src,
    destination : dest
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
      return node.id /* hmmm i dont think this will work */
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
    .text(function(d){return d.id});
  
  /* Add nodes */
  forceSimulation
    .nodes(nodeArr)
    .on("tick",ticked);
  /* Add links */
  
  
    
});
