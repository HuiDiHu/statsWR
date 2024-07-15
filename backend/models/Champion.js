const mongoose = require('mongoose'); //required for creating mongoose schemas
const { BadRequestError } = require('../errors'); //include BadRequestError from errors folder

//Create basic schema to hold the statistics of a single champion's role.   
//The raw values for this schema are provided by the rawChampionsData folder, and translated by a combination of translateRawChampionsData.js and uploadPatchData.js
const ChampionGameplaySchema = new mongoose.Schema({
    winRate: {
        type: Number,
        default: 0.00
    },
    pickRate: {
        type: Number,
        default: 0.00
    },
    banRate: {
        type: Number,
        default: 0.00
    },
    weight: {
        type: Number,
        default: 0.00
    },
    tier: {
        type: String,
        default: "NaN,1/1"
    },
    date: {
        type: Date,
        default: Date.now()
    }
}) //Note that some champions do not have any gameplay data so instead of making the fields required, we use a default value. 

//Create another schema to link champion names/roles to their respective gameplay statistics. Called in uploadPatchData.js
const ChampionSchema = new mongoose.Schema({
    label: {
        type: String,
        required: [true, 'Please provide champion label']
    },
    name: {
        type: String,
        required: [true, 'Please provide champion name']
    },
    role: {
        type: Number,
        required: [true, 'Please provide champion role']
    },
    gameplayData: [ChampionGameplaySchema] //Holds an array of individual ChampionGameplaySchemas. The number of indexes should be equal to however many dates that a single champion's role has (number of datapoints for a role)
}, { timestamps: true }).index({label: 1, role: 1}, {unique: true}); //Prevent duplicates, sort label and role (1 for ascending, -1 for descending), and {timestmaps: true} ensures MongoDB automatically manages createdAt and updatedAt timestamps for each object


module.exports = mongoose.model('Champion', ChampionSchema) //Export the mongoose model so that 'Champion' objects can be created using ChampionSchema
