#include <SPI.h>
#include <SD.h>

Sd2Card card;
SdVolume volume;
SdFile root;
File image;


const int SD_CHIP_SELECT = 16;

bool setupSDCard(){
  Serial.print("Initializing SD Card...");
  
  if(SD.begin(SD_CHIP_SELECT)){
    Serial.print("initialization success!\n");
    return true;
  } else {
    Serial.print("initialization failed!\n");
    return false;
  }
}



void setup() {
  Serial.begin(9600);
  bool wasSDSetup = setupSDCard();
  
  if(!(wasSDSetup)){
    return;  
  }
  image = SD.open("test.txt", FILE_WRITE);
  if (image) {
    Serial.print("Writing to test.txt...");
    image.println("testing 1, 2, 3.");
    // close the file:
    image.close();
    Serial.println("done.");
  } else {
    // if the file didn't open, print an error:
    Serial.println("error opening test.txt");
  }
}

void loop() {
  // put your main code here, to run repeatedly:

}
