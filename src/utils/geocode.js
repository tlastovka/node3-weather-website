const request = require('request')


const geocode = (address, callback) => {
  setTimeout(()=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGxhc3RvdmthIiwiYSI6ImNrOHg4Y2VjajA2dW4zbnM3Ym80c3J1Zm0ifQ.RR4m2nguFlfc9VINPqucJQ&limit=1'
        request({url, json: true}, function (error, response, body) {
      if (error) {
      callback('Unable to connect to the Weather Service', undefined)
      } else if (body.features.length == 0) {
      callback('Wrong or missing parameter provided to the querry', undefined)
      } else {
      callback(undefined, {
          longitude: body.features[0].center[0],
          latitude: body.features[0].center[1],
          location: body.features[0].place_name
      })
      }
    }
    )
  },2000)
}



module.exports = geocode