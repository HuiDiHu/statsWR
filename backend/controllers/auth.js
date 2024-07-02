const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        throw new BadRequestError('Please make sure all fields are filled.')
    }
    const user = await User.create({ email, username, password })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { username: user.username }, token })
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password.')
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid email or password.')
    }
    const isCorrectPassword = await user.comparePassword(password)
    if (!isCorrectPassword) {
        throw new UnauthenticatedError('Invalid email or password.')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { username: user.username }, token })
}

module.exports = {
    register,
    login,
}