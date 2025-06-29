
// PLEASE EXECUTE WITHIN THE root directory of backend!

require('dotenv').config() //loads environment variables from a .env file containing info like port number, and database user/password
const connectDB = require('../db/connect') //include connectDB function from db folder and connect.js
const championAbilities = require('../championAbilities.json')  //include 1 large dictionary with each key being the uppercase name of a champion, and each value holding an array of ability information.
const { BadRequestError } = require('../errors') //include BadRequestError from errors folder
const Abilities = require('../models/Abilities') //include Abilities schema from Abilities.js

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI) //connect the database using the URI from the env file
        await Abilities.deleteMany({}) //clear all the Ability objects before inserting new ones

        for (var key of Object.keys(championAbilities)) { //iterate through each key of the championAbilities dictionary to create an Abilities object for each key
            const champion = {label: key, ability: championAbilities[key]} //give the champion variable a label holding the champions Uppercase english name, and an array holding all the info for 1 champion's abilities
            await Abilities.create(champion) //create new Abilites object using champion variable
        }
        process.exit()
    } catch (error) { //Throw BadRequestError if try statement fails
        console.log(error)
        throw new BadRequestError('Unable to connect to MongoDB')
    }
}

start() //call the function




