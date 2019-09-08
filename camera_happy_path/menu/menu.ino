#include <Wire.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define SCREEN_ADDRESS 0x3C
#define OLED_RESET -1
#define BUTTON_UP 2
#define BUTTON_DOWN 3
#define BUTTON_LEFT 4
#define BUTTON_RIGHT 5
#define BUTTON_SELECT 6
#define BUTTON_SHOOT 7

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
int selectedMenuItem = 0;
int previousSelectedMenuItem = 0;

char *menuItems[] = {
    "Brightness",
    "Saturation",
    "White Bal.",
    "Contrast"
};

int menuItemValues[] = {
  0,
  0,
  0,
  0
};

int lastMenuIndex = 3;

void setup()
{
    Serial.begin(9600);
    pinMode(BUTTON_UP, INPUT);
    pinMode(BUTTON_DOWN, INPUT);
    pinMode(BUTTON_LEFT, INPUT);
    pinMode(BUTTON_RIGHT, INPUT);
    pinMode(BUTTON_SELECT, INPUT);
    pinMode(BUTTON_SHOOT, INPUT);

    if (!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS))
    {
        Serial.println(F("Unable to connect to screen."));
        while (true)
        {
        }
    }
    display.setTextSize(2);
    display.setTextColor(WHITE);
    display.clearDisplay();
}

void loop()
{
    int buttonUpState = digitalRead(BUTTON_UP);
    int buttonDownState = digitalRead(BUTTON_DOWN);
    int buttonLeftState = digitalRead(BUTTON_LEFT);
    int buttonRightState = digitalRead(BUTTON_RIGHT);
    previousSelectedMenuItem = selectedMenuItem;

    if (buttonUpState == LOW)
    {
        if(selectedMenuItem < lastMenuIndex){
            selectedMenuItem++;
        } else {
            selectedMenuItem = 0;
        }
    }

    if (buttonDownState == LOW)
    {
        if(selectedMenuItem > 0){
            selectedMenuItem--;
        } else {
            selectedMenuItem = lastMenuIndex;
        }
    }

    if (buttonLeftState == LOW)
    {
        menuItemValues[selectedMenuItem] -= 1;
    }

    if (buttonRightState == LOW)
    {
        menuItemValues[selectedMenuItem] += 1;
    }


    display.clearDisplay();

    display.setCursor(0, 0);
    display.println(menuItems[selectedMenuItem]);
    display.setCursor(0, 15);
    display.println(menuItemValues[selectedMenuItem]);

    display.display();
    delay(50);
    
}
