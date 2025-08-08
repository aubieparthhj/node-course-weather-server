const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://geocode.maps.co/search?q=' + address + '&api_key=687e418636cba690321907jxqd32450'
    request({ url: url, json: true }, (error, response) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if(response.body.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body[0].lat, 
                longitude: response.body[0].lon,    
                location: response.body[0].display_name
            })
        }
    })
}

module.exports = geocode