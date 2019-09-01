#include <Wire.h>
#include <ArduCAM.h>
#include <SPI.h>
#include <SD.h>
#include "memorysaver.h"

#if !(defined(OV2640_MINI_2MP_PLUS))
#error Please select the hardware platform and camera module in the ../libraries/ArduCAM/memorysaver.h file
#endif

#define FRAMES_NUM 0x06
#define CAMERA_CS 9
#define SD_CS 10

bool is_header = false;

#if defined(OV2640_MINI_2MP_PLUS)
ArduCAM myCAM(OV2640, CAMERA_CS);
#endif
uint8_t read_fifo_burst(ArduCAM myCAM);
void setup()
{
    Serial.begin(9600);
    Serial.println("Testing Camera...");

    Wire.begin();

    pinMode(CAMERA_CS, OUTPUT);
    digitalWrite(CAMERA_CS, HIGH);

    SPI.begin();
    myCAM.write_reg(0x07, 0x80);
    delay(100);
    myCAM.write_reg(0x07, 0x00);
    delay(100);

    check_spi();
    check_camera_module();
    check_sd_card();

    take_photo();
}

void loop()
{
    // To continuously take photos, enable the next two lines;
    take_photo();
    delay(1000);
}

void check_spi()
{
    uint8_t temp;
    while (true)
    {
        myCAM.write_reg(ARDUCHIP_TEST1, 0x55);
        temp = myCAM.read_reg(ARDUCHIP_TEST1);
        if (temp != 0x55)
        {
            Serial.println(F("SPI interface Error!"));
            delay(1000);
            continue;
        }
        else
        {
            Serial.println(F("SPI interface OK."));
            break;
        }
    }
}

void check_camera_module()
{
    uint8_t vid, pid;

    while (true)
    {
        myCAM.wrSensorReg8_8(0xff, 0x01);
        myCAM.rdSensorReg8_8(OV2640_CHIPID_HIGH, &vid);
        myCAM.rdSensorReg8_8(OV2640_CHIPID_LOW, &pid);
        if ((vid != 0x26) && ((pid != 0x41) || (pid != 0x42)))
        {
            Serial.println(F("Cannot find camera."));
            delay(1000);
            continue;
        }
        else
        {
            Serial.println(F("Camera detected."));
            break;
        }
    }
}

void check_sd_card()
{
    while (!SD.begin(SD_CS))
    {
        Serial.println(F("SD Card Error!"));
        delay(1000);
    }
    Serial.println(F("SD Card detected."));

    myCAM.set_format(JPEG);
    myCAM.InitCAM();
    myCAM.clear_fifo_flag();
    myCAM.write_reg(ARDUCHIP_FRAMES, FRAMES_NUM);
}

void take_photo()
{
    myCAM.flush_fifo();
    myCAM.clear_fifo_flag();
    myCAM.OV2640_set_JPEG_size(OV2640_1600x1200);

    //Start capture
    myCAM.start_capture();
    Serial.print("Taking photo...");
    while (!myCAM.get_bit(ARDUCHIP_TRIG, CAP_DONE_MASK))
        ;
    Serial.println("done.");
}

uint8_t read_fifo_burst(ArduCAM myCAM)
{
    uint8_t temp = 0, temp_last = 0;
    uint32_t length = 0;
    static int i = 0;
    static int k = 0;
    char str[16];
    File outFile;
    byte buf[256];
    length = myCAM.read_fifo_length();
    Serial.print(F("The fifo length is :"));
    Serial.println(length, DEC);
    if (length >= MAX_FIFO_SIZE) //8M
    {
        Serial.println("Over size.");
        return 0;
    }
    if (length == 0) //0 kb
    {
        Serial.println(F("Size is 0."));
        return 0;
    }
    myCAM.CS_LOW();
    myCAM.set_fifo_burst(); //Set fifo burst mode
    i = 0;
    while (length--)
    {
        temp_last = temp;
        temp = SPI.transfer(0x00);
        //Read JPEG data from FIFO
        if ((temp == 0xD9) && (temp_last == 0xFF)) //If find the end ,break while,
        {
            buf[i++] = temp; //save the last  0XD9
            //Write the remain bytes in the buffer
            myCAM.CS_HIGH();
            outFile.write(buf, i);
            //Close the file
            outFile.close();
            Serial.println(F("OK"));
            is_header = false;
            myCAM.CS_LOW();
            myCAM.set_fifo_burst();
            i = 0;
        }
        if (is_header == true)
        {
            //Write image data to buffer if not full
            if (i < 256)
                buf[i++] = temp;
            else
            {
                //Write 256 bytes image data to file
                myCAM.CS_HIGH();
                outFile.write(buf, 256);
                i = 0;
                buf[i++] = temp;
                myCAM.CS_LOW();
                myCAM.set_fifo_burst();
            }
        }
        else if ((temp == 0xD8) & (temp_last == 0xFF))
        {
            is_header = true;
            myCAM.CS_HIGH();
            //Create a avi file
            k = k + 1;
            itoa(k, str, 10);
            strcat(str, ".jpg");
            //Open the new file
            outFile = SD.open(str, O_WRITE | O_CREAT | O_TRUNC);
            if (!outFile)
            {
                Serial.println(F("File open failed"));
                while (1)
                    ;
            }
            myCAM.CS_LOW();
            myCAM.set_fifo_burst();
            buf[i++] = temp_last;
            buf[i++] = temp;
        }
    }
    myCAM.CS_HIGH();
    return 1;
}
