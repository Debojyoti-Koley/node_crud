const express = require('express')
const router = express.Router();
const Person = require('../models/person')

router.post('/', async (req,res)=>{
    try{
     const data = req.body
     console.log("data", data)
     const newPerson = new Person(data);
     const savedData = await newPerson.save()
     console.log('data saved successfully')
     res.status(200).json(savedData)
    }
    catch(err){
     console.log(err)
     res.status(500).json({error: 'error'})
    }
 })
 router.get('/', async (req,res)=>{
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