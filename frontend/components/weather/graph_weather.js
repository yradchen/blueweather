const graphWeather = (weather) => {
  const data = [];

  weather.forEach(el => {
    const date = new Date(el.time * 1000);
    const precipProbability = el.precipProbability * 100;
    data.push({ "date": date, "temperature": el.temperature, "wind": el.windSpeed, "precipProbability": precipProbability  });
  });

  var svg = d3.select("svg");
  svg.selectAll("*").remove();

  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");



  var x = d3.scaleTime()
    .rangeRound([0, width]);

  var y = d3.scaleLinear()
    .rangeRound([height, 0]);

  var lineTemp = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });

  var lineWind = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.wind); });

  var linePrecip = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.precipProbability); });

  x.domain(d3.extent(data, function(d) { return d.date; }));
  // y.domain(d3.extent(data, function(d) { return d.temperature, d.wind; }));
  // y.domain(d3.extent(data, function(d) { return d.temperature, d.wind; }));
  y.domain([0, d3.max(data, function(d) { return Math.max(d.temperature, d.wind, d.precipProbability); })]);

  g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain");

  g.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Temperature");

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", lineTemp);
    // debugger
  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", lineWind);

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", linePrecip);

};

export default graphWeather;
