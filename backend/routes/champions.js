const express = require('express');
const router = express.Router();

const { 
    getAllChampions,
    getAllLaneChampions,
    getChampion,
    createChampion,
    updateChampion,
    deleteChampion
} = require('../controllers/champions')

router.route('/').post(createChampion).get(getAllChampions)
router.route('/:id').get(getChampion).delete(deleteChampion).patch(updateChampion)
router.route('/lanes/:id').get(getAllLaneChampions)

module.exports = router