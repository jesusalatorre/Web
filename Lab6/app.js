const express = require('express')
const lab5 = require('./lab5.js')

const app = express()

app.get('/weather', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  if(!req.query.search){
    return res.send({
      error: 'Please specify a city. The format is http://localhost:3000/weather?search=CITYNAME'
    })
  }
  lab5.coordenadasCB(req.query.search, function(error, response){
    if(error){
      return res.send({
        error: error
      })
    }
    const resultado_ciudad = response
    lab5.getWeatherCB(resultado_ciudad, function(error, response){
      if(error){
        return res.send({
          error: error
        })
      }
      return res.send(response)
    })
  })
})

app.listen('3000', function(){
  console.log('Listening on port 3000...')
})
