const express = require('express')
const app = express()
const db = require('./db')
const Person = require('./models/person')
require('dotenv').config()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})

//import router files
const personRouters = require('./Routes/personRouter')
//use person files
app.use('/person',personRouters)
const PORT = process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log("Listing on 3000")
})