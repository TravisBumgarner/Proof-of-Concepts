#include <SPI.h>
#include <SD.h>

Sd2Card card;
SdVolume volume;
SdFile root;
File file;

const int BUTTON_UP_PIN = 15;
const int BUTTON_DOWN_PIN = 0;
const int SD_CS_PIN = 16;

int upButtonState = 0;
int previousUpButtonState = 0;
int downButtonState = 0;

void print(String text){
  Serial.print(text);
}

void println(String text){
  Serial.println(text);
}

void writeToSDCard(String fileName, String contents){
  file = SD.open(fileName, FILE_WRITE);
  if (file) {
    println("Writing to " + fileName);
    file.println(contents);
    file.close();
    println("done.");
  } else {
    // if the file didn't open, print an error:
    println("error opening test.txt");
  }
}

bool setupSDCard(){
  Serial.print("Initializing SD Card...");
  
  if(SD.begin(SD_CS_PIN)){
    println("initialization success!");
    return true;
  } else {
    println("initialization failed!");
    return false;
  }
}

void setupButtons(){ 
  pinMode(BUTTON_UP_PIN, INPUT);
  pinMode(BUTTON_DOWN_PIN, INPUT); 
}

void setup() {
  Serial.begin(9600);
  bool wasSDSetup = setupSDCard();
  setupButtons();
  
  if(!(wasSDSetup)){
    return;  
  }
  
}

void loop() {
  upButtonState = digitalRead(BUTTON_UP_PIN);
  if (upButtonState == HIGH && previousUpButtonState == LOW){
    println("Saving....");
    writeToSDCard("hello.txt", "Hello!");
  } 
  previousUpButtonState = upButtonState;
}
