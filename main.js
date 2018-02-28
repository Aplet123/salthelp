var width = innerWidth - 4;
var height = innerHeight - 4;
var svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
var maing = svg.append("g");
maing.append("rect")
  .attrs({
    x: -1 * width,
    y: -1 * height,
    width: width * 3,
    height: height * 3,
    fill: "#eeeeee"
  });
var linkg = maing.append("g");
var nodeg = maing.append("g");
var zoom = d3.zoom()
  .translateExtent([[-1 * width, - 1 * height], [1.5 * width, 1.5 * height]])
  .scaleExtent([0.5, 2])
  .on("zoom", function () {
    maing.attr("transform", d3.event.transform);
  });
svg.call(zoom)
  .call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2));
var lookup = {};
var links = [];
for (var i = 0; i < data.length; i ++) {
  var d = data[i];
  lookup[d.id] = d;
  d.x = d.x || 0;
  d.y = d.y || 0;
  d.r = d.r || 10;
  d.fill = d.fill || "#0000ff";
  d.stroke = d.stroke || "#000000";
  d["stroke-width"] = d["stroke-width"] || 1;
  d["path-width"] = d["path-width"] || 1;
  d["path-fill"] = d["path-fill"] || "transparent";
  d["path-linecap"] = d["path-linecap"] || "round";
  d["path-stroke"] = d["path-stroke"] || "#000000";
  d.parents = d.parents || [];
  d.rotation = d.rotation || 0;
  for (var j = 0; j < d.parents.length; j ++) {
    links.push({
      source: lookup[d.parents[j]],
      target: d,
      hide: false
    });
    if (j > 0) {
      links.push({
        source: lookup[d.parents[j]],
        target: lookup[d.parents[j - 1]],
        hide: true
      });
    }
  }
  var apg = nodeg.append("g")
    .attr("transform", "translate(" + d.x + " " + d.y + ")")
    .datum(d);
  d.node = apg;
  apg.append("circle")
    .attrs({
      cx: 0,
      cy: 0,
      r: d.r,
      fill: d.fill,
      stroke: d.stroke,
      "stroke-width": d["stroke-width"]
    });
  apg.append("path")
    .attr("d", d.path)
    .attr("stroke", d["path-stroke"])
    .attr("fill", d["path-fill"])
    .attr("stroke-linecap", d["path-linecap"])
    .attr("stroke-width", d["path-width"])
    .attr("transform", "rotate(" + d.rotation + ")");
}
var sim = d3.forceSimulation()
  .nodes(data)
  .force("charge", d3.forceManyBody().strength(-50))
  .force("link", d3.forceLink().links(links).distance(50).strength(0.4))
  .force("superforce", d3.forceManyBody().strength(function (d) {
    if (d.id == "salt") {
      return -100;
    }
    return 0;
  }));
sim.stop();
while(sim.alpha() > sim.alphaMin()) {
  sim.tick();
}
nodeg.selectAll("g")
    .attr("transform", function (d) {
      return "translate(" + d.x + " " + d.y + ")";
    });
for (var i = 0; i < links.length; i ++) {
  var l = links[i];
  if (l.hide != true) {
    linkg.append("line")
      .attr("x1", l.source.x)
      .attr("y1", l.source.y)
      .attr("x2", l.target.x)
      .attr("y2", l.target.y)
      .attr("stroke", "#000000")
      .attr("stroke-width", 1);
  }
}