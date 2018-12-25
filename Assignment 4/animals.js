// Icons
// https://www.behance.net/gallery/64609807/Animal-Icon-Set-for-Adobe-XD?scid=social76163047&adbid=1824036584306333&adbpl=fb&adbpr=341657335877606

// Data
//House mouse, Wikipedia, https://en.wikipedia.org/wiki/House_mouse Date of Reference: 25th of December 2018.
// https://en.wikipedia.org/wiki/Common_vampire_bat
// https://en.wikipedia.org/wiki/Cat
// https://en.wikipedia.org/wiki/Red_kangaroo
// https://en.wikipedia.org/wiki/Koala
// https://en.wikipedia.org/wiki/Emperor_penguin
// https://en.wikipedia.org/wiki/Kakapo
// https://en.wikipedia.org/wiki/Toco_toucan

// https://www.yourpurebredpuppy.com/dogbreeds/index-medium-dog-breeds.html
// Are all the ants as heavy as all the humans? BBC News Magazine, https://www.bbc.com/news/magazine-29281253
// http://www.turkanabasin.org/2012/01/of-goats-and-grasshoppers/
// How much do butterflies weigh? The Children's Butterfly Site, https://www.kidsbutterfly.org/faq/general/11

d3.json("animals.json", function(data){
  console.log(data);
  console.log(data[0]);
});

var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

var butterfly = 60;
var imgs = svg.selectAll("image").data([0]);

for(var i = 0; i < butterfly; i++){
  imgs.enter().append("svg:image")
    .attr("xlink:href","Butterfly.svg")
    .attr("x", i * 11)
    .attr("y", 0)
    .attr("width", 10)
    .attr("height", 10);
}

// .attr({
//   'xlink:href': 'Butterfly.svg',  // can also add svg file here
//   x: 0,
//   y: 0,
//   width: 128,
//   height: 128
// });
