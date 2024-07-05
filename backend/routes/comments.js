const express = require('express')
const router = express.Router()

const {
    createComment,
    updateComment,
    deleteComment
} = require('../controllers/comments')

router.route('/:id').put(updateComment).delete(deleteComment)
router.route('/create/').post(createComment)

module.exports = router