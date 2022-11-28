const request = require('request')

const weather = (adress, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=4e4a842d40f73f5944fe24f3cd98e828&query=" + adress
    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback(error, undefined)
        } else if ( body.error ) {
            callback(error, undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                windspeed: body.current.wind_speed
            })
        }
    })
    callback(url)
}

module.exports =  weather