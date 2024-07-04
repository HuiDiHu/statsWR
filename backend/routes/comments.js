const express = require('express')
const router = express.Router()

const {
    getAllComments,
    createComment,
    updateComment,
    deleteComment
} = require('../controllers/comments')

router.route('/').get(getAllComments)
router.route('/:id').post(createComment).put(updateComment).delete(deleteComment)

module.exports = router