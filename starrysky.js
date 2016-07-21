var pRatio = window.devicePixelRatio;

var w = window.innerWidth;
var h = window.innerHeight;

var correctZoom = d3.scale.linear()
            .domain([0, pRatio])
            .range([0, 1]);

var aFactor = Math.round(w*h/500000);

var smallStars = [];
for (var i = 0; i < aFactor*100; i++) {
  smallStars.push({"x": randomX(), "y": randomY()});  
}

var mediumStars = [];
for (var i = 0; i < aFactor*10; i++) {
  mediumStars.push({"x": randomX(), "y": randomY()});  
}

var bigStars = [];
for (var i = 0; i < aFactor; i++) {
  bigStars.push({"x": randomX(), "y": randomY()});  
}


// glow
// var defs = svg.append("defs");

// var filter = defs.append("filter")
//   .attr("id", "glow");
// filter.append("feGaussianBlur")
//   .attr("stdDeviation", "10")
//   .attr("result", "coloredBlur");
// var feMerge = filter.append("feMerge");
// feMerge.append("feMergeNode")
//   .attr("in", "coloredBlur");
// feMerge.append("feMergeNode")
//   .attr("in", "SourceGraphic");

var svg = d3.select("#svgDiv")
.append("svg")
.attr("width", w)
.attr("height", h);

svg.selectAll(".smallStar")
.data(smallStars)
.enter()
.append("circle")
.attr("cx", function(d) {return d.x})
.attr("cy", function(d) {return d.y})
.attr("r", "1px")
.style("fill", "#fff");

svg.selectAll(".mediumStar")
.data(mediumStars)
.enter()
.append("circle")
.attr("cx", function(d) {return d.x})
.attr("cy", function(d) {return d.y})
.attr("r", "2px")
.style("fill", "#fff");

svg.selectAll(".bigStar")
.data(bigStars)
.enter()
.append("circle")
.attr("cx", function(d) {return d.x})
.attr("cy", function(d) {return d.y})
.attr("r", "3px")
.style("fill", "#fff");

function randomX() {
  return Math.round(Math.random()*window.innerWidth)
}

function randomY() {
  return Math.round(Math.random()*window.innerHeight)
}