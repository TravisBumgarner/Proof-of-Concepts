/******************************************************/
//       THIS IS A GENERATED FILE - DO NOT EDIT       //
/******************************************************/

#include "Particle.h"
#line 1 "/Users/travisbumgarner/Programming/proof-of-concepts/particle-react-and-express-counter/counter/src/counter.ino"
// SPDX-FileCopyrightText: 2011 Limor Fried/ladyada for Adafruit Industries
//
// SPDX-License-Identifier: MIT

// Thermistor Example #3 from the Adafruit Learning System guide on Thermistors
// https://learn.adafruit.com/thermistor/overview by Limor Fried, Adafruit Industries
// MIT License - please keep attribution and consider buying parts from Adafruit
void setup(void);
void loop(void);
#line 8 "/Users/travisbumgarner/Programming/proof-of-concepts/particle-react-and-express-counter/counter/src/counter.ino"
SerialLogHandler logHandler; // This allows for USB serial debug logs
SYSTEM_THREAD(ENABLED);      // Code Runs even with no connection

// which analog pin to connect
#define THERMISTORPIN A0
// resistance at 25 degrees C
#define THERMISTORNOMINAL 10000
// temp. for nominal resistance (almost always 25 C)
#define TEMPERATURENOMINAL 25
// how many samples to take and average, more takes longer
// but is more 'smooth'
#define NUMSAMPLES 5
// The beta coefficient of the thermistor (usually 3000-4000)
#define BCOEFFICIENT 3950
// the value of the 'other' resistor
#define SERIESRESISTOR 10000

int samples[NUMSAMPLES];

std::chrono::milliseconds publishPeriod = 30s; // Can use `min` and `h` as well.

unsigned long lastPublishMs;

void setup(void)
{
    // analogReference(EXTERNAL); Doesn't work.
}

void loop(void)
{
    if (millis() - lastPublishMs >= publishPeriod.count())
    {
        lastPublishMs = millis();

        uint8_t i;
        float average;

        // take N samples in a row, with a slight delay
        for (i = 0; i < NUMSAMPLES; i++)
        {
            samples[i] = analogRead(THERMISTORPIN);
            delay(10);
        }

        // average all the samples out
        average = 0;
        for (i = 0; i < NUMSAMPLES; i++)
        {
            average += samples[i];
        }
        average /= NUMSAMPLES;

        Log.info("Average analog reading ");
        Log.info("%2.f", average);

        // convert the value to resistance
        average = 1023 / average - 1;
        average = SERIESRESISTOR / average;
        Log.info("Thermistor resistance ");
        Log.info("%2.f", average);

        if (Particle.connected())
        {
            String eventData = String::format("%f", average);
            Particle.publish("temperatureEvent", eventData, PRIVATE);
        }
        else
        {
            Log.info("not cloud connected");
        }
    }
}
