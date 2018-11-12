// Assignment 2 - Harold the Hamster
//Sources:
// Lynda D3 JS Essential Training for Data Scientists https://www.lynda.com/D3-js-tutorials/D3-js-Essential-Training-Data-Scientists/504428-2.html
//D3Noob Grouping and summing data using D3 http://www.d3noob.org/2014/02/grouping-and-summing-data-using-d3nest.html


var parseDate = d3.timeParse("%Y-%m-%d");
var parseDateString = d3.timeParse("%a %b %d %Y");

d3.csv("DataHarold.csv")
  .row(function(d){return {date: parseDate(d.created_at.trim().slice(0, d.created_at.length-13)) , distance: Number(d.distance), entry_id:Number(d.entry_id) , rotations:Number(d.rotations) , speed:Number(d.speed)  }})
  .get(function(error, data) {
    console.log(data);

// Group the distance data per day
// Source: http://www.d3noob.org/2014/02/grouping-and-summing-data-using-d3nest.html
    var data = d3.nest()
      .key(function(d) { return d.date;})
      .rollup(function(d) {
        return d3.sum(d, function(g) {return g.distance; });
      }).entries(data);

    console.log(data);

    data.forEach(function(d) {
      d.date = d.key;
      d.date = parseDateString(d.date.substring(0, 15));
      d.distance = d.value;
    });

    console.log(data);

    var height = 500;
    var width = 1000;

    var max = d3.max(data, function(d){return d.distance;});
    var minDate = d3.min(data, function(d){return d.date});
    var maxDate = d3.max(data, function(d){return d.date});
    console.log(minDate);
    console.log(maxDate);

// Y scale
    var y = d3.scaleLinear()
      .domain([0, max])
      .range([height, 0]);

// X scale
    var x = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([0, width]);

    var yAxis = d3.axisLeft(y);
    var xAxis = d3.axisBottom(x);

    var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

    var margin = {left:50, right:50, top:40, bottom:0};

    var chartGroup = svg.append("g")
      .attr("transform", "translate("+margin.left+","+margin.right+")");

    var line = d3.line()
      .x(function(d){return x(d.date);})
      .y(function(d){return y(d.distance);});

    chartGroup.append("path").attr("d", line(data));
    chartGroup.append("g").attr("class", "x axis").attr("transform","translate(0, "+height+")" ).call(xAxis);
    chartGroup.append("g").attr("class", "y axis").call(yAxis);


})
