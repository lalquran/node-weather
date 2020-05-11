const request = require('request')
const geocode = require('./geocode')
const keys = require('../constants/keys')

const getForecast = (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'You must provide a location'
        })
    }

    const city = req.query.location
    
    geocode.geocode(city, (error, { longitude, latitude, location } = {}) => {
        if (!city) {
            return res.send({
                error: 'No city provided'
            })
        }
    
        if (error) {
            return res.send({
                error
            })
        }
    
        getWeather(longitude, latitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                })
            }

            forecast = 'It is currently ' + forecast.temperature + ' degrees fahrenheit in ' +
            location + '. There is ' + forecast.rain + ' chance of rain.'
    
            res.send ({
                location,
                forecast
            })
        })
    })
}

const getWeather = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + keys.WEATHER_API +'&query=' + lat + ',' +
        long + '&units=f'

    request({url, json: true}, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service', undefined)
            return
        }

        if (body.error) {
            callback('Unable to find location', undefined)
            return
        }
    
        const current = body.current
        const location = body.location.region
        const data = {
            temperature: current.temperature,
            rain: current.precip,
            location
        }

        callback(undefined, data)
    })
}

module.exports = {
    getWeather,
    getForecast
}