// Assignment 2 - Harold the Hamster
//Sources:
// Lynda D3 JS Essential Training for Data Scientists https://www.lynda.com/D3-js-tutorials/D3-js-Essential-Training-Data-Scientists/504428-2.html

// Parse date
var parseDate = d3.timeParse("%Y-%m-%d");
var parseDateTime = d3.timeParse("%Y-%m-%d %H:%M:%S");
// Append SVG element to the HTML body
var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

d3.json("https://api.thingspeak.com/channels/345243/fields/2.json?start=2017-11-11%2001:00:10&end=2018-01-01%2000:00:11&sum=60", function(hourlydata) {
    //console.log("hourly");

    // Parse the data
    hourlydata.feeds.forEach(function(d){
      // Turn the date into the hour (00-23)
      d.date = parseDateTime(d.created_at.replace("T", " ").replace("Z", ""));
      console.log(d.date.getDay());
      d.day = d.date.getDay();
      d.hour = d.date.getHours();

      // Turn the distance string into a number
      d.distance = Number(d.field2);
    });

      //console.log(hourlydata);

    var newhourlydata = d3.nest()
      //.key(function(d) { return d.hour;})
      .key(function(d) { return d.day;})
      // Summarise the distance data per hour
      .rollup(function(d) { return d3.sum(d, function(d) { return d.distance; }); })
      .entries(hourlydata.feeds);

    //console.log(newhourlydata);

    newhourlydata.forEach(function(d){
      // Turn the date into the hour (00-23)
      d.day = Number(d.key);

      d.distance = Number(d.value);
    });

//console.log(newhourlydata);

// Start of a bart chart to show the total distance day of the week
// Nice to see which hours Harold is most active and when he's asleep
  svg.selectAll("rect chart1")
    .attr("class","chart1")
    .data(newhourlydata)
    .enter().append("rect")
      .attr("height",  function(d, i){ return 50 * newhourlydata[i].distance;})
      .attr("width", "50")
    // d = datapoint, i = index
      .attr("x", function(d, i){return 50 + 60 * i;})
      .attr("y", function(d, i){return 300 - 50 * newhourlydata[i].distance;})
      .attr("fill", "pink");

});

d3.json("https://api.thingspeak.com/channels/345243/fields/2.json?start=2017-11-11%2001:00:10&end=2018-01-01%2000:00:11&sum=60", function(hourlydata) {
    //console.log("hourly");

    // Parse the data
    hourlydata.feeds.forEach(function(d){
      // Turn the date into the hour (00-23)
      d.date = parseDateTime(d.created_at.replace("T", " ").replace("Z", ""));
      console.log(d.date.getDay());
      d.day = d.date.getDay();
      d.hour = d.date.getHours();

      // Turn the distance string into a number
      d.distance = Number(d.field2);
    });

    //  console.log(hourlydata);

    var newhourlydata = d3.nest()
      .key(function(d) { return d.hour;})
      //.key(function(d) { return d.day;})
      // Summarise the distance data per hour
      .rollup(function(d) { return d3.sum(d, function(d) { return d.distance; }); })
      .entries(hourlydata.feeds);

    console.log(newhourlydata);

    newhourlydata.forEach(function(d){
      // Turn the date into the hour (00-23)
      d.day = Number(d.key);

      d.distance = Number(d.value);
    });

//console.log(newhourlydata);

// var min = d3.min(newhourlydata, function(d){return d.distance});
// var max = d3.max(newhourlydata, function(d){return d.distance});



// Start of a bart chart to show the total distance day of the week
// Nice to see which hours Harold is most active and when he's asleep
  svg.selectAll("rect chart2")
    .attr("class","chart2")
    .data(newhourlydata)
    .enter().append("rect")
      .attr("height",  function(d, i){ return 100 * newhourlydata[i].distance;})
      .attr("width", "50")
    // d = datapoint, i = index
      .attr("x", function(d, i){return 50 + 60 * i;})
      .attr("y", function(d, i){return 800 - 100 * newhourlydata[i].distance;})
      .attr("fill", d3.interpolateRainbow(0.5));



});
