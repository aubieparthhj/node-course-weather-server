const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2a152f8ffdfa546db0d156d086303200&query=' + latitude + ',' + longitude + '&units=m'
    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined, {
                temperature: body.current.temperature,
                precip: body.current.precip,
                humidity: body.current.humidity,
                weather_descriptions: body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast