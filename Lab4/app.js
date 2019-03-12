const request = require("request");
const credentials = require("./credentials.js");

let coordenadas = ciudad => {
  request.get({ url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ciudad}.json?access_token=${credentials.MAPBOX_TOKEN}`,
    json: true }, (error, response, data) => {
    let longitude = data.features[0].center[0];
    let latitude = data.features[0].center[1];
    getWeather(latitude, longitude, ciudad);
  });
};

  let getWeather = (latitude, longitude, ciudad) => {
  request.get({ url: `https://api.darksky.net/forecast/${credentials.DARK_SKY_SECRET_KEY}/${latitude},${longitude}/?lang=en&units=si`,
    json: true }, (error, response, data) => {
    console.log(`\n---------------------\nIt is currently ${data.currently.temperature}°C outside in ${ciudad}.\n${data.hourly.summary}\nChance of rain is ${data.currently.precipProbability * 100}%.\n---------------------`);
  });
};

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`Enter a city name to know its weather: \n`, (input) => {
  coordenadas(`${input}`);
  readline.close()
})
