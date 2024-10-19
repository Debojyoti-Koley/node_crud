const express = require('express')
const router = express.Router();
const Person = require('../models/person');
const { jwtAuthMiddleware,generateToken } = require('../jwt');

router.post('/signup', async (req,res)=>{
    try{
     const data = req.body
     console.log("data", data)
     const newPerson = new Person(data);
     const savedData = await newPerson.save()
     console.log('data saved successfully')
     const payload = {
        id: savedData.id,
        username: savedData.username
     }
     const token = generateToken(payload)
     console.log("token", token)
     res.status(200).json({res: savedData, token: token})
    }
    catch(err){
     console.log(err)
     res.status(500).json({error: 'error'})
    }
 })
 //log in Routes
 router.post('/login',async(req,res)=>{
    try{
        //extract username and password from request
        const {username,password} = req.body;
        //find the user form username
        const user = await Person.findOne({username:username})

        //if user does not exists or password mismatches, return null
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:"Invalid username or password"})
        }
        
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload)

        res.json({token})
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
 })
 router.get('/',jwtAuthMiddleware, async (req,res)=>{
     try{
         const data = await Person.find()
         console.log('data fetched')
         res.status(200).json(data)
     }
     catch(err){
         console.log(err)
         res.status(500).json({error: 'error'})
     }
 })
 //Profile Route
 router.get('/profile',jwtAuthMiddleware,async (req,res)=>{
    try{
        const userData = req.user
        const userId = userData.id
        const user = await Person.findById(userId);

        res.status(200).json({user})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
 })
 router.get('/:city', async (req,res)=>{
     try{
        const city = req.params.city
        const response = await Person.find({city: city})
        console.log("city:",response)
        res.status(200).json(response)
     }
     catch(err){
        console.log(err)
        res.status(500).json({error: 'error'})
     }
 })

 router.put('/:id',async (req,res)=>{
    try{
        const personId = req.params.id
        const personData = req.body;
        const response = await Person.findByIdAndUpdate(personId,personData,{
            new: true,
            runValidators: true,
        })
        console.log('data updated')
        res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'error'})
    }
 })

 router.delete('/:id',async (req,res)=>{
    try{
        const personId = req.params.id
        const response = await Person.findByIdAndDelete(personId)
        console.log('data deleted')
        res.status(200).json({message:'data deleted successfully'})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'error'})
    }
 })
 module.exports = router