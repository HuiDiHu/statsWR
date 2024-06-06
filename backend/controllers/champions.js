const Champion = require('../models/Champion')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const defaultSection = 'winRate'

const getAllChampions = async (req, res) => {
    //sends back an array of non-unique champions sorted by their defaultSection
    const champions = await Champion.find({})
    if (!champions) { throw new NotFoundError('Champions not found.') }
    champions.sort((a, b) => (a.gameplayData[a.gameplayData.length - 1][defaultSection] < b.gameplayData[b.gameplayData.length - 1][defaultSection] ? 1 : -1))
    return res.status(StatusCodes.OK).json({ champions });
}

const getAllLaneChampions = async (req, res) => {
    //sends back an array of unique champions filtered by the given roleId and sorted by their defaultSection
    const {
        params: { id: roleId }
    } = req
    if (!roleId || Number(roleId) === 0) {
        return await getAllChampions(req, res);
    }
    //filter by role
    const champions = await Champion.find({ role: Number(roleId) })
    if (!champions) { throw new NotFoundError(`Champions of lane:${roleId} not found.`) }
    champions.sort((a, b) => (a.gameplayData[a.gameplayData.length - 1][defaultSection] < b.gameplayData[b.gameplayData.length - 1][defaultSection] ? 1 : -1))
    return res.status(StatusCodes.OK).json({ champions });
}

const getChampion = async (req, res) => {
    //TODO: implement this after the design for champion specific page is completed
    return res.status(StatusCodes.OK).send('get a champion');
}

module.exports = {
    getAllChampions,
    getAllLaneChampions,
    getChampion
}


