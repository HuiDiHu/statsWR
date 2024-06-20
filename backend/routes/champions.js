const express = require('express');
const router = express.Router();

const { 
    getAllChampions,
    getAllLaneChampions,
    getChampion,
    getChampionAbilities
} = require('../controllers/champions')

router.route('/').get(getAllChampions)
router.route('/:id').get(getChampion)
router.route('/lanes/:id').get(getAllLaneChampions)
router.route('/abilities/:id').get(getChampionAbilities)

module.exports = router