const mongoose = require('mongoose'); //required for creating mongoose schemas
const { BadRequestError } = require('../errors'); //include BadRequestError from errors folder

//Create a basic schema to hold a single ability's video source, icon source, name, and description
//The values for this schema are located in championAbilities.json and are translated by populateAbilities.js
const AbilitySchema = new mongoose.Schema({
    demoSrc: {
        type: String,
        required: [true, 'Please provide ability demo video source']
    },
    iconSrc: {
        type: String,
        required: [true, 'Please provide ability icon source']
    },
    name: {
        type: String,
        required: [true, 'Please provide ability name']
    },
    description: {
        type: String,
        required: [true, 'Please provide ability description']
    }
}, {unique: true}); //{unique: true} ensures that mongoDB will not allow for duplicates of the same object

//Create another schema to link champion names to all their abilities
const AbilitiesSchema = new mongoose.Schema({
    label: {
        type: String,
        required: [true, 'Please provide champion label']
    },
    ability: [AbilitySchema] //Holds an array of individual AbilitySchemas. Each array should have 5 indexes. One for the champion's passive, and four for the champion's other abilities
}, {unique: true});

module.exports = mongoose.model('Abilities', AbilitiesSchema); //Export the mongoose model so that 'Abilities' objects can be created using AbilitiesSchema
