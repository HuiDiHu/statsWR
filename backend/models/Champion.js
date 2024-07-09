const mongoose = require('mongoose');
const { BadRequestError } = require('../errors');

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
})

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
    gameplayData: [ChampionGameplaySchema]
}, { timestamps: true }).index({label: 1, role: 1}, {unique: true});



module.exports = mongoose.model('Champion', ChampionSchema)