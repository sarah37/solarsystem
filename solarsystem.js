// data for planets
var G = 39.47841760435743;

// OPTIONS
var splitXY = false;
var vArrowsOn = false;
var aArrowsOn = false;
var hZoneOn = false;
var durationYear = 10000;

d3.select("#splitXY").on("change", function () {
  if (splitXY == true) {
    splitXY = false;
    if (vArrowsOn) {
      d3.selectAll(".vArrowMono").classed("invisible", false);
    }
    if (aArrowsOn) {
      d3.selectAll(".aArrowMono").classed("invisible", false);
    }
    d3.selectAll(".vArrowSplit, .aArrowSplit").classed("invisible", true);
  } else {
    splitXY = true;
    if (vArrowsOn) {
      d3.selectAll(".vArrowSplit").classed("invisible", false);
    }
    if (aArrowsOn) {
      d3.selectAll(".aArrowSplit").classed("invisible", false);
    }
    d3.selectAll(".vArrowMono, .aArrowMono").classed("invisible", true);
  }
});

d3.select("#vArrowsOn").on("change", function () {
  if (vArrowsOn) {
    vArrowsOn = false;
    d3.selectAll(".vArrowSplit, .vArrowMono").classed("invisible", true);
  } else {
    vArrowsOn = true;
    if (splitXY) {
      d3.selectAll(".vArrowSplit").classed("invisible", false);
    } else {
      d3.selectAll(".vArrowMono").classed("invisible", false);
    }
  }
});

d3.select("#aArrowsOn").on("change", function () {
  if (aArrowsOn) {
    aArrowsOn = false;
    d3.selectAll(".aArrowSplit, .aArrowMono").classed("invisible", true);
  } else {
    aArrowsOn = true;
    if (splitXY) {
      d3.selectAll(".aArrowSplit").classed("invisible", false);
    } else {
      d3.selectAll(".aArrowMono").classed("invisible", false);
    }
  }
});

d3.select("#hZoneOn").on("change", function () {
  if (hZoneOn) {
    hZoneOn = false;
    d3.select("#hZone").classed("invisible", true);
  } else {
    hZoneOn = true;
    d3.select("#hZone").classed("invisible", false);
  }
});

d3.select("#massSun").on("input", function () {
  planetData[0].m = this.value;
});

d3.select("#massEarth").on("input", function () {
  planetData[1].m = this.value * 3 * math.pow(10, -6);
  console.log(planetData[1].m);
});

d3.select("#dSunEarth").on("change", function () {
  // a = math.atan2(planetData[1].x[0],planetData[1].x[1]);
  // planetData[1].x[0] = math.cos(a * this.value);
  // planetData[1].x[1] = math.sin(a * this.value);
  planetData[1].x = [parseFloat(this.value), 0];
  planetData[1].v = [0, 6.283185307179586];
  planetData[1].a = [0, 0];
});

d3.select("#resetButton").on("click", function () {
  console.log("Reset requested");
  d3.select("#massSun").property("value", "1");
  d3.select("#massEarth").property("value", "1");
  planetData[0].m = 1;
  planetData[1].m = 3 * math.pow(10, -6);
  planetData[0].x = [0, 0];
  planetData[0].v = [0, 0];
  planetData[0].a = [0, 0];
  planetData[1].x = [1, 0];
  planetData[1].v = [0, 6.283185307179586];
  planetData[1].a = [0, 0];
});

d3.select("#durationYear").on("change", function () {
  durationYear = this.value;
});

// legend
d3.select("#vLegend")
  .append("svg")
  .attr("width", "40px")
  .attr("height", "8px")
  .append("polyline")
  .attr("points", function () {
    return arrowPoints(0, 4, 40);
  });

d3.select("#aLegend")
  .append("svg")
  .attr("width", "40px")
  .attr("height", "8px")
  .append("polyline")
  .attr("points", function () {
    return arrowPoints(0, 4, 40);
  });

var planetData = [
  {
    i: 0,
    name: "Sun",
    size: 10,
    colour: "#fd1",
    m: 1,
    x: [0, 0],
    v: [0, 0],
    a: [0, 0],
  },
  {
    i: 1,
    name: "Earth",
    size: 3,
    colour: "#01f",
    m: 3 * math.pow(10, -6),
    x: [1, 0],
    v: [0, 6.283185307179586],
    a: [0, 0],
  },
];

//Width and height of window
var w = window.innerWidth - 200;
var h = window.innerHeight;

// set max value for size of orbit
var max = Math.min(w, h);

// Select div for svg
var svgDiv = d3.select("#svgDiv");

// define scales
var posScale = d3.scale
  .linear()
  .domain([-2, 2])
  .range([-0.8 * max, 0.8 * max]);

var sizeScale = d3.scale
  .linear()
  .domain([0, 10])
  .range([0, max / 15]);

var velocityScale = d3.scale
  .linear()
  .domain([-10, 10])
  .range([-max * 0.2, max * 0.2]);

var accelerationScale = d3.scale
  .linear()
  .domain([-50, 50])
  .range([-max * 0.2, max * 0.2]);

//Create SVG element
var svg = d3
  .select("#planetDiv")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

// create defs section in svg
var defs = svg.append("defs");

// sun gradient
var gradientSun = defs.append("radialGradient").attr("id", "gradientSun");
gradientSun
  .append("stop")
  .attr("offset", "0%")
  .attr("stop-color", "rgb(255,242,0)");
gradientSun
  .append("stop")
  .attr("offset", "70%")
  .attr("stop-color", "rgb(255,201,14)");
gradientSun
  .append("stop")
  .attr("offset", "100%")
  .attr("stop-color", "rgb(255,127,39)");

// earth gradient
var gradientEarth = defs
  .append("radialGradient")
  .attr("id", "gradientEarth")
  .attr("cx", "22%")
  .attr("cy", "50%")
  .attr("r", "65%");
gradientEarth
  .append("stop")
  .attr("offset", "0%")
  .attr("stop-color", function () {
    return d3.rgb("#01f").brighter(1);
  });
gradientEarth.append("stop").attr("offset", "50%").attr("stop-color", "#01f");
gradientEarth
  .append("stop")
  .attr("offset", "100%")
  .attr("stop-color", function () {
    return d3.rgb("#01f").darker(1.5);
  });

// glow filter
var filter = defs.append("filter").attr("id", "glow");
filter
  .append("feGaussianBlur")
  .attr("stdDeviation", "5")
  .attr("result", "coloredBlur");
var feMerge = filter.append("feMerge");
feMerge.append("feMergeNode").attr("in", "coloredBlur");
feMerge.append("feMergeNode").attr("in", "SourceGraphic");

// add circles
all = svg.selectAll("circle").data(planetData).enter();

// habitable Zone
svg
  .append("circle")
  .classed("invisible", true)
  .attr("id", "hZone")
  .attr("cx", w / 2)
  .attr("cy", h / 2)
  .attr("r", posScale(1.2))
  .attr("stroke-width", posScale(0.6));

// planets
all
  .append("circle")
  .classed("planet", true)
  .attr("id", function (d) {
    return "is" + d.name;
  })
  .attr("cx", function (d) {
    return w / 2 + posScale(d.x[0]);
  })
  .attr("cy", function (d) {
    return h / 2 + posScale(d.x[1]);
  })
  .attr("r", function (d) {
    return sizeScale(d.size);
  })
  .style("fill", function (d) {
    return "url(#gradient" + d.name + ")";
  });

// without this line the sun don't shine
d3.select("#isSun").style("filter", "url(#glow)");

// initialise arrows
all
  .append("polyline")
  .classed("vArrowSplit", true)
  .attr("id", function (d) {
    return "isVXof" + d.name;
  });

all
  .append("polyline")
  .classed("vArrowSplit", true)
  .attr("id", function (d) {
    return "isVYof" + d.name;
  });

all
  .append("polyline")
  .classed("vArrowMono", true)
  .attr("id", function (d) {
    return "isVof" + d.name;
  });

all
  .append("polyline")
  .classed("aArrowSplit", true)
  .attr("id", function (d) {
    return "isAXof" + d.name;
  });

all
  .append("polyline")
  .classed("aArrowSplit", true)
  .attr("id", function (d) {
    return "isAYof" + d.name;
  });

all
  .append("polyline")
  .classed("aArrowMono", true)
  .attr("id", function (d) {
    return "isAof" + d.name;
  });

// start timer to start running
var t_elapsed = 0;
var t_old = 0;
var dtt = 0;
var dt = 0;

d3.timer(tickFn);

function tickFn(_elapsed) {
  t_elapsed = _elapsed; // fix elapsed time for this iteration
  dtt = t_elapsed - t_old; // dt is time span between this and last iteration
  t_old = t_elapsed; // update t_old so in the next iteration, it contains the old elapsed time
  dt = dtt / durationYear; // create dt based on how long a year should take

  // go through all planets
  for (var i = 0; i < planetData.length; i++) {
    // new position
    planetData[i].x = math.add(
      planetData[i].x,
      planetData[i].v.map(function (x) {
        return x * dt;
      })
    );

    // new acceleration
    planetData[i].a = acceleration(i, planetData);

    // new velocity
    planetData[i].v = math.add(
      planetData[i].v,
      planetData[i].a.map(function (x) {
        return x * dt;
      })
    );
  } // end for loop

  // actually move the earth
  svg
    .selectAll(".planet")
    .attr("cx", function (d) {
      return w / 2 + posScale(d.x[0]);
    })
    .attr("cy", function (d) {
      return h / 2 + posScale(d.x[1]);
    });

  // rotate the earth so its shadow is oriented correctly
  svg.select("#isEarth").attr("transform", function (d) {
    x = w / 2 + posScale(d.x[0]);
    y = h / 2 + posScale(d.x[1]);
    return (
      "rotate(" +
      rad2deg(Math.atan2(d.x[1], d.x[0])) +
      ", " +
      x +
      ", " +
      y +
      ")"
    );
  });

  if (vArrowsOn) {
    if (splitXY) {
      svg
        .select("#isVXofEarth")
        .attr("points", function (d) {
          x = w / 2 + posScale(d.x[0]);
          y = h / 2 + posScale(d.x[1]);
          l = math.abs(velocityScale(d.v[0]));
          return arrowPoints(x, y, l);
        })
        .attr("transform", function (d) {
          x = w / 2 + posScale(d.x[0]);
          y = h / 2 + posScale(d.x[1]);
          if (d.v[0] < 0) {
            return "rotate(180, " + x + "," + y + ")";
          } else {
            return "rotate(0)";
          }
        });

      svg
        .select("#isVYofEarth")
        .attr("points", function (d) {
          x = w / 2 + posScale(d.x[0]);
          y = h / 2 + posScale(d.x[1]);
          l = math.abs(velocityScale(d.v[1]));
          return arrowPoints(x, y, l);
        })
        .attr("transform", function (d) {
          x = w / 2 + posScale(d.x[0]);
          y = h / 2 + posScale(d.x[1]);
          if (d.v[1] < 0) {
            return "rotate(270, " + x + "," + y + ")";
          } else {
            return "rotate(90, " + x + "," + y + ")";
          }
        });
    } // end split XY for v

    if (splitXY == false) {
      svg
        .select("#isVofEarth")
        .attr("points", function (d) {
          x = w / 2 + posScale(d.x[0]);
          y = h / 2 + posScale(d.x[1]);
          l = velocityScale(lengthVector(d.v));
          return arrowPoints(x, y, l);
        })
        .attr("transform", function (d) {
          angle = rad2deg(Math.atan2(d.v[1], d.v[0]));
          posx = w / 2 + posScale(d.x[0]);
          posy = h / 2 + posScale(d.x[1]);
          return "rotate(" + angle + "," + posx + "," + posy + ")";
        });
    } //end no split for v
  } // end vArrowsOn

  if (aArrowsOn) {
    if (splitXY) {
      svg
        .select("#isAXofEarth")
        .attr("points", function (d) {
          x = w / 2 + posScale(d.x[0]);
          y = h / 2 + posScale(d.x[1]);
          l = math.abs(accelerationScale(d.a[0]));
          return arrowPoints(x, y, l);
        })
        .attr("transform", function (d) {
          x = w / 2 + posScale(d.x[0]);
          y = h / 2 + posScale(d.x[1]);
          if (d.a[0] < 0) {
            return "rotate(180, " + x + "," + y + ")";
          } else {
            return "rotate(0)";
          }
        });

      svg
        .select("#isAYofEarth")
        .attr("points", function (d) {
          x = w / 2 + posScale(d.x[0]);
          y = h / 2 + posScale(d.x[1]);
          l = math.abs(accelerationScale(d.a[1]));
          return arrowPoints(x, y, l);
        })
        .attr("transform", function (d) {
          x = w / 2 + posScale(d.x[0]);
          y = h / 2 + posScale(d.x[1]);
          if (d.a[1] < 0) {
            return "rotate(270, " + x + "," + y + ")";
          } else {
            return "rotate(90, " + x + "," + y + ")";
          }
        });
    } // end split XY for a

    if (splitXY == false) {
      svg
        .select("#isAofEarth")
        .attr("points", function (d) {
          x = w / 2 + posScale(d.x[0]);
          y = h / 2 + posScale(d.x[1]);
          l = accelerationScale(lengthVector(d.a));
          return arrowPoints(x, y, l);
        })
        .attr("transform", function (d) {
          angle = rad2deg(Math.atan2(d.a[1], d.a[0]));
          posx = w / 2 + posScale(d.x[0]);
          posy = h / 2 + posScale(d.x[1]);
          return "rotate(" + angle + "," + posx + "," + posy + ")";
        });
    } // end no split for a
  } // end aArrowsOn
} // end tickFn

function lengthVector(u) {
  return math.sqrt(math.dot(u, u));
}

function rad2deg(radians) {
  degrees = (radians / (2 * math.pi)) * 360; //360* = 2 pi
  return degrees;
}

function acceleration(i, planetData) {
  // computes acceleration: G=gravity, N=number of objects, x=position matrix
  // clean var for a
  var a = [0, 0];

  // for each object, iterate through all objects except itself and
  // add the acceleration component
  for (k = 0; k < planetData.length; k++) {
    if (k == i) {
      continue;
    }
    // calculate acceleration on object m due to object k
    m = planetData[k].m;
    x_i = planetData[i].x;
    x_k = planetData[k].x;
    r_ik = math.subtract(x_k, x_i);
    d_SE = math.pow(lengthVector(r_ik), 3);

    var ak = r_ik.map(function (x) {
      return (x * G * m) / d_SE;
    });
    a = math.add(a, ak);
  } //end loop k
  return a;
} // end function acceleration

function arrowPoints(x, y, l) {
  if (l <= 7) {
    var points =
      x +
      " " +
      (y + (4 / 7) * l) +
      ", " +
      (x + l) +
      " " +
      y +
      ", " +
      x +
      " " +
      (y - (4 / 7) * l);
    return points;
  } else {
    var p1 = x + " " + (y - 1);
    var p2 = x + " " + (y + 1);
    var p3 = x + l - 7 + " " + (y + 1);
    var p4 = x + l - 7 + " " + (y + 4);
    var p5 = x + l + " " + y;
    var p6 = x + l - 7 + " " + (y - 4);
    var p7 = x + l - 7 + " " + (y - 1);
    var points =
      p1 +
      ", " +
      p2 +
      ", " +
      p3 +
      ", " +
      p4 +
      ", " +
      p5 +
      ", " +
      p6 +
      ", " +
      p7;
    return points;
  }
}

function unitVector(vector) {
  result = vector.map(function (x) {
    return x / lengthVector(vector);
  });
  return result;
}
