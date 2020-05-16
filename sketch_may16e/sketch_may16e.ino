/* Arduino USB Keyboard HID demo
 * Volume+/Volume-/Mute keys
 */

uint8_t buf[8] = { 
  0 };   /* Keyboard report buffer */

#define NEXT_SETTING_PIN 4
#define PREVIOUS_SETTING_PIN 5
#define INCREASE_VALUE_PIN 6
#define DECREASE_VALUE_PIN 3

int state = 1;

void setup() 
{
  Serial.begin(9600);
  
  pinMode(NEXT_SETTING_PIN, INPUT);
  pinMode(PREVIOUS_SETTING_PIN, INPUT);
  pinMode(INCREASE_VALUE_PIN, INPUT);
  pinMode(DECREASE_VALUE_PIN, INPUT);

  digitalWrite(NEXT_SETTING_PIN, 1);
  digitalWrite(PREVIOUS_SETTING_PIN, 1);
  digitalWrite(INCREASE_VALUE_PIN, 1);
  digitalWrite(DECREASE_VALUE_PIN, 1);

  delay(200);
}

void loop() 
{
  state = digitalRead(PREVIOUS_SETTING_PIN);
  if (state == 1) {
    buf[2] = 54;   
    Serial.write(buf, 8); 
    releaseKey();
  } 

  state = digitalRead(NEXT_SETTING_PIN);
  if (state == 1) {
    buf[2] = 55;   
    Serial.write(buf, 8); 
    releaseKey();
  }

  state = digitalRead(INCREASE_VALUE_PIN);
  if (state == 1) {
    buf[2] = 46;   
    Serial.write(buf, 8); 
    releaseKey();
  } 

  state = digitalRead(DECREASE_VALUE_PIN);
  if (state == 1) {
    buf[2] = 45;   
    Serial.write(buf, 8); 
    releaseKey();
  } 
}

void releaseKey() 
{
  buf[0] = 0;
  buf[2] = 0;
  Serial.write(buf, 8); // Release key
  delay(250);
}
