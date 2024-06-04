const express = require('express');
const router = express.Router();

const { 
    getAllChampions,
    getAllLaneChampions,
    getChampion
} = require('../controllers/champions')

router.route('/').get(getAllChampions)
router.route('/:id').get(getChampion)
router.route('/lanes/:id').get(getAllLaneChampions)

module.exports = router