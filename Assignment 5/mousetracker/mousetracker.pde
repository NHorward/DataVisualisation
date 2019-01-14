// Data visualisation - Nicole Horward
// Global mouse tracker, Processing forum, https://forum.processing.org/one/topic/global-mouse.html Date of reference: 13th of January 2019.
// Changing colour of shapes over time, Processing forum, https://forum.processing.org/two/discussion/25166/changing-colour-of-shapes-over-time Date of reference: 14th of January 2019.

// Import libraries
import java.awt.MouseInfo;
import java.awt.Point;

// Global variables
int pmouseX;
int pmouseY;
int startmouseX = 0;
int startmouseY = 0;

float size = 0.01;
float hue;

String filename;

Point mouse;

// Setup
void setup(){
  colorMode(HSB);
  // Size of the window 
  size(1920, 1080);

  // Background colour white
  background(255);
  
  // Hue 
  hue = 1;
  
}

// Draw
void draw() {
  
  // Get the location of the mouse, even when the Processing window isn't selected
  mouse = MouseInfo.getPointerInfo().getLocation();
  //println( "X= " + mouse.x + " "  +pmouseX + " Y=" + mouse.y + " "  + pmouseY );
  
  // If the mouse hasn't moved, current mouse position is the same as the previous mouse position
  if(pmouseX == mouse.x && pmouseY == mouse.y){
    // Set the colour and stroke
     stroke(hue, hue, hue, 20);
     strokeWeight(5);
     
     // Draw a line from the previous point where the mouse was stationary, to the current place
     line(startmouseX, startmouseY, mouse.x, mouse.y);
     
     // Remove stroke and set the fill colour
     noStroke();
     fill(hue, hue, hue, 20);
     
     // Draw a circle on the mouse point
     ellipse(mouse.x, mouse.y, size, size);
     // The longer the mouse is in the same position, the bigger the circle will get
     size += 0.01;
     
     // Reset the start mouse positions
     startmouseX = mouse.x;
     startmouseY = mouse.y;
    } 
  else{
    // If the mouse has been moved, reset the size of the circle
    size = 0.01;
    }
  
  // Set a random colour 
  hue = random(255);  
  
  // Reset the value of the previous mouse position to the current mouse position
  pmouseX = mouse.x;
  pmouseY = mouse.y;
  
}

// Get the current time and date 
// Return it as a String
String getCurrentTimeDate(){
  int second = second();
  int minute = minute();
  int hour = hour();
  int day = day();
  int month = month();
  int year = year();
  
  String dateTime = String.valueOf(year) + "-" + String.valueOf(month) + "-" +String.valueOf(day) + "-" +String.valueOf(hour) + "-" +String.valueOf(minute) + "-"  +String.valueOf(second);
  return dateTime;
  
}

// If a key has been pressed
void keyPressed(){
  
  // And the key pressed is ENTER
  // Save the current screen as an PNG image
  if(key == ENTER){
       
    // Set the filename to the current date and time
    filename = (getCurrentTimeDate() + ".png");
    
    // Save image
    save(filename);
    print("Saved image " + filename);
  
  }
}