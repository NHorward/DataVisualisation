// Assignment 2 - Harold the Hamster
//Sources:
// Lynda D3 JS Essential Training for Data Scientists https://www.lynda.com/D3-js-tutorials/D3-js-Essential-Training-Data-Scientists/504428-2.html
// https://jeffreyeverhart.com/2016/03/12/heat-map-d3/

// Parse date
var parseDate = d3.timeParse("%Y-%m-%d");
var parseDateTime = d3.timeParse("%Y-%m-%d %H:%M:%S");
// Append SVG element to the HTML body
var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

var data =[];

d3.csv("HaroldData2018.csv", function(hourlydata) {
    console.log("hourly");
    console.log(hourlydata);

    // Parse the data
    hourlydata.forEach(function(d){
      if(d.created_at == null){
        d.created_at = "2017-10-20 16:44:25 UTC";
      }
      // Turn the date into the hour (00-23)
      //console.log(d.created_at.slice(0, -4));
      d.created_at = parseDateTime(d.created_at.slice(0, -4));
      //console.log(d.created_at.getDay());
      //d.day = d.date.getDay();
      //d.hour = d.date.getHours();

      // Turn the distance string into a number
      d.field2 = Number(d.field2);
    });

      //console.log(hourlydata);

    var newhourlydata = d3.nest()
      .key(function(d) { return d.created_at.getDay();})
      .sortKeys(d3.ascending)
      .key(function(d) { return d.created_at.getHours();})

      // Summarise the distance data per hour
      .rollup(function(v) { return d3.sum(v, function(d) { return d.field2; }); })
      .entries(hourlydata);

    console.log(newhourlydata);

    newhourlydata.forEach(function(d){
      // Turn the date into the hour (00-23)
      d.day = Number(d.key);

      d.values.forEach(function(h){
        h.day = d.day;
        h.hour = Number(h.key);
        data.push(h);
      });

    });

      console.log(newhourlydata);

      console.log(data);

var colorDomain = d3.extent(data, function(d){
            return d.value;
          });

var colorScale = d3.scaleLinear()
            .domain(colorDomain)
            .range(["lightblue","blue"]);


  var rectangles = svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect");

    rectangles
    .attr("x", function(d, i){
      return d.hour * 50;
    })
    .attr("y", function(d){
      return d.day * 50;
    })
    .attr("width", 50)
    .attr("height", 50).
    style("fill", function(d){
      return colorScale(d.value);
    });

//console.log(newhourlydata);

// Start of a bart chart to show the total distance day of the week
// Nice to see which hours Harold is most active and when he's asleep
  // svg.selectAll("rect chart1")
  //   .attr("class","chart1")
  //   .data(newhourlydata)
  //   .enter().append("rect")
  //     .attr("height",  function(d, i){ return 50 * newhourlydata[i].distance;})
  //     .attr("width", "50")
  //   // d = datapoint, i = index
  //     .attr("x", function(d, i){return 50 + 60 * i;})
  //     .attr("y", function(d, i){return 300 - 50 * newhourlydata[i].distance;})
  //     .attr("fill", "pink");

});
