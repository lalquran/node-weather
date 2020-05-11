const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + process.env.GEOCODE_API 

    request({url, json: true}, (err, { body } = {}) => {
        if (err) {
            callback('Unable to connect to location services', undefined)
            return
        }

        if (body.features.length === 0) {
            callback('Unable to find location', undefined)
            return
        }

        const location = body.features[0]
        const longitude = location.center[0]
        const latitude = location.center[1]

        callback(undefined, {
            latitude,
            longitude,
            location: location.text
        })
    })

}

module.exports = {
    geocode
}