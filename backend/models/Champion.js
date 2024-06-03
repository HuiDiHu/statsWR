const mongoose = require('mongoose')
const { BadRequestError } = require('../errors')

const ChampionSchema = new mongoose.Schema({
    label:{
        type:String,
        required:[true, 'Please provide champion label'],
        unique:true
    },
    name:{
        type:String,
        required:[true, 'Please provide champion name']
    },
    role:{
        type:Number,
        required:[true, 'Please provide champion role']
    },
    winRate:{
        type:Array,
        default:[]
    },
	pickRate:{
        type:Array,
        default:[]
    },
    banRate:{
        type:Array,
        default:[]
    },
    date:{
        type:Array,
        default:[]
    },
    tier:{
        type:String,
        default:'C'
    }
},{timestamps:true})

module.exports = mongoose.model('Champion', ChampionSchema)