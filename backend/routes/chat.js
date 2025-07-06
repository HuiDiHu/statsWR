const express = require('express')
const router = express.Router()

const GetMcpClientAndToolsMiddleware = require('../middleware/mcp')

const {
    test_chat,
    get_response
} = require('../controllers/chat')

router.route('/test').get(test_chat)
router.route('/response').post(GetMcpClientAndToolsMiddleware, get_response)

module.exports = router