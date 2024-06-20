const mongoose = require('mongoose');
const { BadRequestError } = require('../errors');

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
}, {unique: true});

const AbilitiesSchema = new mongoose.Schema({
    label: {
        type: String,
        required: [true, 'Please provide champion label']
    },
    ability: [AbilitySchema]
}, {unique: true});

module.exports = mongoose.model('Abilities', AbilitiesSchema);