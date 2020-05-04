//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')

const forecast = (place, callback) => {
    setTimeout(()=>{
        const url = 'http://api.weatherstack.com/current?access_key=a232f50bb0ed5c84dc70eafac61eff1a&query='  + place +'&units=m&lanuage=cz'
        request({url, json: true}, function(error, response, body) {
            if (error) {
                callback('Unable to connect to the Weather Service', undefined)
            } else if (body.error) {
                console.log('success falied')
                callback('Wrong or missing parameter provided to the querry', undefined)
            } else {
                callback(undefined, {
                    location: body.location.name,
                    weatherDescription: body.current.weather_descriptions[0],
                    temperature: body.current.temperature,
                })
            }
        }
        )

    }, 2000
    )
}


module.exports = forecast