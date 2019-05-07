const mongoose = require('mongoose')

const connectionURL = 'mongodb+srv://jesus_alatorre:chocolate@cluster0-bo0at.mongodb.net/test?retryWrites=true'

mongoose.connect( connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true
})
