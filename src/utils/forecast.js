const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/0fc57431f59ed6837203834a64e969db/' + latitude + ',' + longitude + '?lang=es'
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback('Unable to find the location. Try another location')
        } else {
            callback(undefined, body.daily.data[0].summary + ' Its currently ' + body.currently.temperature + ' degrees out. There is a ' +
                body.currently.precipProbability + '% chance of rain. The velocity speeds are of ' + body.currently.windSpeed + ' km/h')
        }
    })
}

module.exports = forecast