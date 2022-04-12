import axios from 'axios';

const dontDoThis = () => {
    return `ce062de4922aa43abdd213142c4ee87a`

}

const availableCities: Record<string, { lat: number, lon: number }> = {
    home: {
        lat: 42.360081,
        lon: -71.058884
    }
}

const getWeather = async (city) => {
    let response: string
    const apiKey = dontDoThis()

    if (city in availableCities) {
        const { lat, lon } = availableCities[city]
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        const apiResponse = await axios.get(URL)
        const currentWeather = (apiResponse.data.weather.map(({ description }) => description).join(', '))
        response = `Outside it's ${currentWeather}. Stay inside!`
    } else {
        response = `Why would you need the weather in ${city}?`
    }
    return response
}

export {
    getWeather
}