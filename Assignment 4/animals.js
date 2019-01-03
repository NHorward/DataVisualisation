// Assignment 4 - Animal-O-Meter
// Nicole Horward 2018-2019
// Sources:
// Animal Icon Set for Adobe XD, Behance, via https://www.behance.net/gallery/64609807/Animal-Icon-Set-for-Adobe-XD?scid=social76163047&adbid=1824036584306333&adbpl=fb&adbpr=341657335877606 Date of Reference: 25th of December 2018.
// Bootstrap 4, W3 schools, via https://www.w3schools.com/bootstrap4/default.asp 3rd of January 2019
// Data sources:
// House mouse, Wikipedia, https://en.wikipedia.org/wiki/House_mouse Date of Reference: 25th of December 2018.
// Barn owl, Wikipedia, https://en.wikipedia.org/wiki/Barn_owl Date of Reference: 25th of December 2018.
// Cat, Wikipedia, https://en.wikipedia.org/wiki/Cat Date of Reference: 25th of December 2018.
// Holland Lop, Wikipedia, https://en.wikipedia.org/wiki/Holland_Lop Date of Reference: 25th of December 2018.
// Booted Bantam, Wikipedia, https://en.wikipedia.org/wiki/Booted_Bantam Date of Reference: 25th of December 2018.
// Black mamba, Wikipedia, https://en.wikipedia.org/wiki/Black_mamba Date of Reference: 25th of December 2018.
// Round sardinella, Wikipedia, https://en.wikipedia.org/wiki/Round_sardinella Date of Reference: 25th of December 2018.
// Leatherback sea turtle, Wikipedia, https://en.wikipedia.org/wiki/Leatherback_sea_turtle Date of Reference: 25th of December 2018.
// Red squirrel, Wikipedia, https://en.wikipedia.org/wiki/Red_squirrel Date of Reference: 25th of December 2018.
// Medium dog breeds, Your Pure Bred Puppy, https://www.yourpurebredpuppy.com/dogbreeds/index-medium-dog-breeds.html
// How much do butterflies weigh? The Children's Butterfly Site, https://www.kidsbutterfly.org/faq/general/11

var animalData;
var selectedAnimal;

// Get the json animal Data
// Name of the animal and weight in kg
d3.json("animals.json", function(data){
  //console.log(data);
  animalData = data;
  // Set the animal options in select menu
  setAnimalOptions();
});

// Add svg to the HTML body
var svg = d3.select("body").append("svg").attr("height","500%").attr("width","100%");

var imgs = svg.selectAll("image").data([0]);

// Add the animal names from the json file to the select menu
// To dynamically load the animal names
function setAnimalOptions(){
  for(i in animalData){
    $("#animals").append("<option value="+animalData[i].name+">"+animalData[i].name +"</option>");
  }
}

// Returns the weight of the animal from the JSON data, based on the name of the animal
function getAnimalWeight(animal){
  for(i in animalData){
    if(animalData[i].name == animal){
      return animalData[i].weight;
    }
  }
}

// If the submit button is pressed
$("#submit").click(function(){
  // Remove all the elements currently in the SVG element
  d3.selectAll("svg > *").remove();

  // Get the name of the selected animal from the select menu
  selectedAnimal = $("#animals").val();

  // Get the weight of the human from the text input field
  var human =  $("#weight").val();

  // Get the weight of the animal from the JSON data, based on the animal name
  var weight = getAnimalWeight(selectedAnimal);

  // Calculate the amount of animals that fit in the human, and round it off to a whole number
  var amount = Math.round(human / weight);
  // console.log(amount);

  // Draw the selected animal the correct amount of times
  drawAnimals(selectedAnimal, amount);
});

// Draw an animal a specific amount of times
function drawAnimals(animal, amount){
  // Show the amount and the name of the animal
  svg.append("text")
    .attr("x", 80)
    .attr("y", 20)
    .attr("font-family", "Comfortaa")
    .attr("font-size", "20px")
    .attr("fill", "black")
    .text(amount +" " + animal );

  var row = 0;

  // Draw the selected animal the specified amount of times
  for(var i = 0; i < amount; i++){
    imgs.enter().append("svg:image")
    // Get the right image to display, based on the animal name
      .attr("xlink:href","images/"+animal+".svg")
      // Draw the animals in rows of 20
      .attr("x", 80 + (i%20 * 30))
      .attr("y", function(){if(i%20 == 0){row += 1;}; return 20 + (row * 30);})
      .attr("width", 25)
      .attr("height", 25)
      .attr("class", animal);
  }

}
