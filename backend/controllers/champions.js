const Champion = require('../models/Champion')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')

const getAllChampions = async (req, res) => {
    res.send('get all champions')
}

const getAllLaneChampions = async (req, res) => {
    res.send('get all champions from a single lane')
}

const getChampion = async (req, res) => {
    res.send('get a champion')
}

const createChampion = async (req, res) => {
    const { label, name, role, winRate, pickRate, banRate, tier } = req.body
    const champion = await Champion.create({ label, name, role, winRate, pickRate, banRate, tier })
    res.status(StatusCodes.CREATED).json({ champion })
}

const updateChampion = async (req, res) => {
    res.send('update a champion')
}

const deleteChampion = async (req, res) => {
    res.send('delete a champion')
}

module.exports = {
    getAllChampions,
    getAllLaneChampions,
    getChampion,
    createChampion,
    updateChampion,
    deleteChampion
}


