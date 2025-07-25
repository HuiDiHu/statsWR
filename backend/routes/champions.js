const express = require('express');
const router = express.Router();

const { 
    getAllChampions,
    getAllLaneChampionsLatest,
    getChampion,
    getChampionAbilities
} = require('../controllers/champions')

router.route('/').get(getAllChampions)
router.route('/:id').get(getChampion)
router.route('/lanes/:id').get(getAllLaneChampionsLatest)
router.route('/abilities/:id').get(getChampionAbilities)

module.exports = router