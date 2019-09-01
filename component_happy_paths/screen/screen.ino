#include <Wire.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define SCREEN_ADDRESS 0x3C
#define OLED_RESET -1

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void setup()
{
    Serial.begin(9600);
    Serial.println("Testing Screen");

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
    testdrawchar();
}

void testdrawchar(void)
{
    display.clearDisplay();

    display.setCursor(0, 0);
    display.println(F("Greetings"));

    display.display();
    delay(2000);
}