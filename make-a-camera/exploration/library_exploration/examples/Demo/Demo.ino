#include <Camera.h>

Camera camera();

void setup()
{
}

void loop()
{
  if(camera.shutterIsPressed == true){
  camera.capture()
  }
}