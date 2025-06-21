const Champion = require('../models/Champion') //This allows us to use the exported Champion schema in Champion.js to create Champion objects.
const Abilities = require('../models/Abilities') //This allows us to use the exported Abilities schema in Abilities.js to create Abilities objects
const { StatusCodes } = require('http-status-codes') //Allow status code constants
const { BadRequestError, NotFoundError } = require('../errors') //include BadRequestError and NotFoundError from errors folder
const uploadDates = require('../constants.json')["upload_dates"] //creates an instance of an array holding the dates within the "upload_dates" key in constants.json

//sends back an array of non-unique champions sorted by their weight. 
const getAllChampions = async (req, res) => {
    //We use the Schema.find() method instead of the Schema.findOne() method to retrieve all the champions
    const champions = await Champion.find({
        //query by gameplayData. $elemMatch is an operator used to specify a condition. 
        //in this situation, we are retrieving all Champion objects with the most recent patch date since the last element of the uploadDates array is the most recent
        gameplayData: {
            $elemMatch: { date: new Date(uploadDates[uploadDates.length - 1]) }
        }
    })

    //throw error if the find statement above fails
    if (!champions) { throw new NotFoundError('Champions not found.') }

    //sort the champions array in descending order according to each Champions' most recent weight. remember gameplayData is an array of ChampionGameplay objects
    champions.sort((a, b) => (a.gameplayData[a.gameplayData.length - 1]['weight'] < b.gameplayData[b.gameplayData.length - 1]['weight'] ? 1 : -1))

    //confirm that the function was successful and return the champions array as a json response for frontend display
    return res.status(StatusCodes.OK).json({ champions });
}

//sends back an array of unique champions filtered by the given roleId and sorted by their weight
const getAllLaneChampions = async (req, res) => {
    //use destructuring syntax to extract roleId from the request object
    const {
        params: { id: roleId }
    } = req

    //if no role is selected, call getAllChampions function defined above
    if (!roleId || Number(roleId) === 0) {
        return await getAllChampions(req, res);
    }

    //create champions array with all Champion objects that have the most recent patch data and also match the selected role
    const champions = await Champion.find({
        role: Number(roleId),
        gameplayData: {
            $elemMatch: { date: new Date(uploadDates[uploadDates.length - 1]) }
        }
    })

    //throw error if the find statement above fails
    if (!champions) { throw new NotFoundError(`Champions of lane:${roleId} not found.`) }

    //sort the champions array in descending order according to each Champions' weight
    champions.sort((a, b) => (a.gameplayData[a.gameplayData.length - 1]['weight'] < b.gameplayData[b.gameplayData.length - 1]['weight'] ? 1 : -1))

    //confirm that the function was successful and return the champions array as a json response for frontend display
    return res.status(StatusCodes.OK).json({ champions });
}

// finds champions that have data from the latest patch
// returns information and their gameplay data from the latest patch
const getAllLaneChampionsLatest = async (req, res) => {
    let {
        params: { id: roleId }
    } = req

    const matchCondition = {
        gameplayData: {
            $elemMatch: { date: new Date(uploadDates[uploadDates.length - 1]) }
        }
    }

    if (roleId && Number(roleId) >= 1 && Number(roleId) <= 5) {
        matchCondition.role = Number(roleId)
    }

    const champions = await Champion.aggregate([
        {
            $match: matchCondition
        },
        {
            $addFields: {
                gameplayData: {
                    $arrayElemAt: [
                        {
                            $filter: {
                                input: "$gameplayData",
                                cond: { $eq: ["$$this.date", new Date(uploadDates[uploadDates.length - 1])] }
                            }
                        },
                        0
                    ]
                }
            }
        }
    ]);

    if (!champions) { throw new NotFoundError(`Champions of lane:${roleId} not found.`) }

    return res.status(StatusCodes.OK).json({ champions });
}

//sends back an array of Champion objects that all share the same name (role differs)
const getChampion = async (req, res) => {
    //use destructuring syntax to extract label (chinese name) from the request object
    const {
        params: { id: label }
    } = req;

    //throw error if label is null
    if (!label) { throw new NotFoundError('Champion not found.') }
    
    //create champion array with all Champion objects that match the selected label (chinese name)
    const champion = await Champion.find({ label: label })
    
    //throw error if the find statement above fails
    if (!champion) { throw new NotFoundError(`Champion with label:${label} not found.`) }

    //sort the champion array in descending order according to most recent pickrate
    champion.sort((a, b) => (a.gameplayData[a.gameplayData.length - 1].pickRate < b.gameplayData[b.gameplayData.length - 1].pickRate ? 1 : -1))

    //confirm that the function was successful and return the champion array as a json response for frontend display
    return res.status(StatusCodes.OK).json({ champion });
}

//returns array of champion abilities
const getChampionAbilities = async (req, res) => {
    //use destructuring syntax to extract label from the request object
    const {
        params: { id: label }
    } = req;

    //throw error if label is null
    if (!label) { throw new NotFoundError('Champion not found.') }

    //find 1 Abilities object (contains a nested AbilitySchema array containing all the champs abilities and their respective info)
    const abilities = await Abilities.findOne({ label: label })

    //throw error if the ability object is not found
    if (!abilities) { throw new NotFoundError(`Champion with label:${label} not found.`) }

    //confirm that the function was successful and return the *NESTED ABILITYSCHEMA OBJECT ARRAY* as a json response for frontend display
    return res.status(StatusCodes.OK).json({ abilities: abilities.ability })
}

module.exports = { //Exports the functions so they can be used by other parts of the application. Some are called by index.js
    getAllChampions,
    getAllLaneChampions,
    getAllLaneChampionsLatest,
    getChampion,
    getChampionAbilities
}


