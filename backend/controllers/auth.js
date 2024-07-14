//In '../models/User' The path '../models/User' is interpreted as: Go up two levels (..) from auth.js to /controllers to /backend. 
//Then go into /models folder to find the /User file. This allows us to use the exported User schema in User.js to create User objects.
const User = require('../models/User')

//Importing Module: require('http-status-codes') imports the http-status-codes module, which provides a convenient way to access HTTP status codes.
//Object Destructuring: { StatusCodes } extracts the StatusCodes property from the module, making it available as a local variable in the current file.
//Allows for the use of meaningful constants (StatusCodes.OK, StatusCodes.NOT_FOUND) instead of hardcoding numeric HTTP status codes throughout your application. 
const { StatusCodes } = require('http-status-codes')

//Go up two levels (..) from auth.js to /controllers to /backend and then import 2 errors from the /errors folder. 
//Use destructure syntax since we are taking from a folder instead of a specific file.
const { BadRequestError, UnauthenticatedError } = require('../errors')

//Go up two levels (..) from auth.js to /controllers to /backend and then import the constants dictionary from constants.json. 
//It contains 1 key each for default "profile_pictures", "ban_list" for banned users, upload patches, and upload dates with values in the form of arrays holding constants.
const constants = require('../constants.json')

//This function handles the user registration process. 
//putting async in front of the parameters (req, res) makes the register function asynchronous which allows for the await keyword
const register = async (req, res) => {
    const { email, username, password } = req.body; //create instances of the information from user input

    if (!email || !username || !password) { //One of the user input fields is blank
        throw new BadRequestError('Please make sure all fields are filled.')
    }
    const array = constants['profile_pictures'] //Access the 'profile_pictures' key array

    //The await keyword ensures that User creation must be successful before the rest of the function is executed
    //Assign a new User object to a variable called "user" and choose a random profile picture from the profile_pictures key array
    const user = await User.create({ email, username, password, profile: array[Math.floor(Math.random() * array.length)] })
    const token = user.createJWT() //create a session for the user until that ends in 1 hour

    //Use res.status() to indicate a successful login and return a json response containing user information for frontend display and the token
    res.status(StatusCodes.CREATED).json({ user: { id: user._id, username: user.username, profile: user.profile }, token })
}

//This function handles the user login process using a similar procedure to the register function above
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password.')
    }

    const user = await User.findOne({ email }) //Search for a User object in database that matches user input email
    if (!user) {
        throw new UnauthenticatedError('Invalid email or password.')
    }
    const isCorrectPassword = await user.comparePassword(password) //Call function defined in User.js to see if input password matches database password
    if (!isCorrectPassword) {
        throw new UnauthenticatedError('Invalid email or password.')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { id: user._id, username: user.username, profile: user.profile }, token })
}

module.exports = { //Exports the register and login functions so they can be used by other parts of the application.
    register,
    login,
}
