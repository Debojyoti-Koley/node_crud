const express = require('express')
const app = express()
const db = require('./db')
const Person = require('./models/person')
require('dotenv').config()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const passport = require('passport')
const localStrategy = require('passport-local').Strategy

// Middleware function
const logRequest = (req,res,next) =>{
  console.log(`[${new Date().toLocaleString}] Request made to ${req.originalUrl}`);
  next()
} 

app.use(logRequest)

app.use(passport.initialize())

passport.use(new localStrategy(async (entered_username, entered_password, done)=>{
  // authentication logic
  try{
    const user =  await Person.findOne({username: entered_username})
    if(!user){
      return done(null, false, {message: 'incorrect username'})
    }
    const isPasswordMatch = await user.comparePassword(entered_password);
    if(isPasswordMatch){
      return done(null, user)
    }
    else{
      return done(null, false, {message: "incorrect password"})
    }
  }catch(err){
    return done(err);
  }
}))

const localAuthMiddleware = passport.authenticate('local',{session:false})

app.get('/',localAuthMiddleware, function (req, res) {
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