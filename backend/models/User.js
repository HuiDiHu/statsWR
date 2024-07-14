const mongoose = require('mongoose') //required for creating mongoose schemas
const bcrypt = require('bcryptjs') //allows for bcrypt.genSalt(), bcrypt.hash(), and bcrypt.compare() functions used in the functions below
const jwt = require('jsonwebtoken') //allows for jwt.sign() function used in createJWT defined below

//Define schema so that User objects can be created
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username.'],
        minlength: [4, 'Username must be longer than 3 characters.'],
        maxlength: [50, 'Username must be no longer than 50 characters.'],
    },
    email: {
        type: String,
        required: [true, 'Please provide a email.'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.'],
        minlength: [6, 'Password must be longer than 5 characters.'],
    },
    profile: {
        type: String,
        default: "RedBrambleback"
    }
}, {strict: true}) //{strict: true} ensures all data inserted must conform to the schema definition

//Defines a middleware function that runs automatically before the save() function is called on a User object
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10); //generates random variable used in hashing passwords so they are kept private in the database
    this.password = await bcrypt.hash(this.password, salt) //hashes the current password field in the schema before saving to database
    next() //required to move on to the next middleware function or complete the save() operation
})

//Creates a function that can be called by the instance of a User object (Called by login/register functions in auth.js to automatically sign users out after 1 hour)
UserSchema.methods.createJWT = function () {
    return jwt.sign( //function provided by require(jsonwebtoken)
        { userID: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',
        }
    )
}

//Another function called within the login function in auth.js that is called by the instance of a User object
UserSchema.methods.comparePassword = async function (canditatePassword) { 
    const isMatch = await bcrypt.compare(canditatePassword, this.password) //returns true if entered password matches database password
    return isMatch
}

module.exports = mongoose.model('User', UserSchema); //Export the mongoose model so that 'User' objects can be created using UserSchema
