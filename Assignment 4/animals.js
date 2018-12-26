// Icons
// https://www.behance.net/gallery/64609807/Animal-Icon-Set-for-Adobe-XD?scid=social76163047&adbid=1824036584306333&adbpl=fb&adbpr=341657335877606

// Data
//House mouse, Wikipedia, https://en.wikipedia.org/wiki/House_mouse Date of Reference: 25th of December 2018.
// https://en.wikipedia.org/wiki/Barn_owl
// https://en.wikipedia.org/wiki/Cat
// https://en.wikipedia.org/wiki/Atlantic_salmon
//https://en.wikipedia.org/wiki/Holland_Lop
//https://en.wikipedia.org/wiki/Booted_Bantam
// https://en.wikipedia.org/wiki/Black_mamba
// https://www.yourpurebredpuppy.com/dogbreeds/index-medium-dog-breeds.html
//https://en.wikipedia.org/wiki/Leatherback_sea_turtle
//https://en.wikipedia.org/wiki/Red_squirrel
// How much do butterflies weigh? The Children's Butterfly Site, https://www.kidsbutterfly.org/faq/general/11

var animalData;

d3.json("animals.json", function(data){
  console.log(data);
  animalData = data;
  setAnimalOptions();
  getAnimalWeights();
});

var svg = d3.select("body").append("svg").attr("height","500%").attr("width","100%");

var butterfly = 60;
var imgs = svg.selectAll("image").data([0]);

var butterflyweight;

function setAnimalOptions(){
  for(i in animalData){
    $("#animals").append("<option value="+animalData[i].name+">"+animalData[i].name +"</option>");
  }
}

function getAnimalWeights(){
  for(i in animalData){
    if(animalData[i].name == "butterflies"){
      butterflyweight = animalData[i].weight;
      console.log("butterfly");
      console.log(butterflyweight);
    }
  }
}

function getAnimalWeight(animal){
  for(i in animalData){
    if(animalData[i].name == animal){
      return animalData[i].weight;
    }
  }
}

var butterflies;
var selectedAnimal;

$("#submit").click(function(){
  d3.selectAll("svg > *").remove();
  console.log($("#weight").val());
  selectedAnimal = $("#animals").val();
  var human =  $("#weight").val();
  var weight = getAnimalWeight(selectedAnimal);
  amount = Math.round(human / weight);
  console.log(amount);
  drawAnimals(selectedAnimal, amount);
});


function drawAnimals(animal, amount){
  svg.append("text")
    .attr("x", 50)
    .attr("y", 20)
    .attr("font-family", "Comfortaa")
    .attr("font-size", "20px")
    .attr("fill", "black")
    .text(amount +" " + animal );

  var row = 0;

  for(var i = 0; i < amount; i++){
    imgs.enter().append("svg:image")
      .attr("xlink:href","images/"+animal+".svg")
      .attr("x", 20 + (i%50 * 30))
      .attr("y", function(){if(i%50 == 0){row += 1;}; return 20 + (row * 30);})
      .attr("width", 25)
      .attr("height", 25)
      .attr("class", animal);
  }

}
