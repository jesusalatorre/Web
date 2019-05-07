const request = require("request");
const credentials = require("./credentials.js");
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`Enter a city name to know its weather: \n`, (input) => {
  coordenadasCB(`${input}`, function( err, response){
    if(err){
      console.log(err)
    }
    else{
      getWeatherCB(response, function(error, resp){
        if(error){
          console.log(error)
        }
        else{
        console.log(resp)
      }
      })
    }
  })
  readline.close()
})

function coordenadasCB(ciudad, callback){
  request.get({ url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ciudad}.json?access_token=${credentials.MAPBOX_TOKEN}`,
    json: true }, (error, response, data) => {
      if(!response){
        callback("MapBox - Error: No response.", "")
      }
      else if(response.statusCode!="200"){
        callback(`MapBox - Error ${response.statusCode}: ${response.statusMessage}`, "")
      }
      else if(typeof data.features !== 'undefined' && data.features.length){
        let longitude = data.features[0].center[0];
        let latitude = data.features[0].center[1];
        var result = [longitude, latitude, ciudad];
        callback("", result)
    }
    else{
      if(typeof data.features == 'undefined' || !data.features.length){
        callback("MapBox - Error: The specified place was not found.", "")
      }
      else if(error){
        callback(error, "")
      }
    }
    });
}

function getWeatherCB(coordenadas, callback){
  request.get({ url: `https://api.darksky.net/forecast/${credentials.DARK_SKY_SECRET_KEY}/${coordenadas[1]},${coordenadas[0]}/?lang=en&units=si`,
  json: true }, (error, response, data) => {
    if(!response){
      callback("DarkSky - Error: No response.", "")
    }
    else if(response.statusCode!="200"){
      callback(`Darksky - Error ${response.statusCode}: ${response.statusMessage}`, "")
    }
      else if(!error){
        callback("", `\n---------------------\nIt is currently ${data.currently.temperature}°C outside in ${coordenadas[2]}.\n${data.hourly.summary}\nChance of rain is ${data.daily.data[0].precipProbability * 100.0}%.\n---------------------`)
      }
    else{
      callback(`${data.error}`, "")
    }
  });
}
