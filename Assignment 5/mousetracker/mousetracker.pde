// Global mouse tracker, Processing forum, https://forum.processing.org/one/topic/global-mouse.html Date of reference: 13th of January 2019.

import java.awt.MouseInfo;
import java.awt.Point;

int pmouseX;
int pmouseY;
float size = 0.1;

Point mouse;

void setup(){
  size(1920, 1080);
  stroke(204, 102, 0);
  fill(0);

}

void draw() {
  
  mouse = MouseInfo.getPointerInfo().getLocation();
  println( "X= " + mouse.x + " "  +pmouseX + " Y=" + mouse.y + " "  + pmouseY );
  line(pmouseX, pmouseY, mouse.x, mouse.y);
  
  //if(mousePressed == true){
  //  ellipse(mouse.x, mouse.y, 10, 10);
  //}
  
  
  
  if(pmouseX == mouse.x && pmouseY == mouse.y){
     ellipse(mouse.x, mouse.y, size, size);
     size += 0.1;
    } 
  else{
    size = 0.1;
    }
  
  pmouseX = mouse.x;
  pmouseY = mouse.y;
}

//void mouseClicked(){
//  mouse = MouseInfo.getPointerInfo().getLocation();
//  ellipse(mouse.x, mouse.y, 10, 10);
//}