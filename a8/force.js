/* Following this example:
https://observablehq.com/@d3/force-directed-graph
&&
https://flowingdata.com/2012/08/02/how-to-make-an-interactive-network-visualization/
*/
let nodeArr = []; let linkArr = [];

d3.csv("soc-firm-hi-tech.csv", function(d, i) {
  let src = d["source"];
  let dest = d["destination"];

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

}).then(function(d) {
  
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
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  
    
});
