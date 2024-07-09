const express = require('express')
const router = express.Router()

const {
    createComment,
    updateComment,
    deleteComment,
    updateReports
} = require('../controllers/comments')

router.route('/:id').put(updateComment).delete(deleteComment)
router.route('/create/').post(createComment)
router.route('/report/:id').put(updateReports)

module.exports = router