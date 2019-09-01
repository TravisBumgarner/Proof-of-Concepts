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

    if (!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS))
    {
        Serial.println(F("Unable to connect to screen."));
        while (true)
        {
        }
    }
    display.clearDisplay();
}

void loop()
{
    testdrawchar();
}

void testdrawchar(void)
{
    display.clearDisplay();

    display.setTextSize(2);
    display.setTextColor(WHITE);
    display.setCursor(0, 0);
    display.cp437(true);

    for (int16_t i = 0; i < 256; i++)
    {
        if (i == '\n')
            display.write(' ');
        else
            display.write(i);
    }

    display.display();
    delay(2000);
}