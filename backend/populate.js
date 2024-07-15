require('dotenv').config() //loads environment variables from .env file
const connectDB = require('./db/connect') //include connectDB function from db folder
const translateRawChampionsData = require('./translateRawChampionsData') //include translateRawChampionsData function from translateRawChampionsData.js
const Champion = require('./models/Champion') //include Champion schema defined in Champion.js
const { BadRequestError } = require('./errors') //include BadRequestError from errors folder

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI) //connect the database using the URI from the env file
        await Champion.deleteMany({}) //clear all the Champion objects before inserting new ones
        const translatedJson = translateRawChampionsData() //translate the data from the CURRENT txt files in the rawChampionsData folder
        await Champion.insertMany(translatedJson) //insert the new Champion objects (translatedJson) into the database
        process.exit()
    } catch (error) { //throw error if the statement above fails
        console.log(error)
        throw new BadRequestError('Unable to correctly access MongoDB')
    }
}

start() //call function
