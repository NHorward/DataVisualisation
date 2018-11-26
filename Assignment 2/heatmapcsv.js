// Assignment 2 - Harold the Hamster
//Sources:
// Lynda D3 JS Essential Training for Data Scientists https://www.lynda.com/D3-js-tutorials/D3-js-Essential-Training-Data-Scientists/504428-2.html
// https://jeffreyeverhart.com/2016/03/12/heat-map-d3/
// http://bl.ocks.org/ganezasan/dfe585847d65d0742ca7d0d1913d50e1

// Parse date
var parseDate = d3.timeParse("%Y-%m-%d");
var parseDateTime = d3.timeParse("%Y-%m-%d %H:%M:%S");
// Append SVG element to the HTML body
var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

var data =[];
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var times = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

var marginTop = 50;
var marginLeft = 50;


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

      // console.log(newhourlydata);

      // console.log(data);

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
        return marginLeft + d.hour * 42;
      })
      .attr("y", function(d){
        return marginTop +  d.day * 42;
      })
      .attr("width", 40)
      .attr("height", 40)
      .style("fill", function(d){
        return colorScale(d.value);
      });

    rectangles
      .on("mouseenter", function(d, i) {
          d3.select(this).attr("opacity", 0.5);
          console.log(d.value);
          $("#distance").text("Total distance recorded: " + String(d.value.toFixed(2)) + " km");


      })
      .on("mouseleave", function(d, i) {
          d3.select(this).attr("opacity", 1)
      });

    const dayLabels = svg.selectAll(".dayLabel")
             .data(days)
             .enter().append("text")
               .text(function (d) { return d; })
               .attr("x", 50)
               .attr("y", function(d, i){ return marginTop + i * 42;})
               .style("text-anchor", "end")
               .attr("transform", "translate(-6," + 42 / 1.5 + ")");

         const timeLabels = svg.selectAll(".timeLabel")
             .data(times)
             .enter().append("text")
               .text((d) => d)
               .attr("x", function(d, i){return  marginLeft + i * 42;})
               .attr("y", 50)
               .style("text-anchor", "middle")
               .attr("transform", "translate(" + 42 / 2 + ", -6)");


});
