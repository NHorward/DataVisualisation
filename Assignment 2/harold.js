// Assignment 2 - Harold the Hamster
//Sources:
// Lynda D3 JS Essential Training for Data Scientists https://www.lynda.com/D3-js-tutorials/D3-js-Essential-Training-Data-Scientists/504428-2.html

// Parse date
var parseDate = d3.timeParse("%Y-%m-%d");

// Append SVG element to the HTML body
var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

// Get daily distance data from Harold the Hamsters Thingspeak IoT channel
d3.json("https://api.thingspeak.com/channels/345243/fields/2.json?days=1000&sum=daily", function(dailydata) {
    console.log(dailydata);

    // Parse the data
    dailydata.feeds.forEach(function(d){
      // Turn the datestring into a date object
      d.date = parseDate(d.created_at.trim().slice(0, d.created_at.length-10));
      // Turn the distance string into a number
      d.distance = Number(d.field2);
    });

    // Set the height and width of the chart
    var height = 500;
    var width = 1000;

    // Get the max distance data, the minimum and maximum date from the dataset
    var max = d3.max(dailydata.feeds, function(d){return d.distance;});
    var minDate = d3.min(dailydata.feeds, function(d){return d.date});
    var maxDate = d3.max(dailydata.feeds, function(d){return d.date});
    // console.log(minDate);
    // console.log(maxDate);

    // Set the Y scale
    var y = d3.scaleLinear()
      .domain([0, max])
      .range([height, 0]);

    // Set the X scale
    var x = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([0, width]);

    var yAxis = d3.axisLeft(y);
    var xAxis = d3.axisBottom(x);

    var margin = {left:50, right:50, top:40, bottom:0};

    var chartGroup = svg.append("g")
      .attr("transform", "translate("+margin.left+","+margin.right+")");

    // Create line chart
    var line = d3.line()
      .x(function(d){return x(d.date);})
      .y(function(d){return y(d.distance);});

    // Add the line path, the x axis and y axis
    chartGroup.append("path").attr("d", line(dailydata.feeds));
    chartGroup.append("g").attr("class", "x axis").attr("transform","translate(0, "+height+")" ).call(xAxis);
    chartGroup.append("g").attr("class", "y axis").call(yAxis);

});


// Get hourly distance data from Harold the Hamsters Thingspeak IoT channel, in a certain timespan
// In this case startdate 11-11-2017 to 01-01-2018
// Can't gather all the hourly data because the maximum of records that can be returned is 8000
// Chose a span in which there is a lot of recorded Harold data
d3.json("https://api.thingspeak.com/channels/345243/fields/2.json?start=2017-11-11%2001:00:10&end=2018-01-01%2000:00:11&sum=60", function(hourlydata) {
    console.log("hourly");

    // Parse the data
    hourlydata.feeds.forEach(function(d){
      // Turn the date into the hour (00-23)
      d.date = Number(d.created_at.substr(11,2));
      // Turn the distance string into a number
      d.distance = Number(d.field2);
    });

      console.log(hourlydata);

    // Nest the data per hour
    var newhourlydata = d3.nest()
      .key(function(d) { return d.date;})
      // Summarise the distance data per hour
      .rollup(function(d) { return d3.sum(d, function(d) { return d.distance; }); })
      .entries(hourlydata.feeds);

    console.log(newhourlydata);

    // Turn the summarised data into numbers
    newhourlydata.forEach(function(d){
      d.date = Number(d.key);
      d.distance = Number(d.value);
    });

// Start of a bart chart to show the total distance per hour of the day
// Nice to see which hours Harold is most active and when he's asleep
  svg.selectAll("rect")
    .data(newhourlydata)
    .enter().append("rect")
      .attr("height",  function(d, i){ return 50 * newhourlydata[i].distance;})
      .attr("width", "50")
    // d = datapoint, i = index
      .attr("x", function(d, i){return 50 + 60 * i;})
      .attr("y", function(d, i){return 800 - 50 * newhourlydata[i].distance;})
      .attr("fill", "pink");
});
