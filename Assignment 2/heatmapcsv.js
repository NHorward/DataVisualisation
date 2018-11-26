// Assignment 2 - Harold the Hamster
// Nicole Horward 2018
//Sources:
// Lynda D3 JS Essential Training for Data Scientists https://www.lynda.com/D3-js-tutorials/D3-js-Essential-Training-Data-Scientists/504428-2.html Date of reference: 26th of November 2018
// Building a simple heat map with D3, Jeffrey Everhart via  https://jeffreyeverhart.com/2016/03/12/heat-map-d3/ Date of reference: 26th of November 2018
// Day/hour heatmap in v4, takayki via http://bl.ocks.org/ganezasan/dfe585847d65d0742ca7d0d1913d50e1 Date of reference: 26th of November 2018
// D3.js Tutorial: Building interactive bar chars with JavaScript, Mate Huszarik via https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/ Date of reference: 26th of November 2018
// Comfortaa, Google Fonts via https://fonts.google.com/specimen/Comfortaa?selection.family=Comfortaa Date of reference: 26th of November 2018

// Parse date
var parseDateTime = d3.timeParse("%Y-%m-%d %H:%M:%S");
// Append SVG element to the HTML body
var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

// Empty array to contain all the relevant data
var data =[];

// Variables for the labels above the heat map
// Days of the week
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Hours per day
var times = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

// Margins from the top and the left, in pixels, for the placement of the chart
var marginTop = 50;
var marginLeft = 50;

// Load in the CSV file with all the running data collected via the IoT service Thingspeak
d3.csv("HaroldData2018.csv", function(hourlydata) {
   // Log the data to the console to check
   //console.log(hourlydata);

  // Parse the raw data
  hourlydata.forEach(function(d){
    // Turn the date into the hour (00-23), slice the original string first to remove the code "UTC"
    d.created_at = parseDateTime(d.created_at.slice(0, -4));
    // Turn the distance string into a number
    d.field2 = Number(d.field2);
  });

  //console.log(hourlydata);

  // Nest the data per day of the week, and then per hour of the day
  // Creating a total distance
  // Sort the days in ascending order
  var newhourlydata = d3.nest()
      .key(function(d) { return d.created_at.getDay();})
      .sortKeys(d3.ascending)
      .key(function(d) { return d.created_at.getHours();})
      // Summarise the distance data per day and per hour
      .rollup(function(v) { return d3.sum(v, function(d) { return d.field2; }); })
      .entries(hourlydata);

  // console.log(newhourlydata);

  // Loop over the nested hourly data
  // Push the relevant data to the empty data array for easy visualisation later
  newhourlydata.forEach(function(d){
      // The key of the nesting is the day of the week (0-6)
      d.day = Number(d.key);

      // For each of the 24 hour values per day
      d.values.forEach(function(h){
        // Get the weekday
        h.day = d.day;
        // Get the hour of the day
        h.hour = Number(h.key);
        // Push this data to the empty data array
        // Creates an array of
        data.push(h);
      });

    });

  // console.log(data);

  // Set the colors to match with the value of the data
  // Source: Building a simple heat map with D3, Jeffrey Everhart via  https://jeffreyeverhart.com/2016/03/12/heat-map-d3/ Date of reference: 26th of November 2018
  // Returns the minimum and maximum of all the available data
  var colorDomain = d3.extent(data, function(d){
    return d.value;
    });

  // Create a linear scale based on the color domain, the minimum and maximum values
  // Colors range from lightblue to blue
  // Source: Building a simple heat map with D3, Jeffrey Everhart via  https://jeffreyeverhart.com/2016/03/12/heat-map-d3/ Date of reference: 26th of November 2018
  var colorScale = d3.scaleLinear()
    .domain(colorDomain)
    .range(["lightblue","blue"]);

  // Create heatmap based on the data
  // Source: Building a simple heat map with D3, Jeffrey Everhart via  https://jeffreyeverhart.com/2016/03/12/heat-map-d3/ Date of reference: 26th of November 2018
  // Draw a rectangle per datapoint
  // X position based on the hour of the day
  // Y position based on the day of the week
  // Color as determined by the color scale set above
  var rectangles = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d, i){ return marginLeft + d.hour * 42;})
    .attr("y", function(d){ return marginTop +  d.day * 42;})
    .attr("width", 40)
    .attr("height", 40)
    .style("fill", function(d){ return colorScale(d.value); });

    // Make the heatmap interactive
    // Source: D3.js Tutorial: Building interactive bar chars with JavaScript, Mate Huszarik via https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/ Date of reference: 26th of November 2018
    // Add a mouse enter and mouse leave event to every rectangle
    rectangles
    // On mouse enter, change the opacity and show the value in the paragraph above
      .on("mouseenter", function(d, i) {
          d3.select(this).attr("opacity", 0.5);
          $("#distance").text("Total distance recorded: " + String(d.value.toFixed(2)) + " km");


      })
      // On mouse leave reset the opacity
      .on("mouseleave", function(d, i) {
          d3.select(this).attr("opacity", 1)
      });

      // Add the labels to the x and y axis
      // Source: Day/hour heatmap in v4, takayki via http://bl.ocks.org/ganezasan/dfe585847d65d0742ca7d0d1913d50e1 Date of reference: 26th of November 2018
      // Labels with the day of the week
      const dayLabels = svg.selectAll(".dayLabel")
             .data(days)
             .enter().append("text")
               .text(function (d) { return d; })
               .attr("x", 50)
               .attr("y", function(d, i){ return marginTop + i * 42;})
               .style("text-anchor", "end")
               .attr("transform", "translate(-6," + 42 / 1.5 + ")");

      // Add the labels to the x and y axis
      // Source: Day/hour heatmap in v4, takayki via http://bl.ocks.org/ganezasan/dfe585847d65d0742ca7d0d1913d50e1 Date of reference: 26th of November 2018
      // Labels with the hours of the day
      const timeLabels = svg.selectAll(".timeLabel")
             .data(times)
             .enter().append("text")
               .text(function (d) { return d; })
               .attr("x", function(d, i){return  marginLeft + i * 42;})
               .attr("y", 50)
               .style("text-anchor", "middle")
               .attr("transform", "translate(" + 42 / 2 + ", -6)");

});
