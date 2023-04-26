// Code stolen from here:
// https://learn.adafruit.com/thermistor/using-a-thermistor
// because I couldn't figure out how to get `log` to work on Particle.

const THERMISTOR_NOMINAL = 10000
const TEMPERATURE_NOMINAL = 25
const NUM_SAMPLES = 5
const B_COEFFICIENT = 3950
const SERIES_RESISTOR = 10000

export const getCelcius = (average: number) => {
    // TODO - this is probably wrong but the average, from teh Particle is negative.
    let steinhart = Math.abs(average) / THERMISTOR_NOMINAL;          // (R/Ro)
    steinhart = Math.log(steinhart);                       // ln(R/Ro)
    steinhart /= B_COEFFICIENT;                        // 1/B * ln(R/Ro)
    steinhart += 1.0 / (TEMPERATURE_NOMINAL + 273.15); // + (1/To)
    steinhart = 1.0 / steinhart;                      // Invert
    steinhart -= 273.15;                              // convert absolute temp to C
    return steinhart
}


export const getFarenheit = (celsius: number) => celsius * 9 / 5 + 32

