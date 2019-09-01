#define BUTTON_UP 2
#define BUTTON_DOWN 3
#define BUTTON_LEFT 4
#define BUTTON_RIGHT 5
#define BUTTON_SELECT 6
#define BUTTON_SHOOT 7

void setup()
{
    Serial.begin(9600);
    Serial.println("Testing Buttons...");
}

void loop()
{
    int buttonUpState = digitalRead(BUTTON_UP);
    int buttonLeftState = digitalRead(BUTTON_LEFT);
    int buttonRightState = digitalRead(BUTTON_RIGHT);
    int buttonDownState = digitalRead(BUTTON_DOWN);
    int buttonSelectState = digitalRead(BUTTON_SELECT);
    int buttonShootState = digitalRead(BUTTON_SHOOT);

    if (buttonUpState == LOW)
    {
        Serial.println("up");
    }
    if (buttonLeftState == LOW)
    {
        Serial.println("left");
    }
    if (buttonRightState == LOW)
    {
        Serial.println("right");
    }
    if (buttonDownState == LOW)
    {
        Serial.println("down");
    }
    if (buttonSelectState == LOW)
    {
        Serial.println("select");
    }
    if (buttonShootState == LOW)
    {
        Serial.println("shoot");
    }
    delay(50); // Don't excessiely println if button is held down.
}