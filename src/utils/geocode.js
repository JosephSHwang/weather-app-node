const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.geoapify.com/v1/geocode/search?text=` + encodeURIComponent(address) + `&apiKey=9b5d79763879463cb12f2a6e8d533640`
    // const url = `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Geocoding server')
        } else if (body.error || body.features.length === 0) {
            callback(body.message)
        } else {
            const { lat: latitude, lon: longitude, formatted: location} = body.features[0].properties
            callback(undefined, {
                latitude,
                longitude,
                location,

            })
        }
    })    
}


module.exports = geocode