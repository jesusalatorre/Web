const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type:String,
  },
  age:{
    type: String,
  },
  born:{
    type:String,
  },
  timeline:{
  type:String
  },
  alliegance: {
    type:Array
  },
  playedBy:{
    type:String
  },
  titles:{
    type:Array
  },
  father:{
    type:String
  },
  mother:{
    type:String
  },
  spouse: {
    type:String
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
