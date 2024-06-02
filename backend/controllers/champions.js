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
    res.send('create a champion')
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


