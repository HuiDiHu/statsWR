const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')
const banList = require('../constants.json')['ban_list']

const auth = async (req, res, next) => {
  // check header. Bearer auth format
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1] //get rid of Bearer
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    if (banList.includes(payload.userID)) {
      throw new UnauthenticatedError('Authentication invalid')
    }
    // attach to the user for the comment route
    req.user = { userID: payload.userID }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = auth
