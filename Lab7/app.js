const express = require('express');

require("./db/mongoose");
const Person = require('./models/Person')

const app = express();

const port = process.env.PORT || 3000

app.use(express.json())

//POST
app.post('/persons', function(req, res){
  const person = new Person(req.body)
  person.save().then(function(){
    return res.send(person)
  }).catch(function(error){
    return res.status(500).send(error)
})
})

//GET
//https://mongoosejs.com/docs/api.html#model_Model.find
app.get('/persons', function(req, res){
  Person.find({}).then(function(person){
    if(!person){
      return res.status(404).send()
    }
    else{
    return res.send(person)
    }
  }).catch(function(error){
    return res.status(500).send(error)
})
})

app.get('persons/:id', function(req, res){
  const id = req.params.id
  Person.findById(id).then(function(person){
    if(!person){
      return res.status(404).send()
    }
    else{
    return res.send(person)
    }
  }).catch(function(error){
    return res.status(500).send(error)
})
})

//PATCH
app.patch('/persons/:id', function(req, res){
  const id = req.params.id
  Person.findByIdAndUpdate(id, req.body).then(function(person){
    if(!person){
      return res.status(404).send()
    }
    else{
      return res.send(person)
    }
  }).catch(function(error){
    return res.status(500).send(error)
  })
})

app.delete('/persons/:id', function(req, res){
  const id = req.params.id
  Person.findByIdAndDelete(id, req.body).then(function(person){
    if(!person){
      return res.status(404).send()
    }
    else{
      return res.send(person)
    }
  }).catch(function(error){
    return res.status(500).send(error)
})
})

app.listen(port, function(){
  console.log('Corriendo en puerto ' + port)
})
