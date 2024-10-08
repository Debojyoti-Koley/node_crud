const mongoose = require('mongoose')

// define person schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    city:{
        type: String
    }
})

//create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person