const express = require('express');
const met = require('./met.js');

const app = express()

app.get(`/students/:id`, function(req, res){
    if(req.params.id == "A00819508"){
      return res.send({
        "id": "A00819508",
        "fullname": "Jesus Eugenio Alatorre Cantu",
        "nickname": "Yuy",
        "age": 23
      })
    }
    else{
      return res.send({
        "error": "Esa no es mi matricula! Intenta A00819508! :)"
      })
    }
})

app.get('/met', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  if(!req.query.search){
    return res.send({
      error: 'Error: Porfavor especifica qué buscar. El formato es http://localhost:3000/met?search=TU_OBJETO_DE_BUSQUEDA'
    })
  }
  met.metMatches(req.query.search, function(error, response){
    if(error){
      return res.send({
        error
      })
    }
    const resultado_met = response
    met.findObject(resultado_met, function(error, response){
      if(error){
        return res.send({
          error
        })
      }
      const final = {
        searchTerm: req.query.search,
        artist : response.artist,
        title: response.title,
        year: response.year,
        technique: response.technique,
        metUrl: response.metUrl
      }
      return res.send(final)
    })
  })
})

app.get('/*', function(req, res){
  return res.send({
    error: "Hola. La ruta que intentaste no está implementada en mi aplicación. Intenta rutas como mi /students/A00819508 o /met?search=sunflowers"
  })
})

var local = '3000';
app.listen(local, function(){
  console.log('Listening on port 3000...')
})
