const request = require('postman-request')

const forecast = (lat, lng, callback) => {       
    const url = `http://api.weatherstack.com/current?access_key=92535cf4c02870fe5e9d488c2dc80797&query=${encodeURIComponent(lat)},${encodeURIComponent(lng)}&units=f`
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather serivce')
        } else if (body.error) {
            callback(body.error.info)
        } else {
            const description = body.current.weather_descriptions[0]
            // const currentTemp = response.body.current.temperature
            // const feelsLike = response.body.current.feelslike

            const { temperature: currentTemp, feelslike: feelsLike } = body.current
            
            callback(undefined, `It's curently ${description}.  The outside temperature is ${currentTemp}°F with a real feel temp of ${feelsLike}°F`)    
        }
    })
}

module.exports = forecast