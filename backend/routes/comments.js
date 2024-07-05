const express = require('express')
const router = express.Router()

const {
    getAllChampionComments,
    createComment,
    updateComment,
    deleteComment
} = require('../controllers/comments')

router.route('/').get(getAllChampionComments)
router.route('/:id').post(createComment).put(updateComment).delete(deleteComment)

module.exports = router