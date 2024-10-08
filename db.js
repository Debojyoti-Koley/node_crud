const mongoose = require('mongoose')
require('dotenv').config()
const mongoUrl = process.env.DB_URL


mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection

db.on('connected',()=>{
    console.log('connected to mongodb')
})
module.exports = db