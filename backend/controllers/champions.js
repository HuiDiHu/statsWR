const Champion = require('../models/Champion')
const Abilities = require('../models/Abilities')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const uploadDates = require('../constants.json')["upload_dates"]


const getAllChampions = async (req, res) => {
    //sends back an array of non-unique champions sorted by their weight

    const champions = await Champion.find({
        gameplayData: {
            $elemMatch: { date: new Date(uploadDates[uploadDates.length - 1]) }
        }
    })


    if (!champions) { throw new NotFoundError('Champions not found.') }
    champions.sort((a, b) => (a.gameplayData[a.gameplayData.length - 1]['weight'] < b.gameplayData[b.gameplayData.length - 1]['weight'] ? 1 : -1))
    return res.status(StatusCodes.OK).json({ champions });
}

const getAllLaneChampions = async (req, res) => {
    //sends back an array of unique champions filtered by the given roleId and sorted by their weight
    const {
        params: { id: roleId }
    } = req
    if (!roleId || Number(roleId) === 0) {
        return await getAllChampions(req, res);
    }

    //filter by role
    const champions = await Champion.find({
        role: Number(roleId),
        gameplayData: {
            $elemMatch: { date: new Date(uploadDates[uploadDates.length - 1]) }
        }
    })

    if (!champions) { throw new NotFoundError(`Champions of lane:${roleId} not found.`) }
    champions.sort((a, b) => (a.gameplayData[a.gameplayData.length - 1]['weight'] < b.gameplayData[b.gameplayData.length - 1]['weight'] ? 1 : -1))
    return res.status(StatusCodes.OK).json({ champions });
}

const getChampion = async (req, res) => {
    const {
        params: { id: label }
    } = req;
    if (!label) { throw new NotFoundError('Champion not found.') }
    //filter by label
    const champion = await Champion.find({ label: label })
    if (!champion) { throw new NotFoundError(`Champion with label:${label} not found.`) }
    champion.sort((a, b) => (a.gameplayData[a.gameplayData.length - 1].pickRate < b.gameplayData[b.gameplayData.length - 1].pickRate ? 1 : -1))
    return res.status(StatusCodes.OK).json({ champion });
}

const getChampionAbilities = async (req, res) => {
    const {
        params: { id: label }
    } = req;
    if (!label) { throw new NotFoundError('Champion not found.') }
    //filter by champion
    const abilities = await Abilities.findOne({ label: label })
    if (!abilities) { throw new NotFoundError(`Champion with label:${label} not found.`) }
    return res.status(StatusCodes.OK).json({ abilities: abilities.ability })
}

module.exports = {
    getAllChampions,
    getAllLaneChampions,
    getChampion,
    getChampionAbilities
}


