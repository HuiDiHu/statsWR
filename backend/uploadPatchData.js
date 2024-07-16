//This is the file that calls the translateRawChampionsData function. Before doing so, the champions section of the mongo database needs to be nuked.
//Afterwards, we run uploadPatchData.js 4-5 times to get 4-5 datapoints by opening a terminal and doing "cd backend" and "node uploadPatchData.js" 
//Keep in mind that we have to delete/copy/paste each patch into the txt files in between each individual runtime

require('dotenv').config() //loads environment variables from a .env file containing info like port number, and database user/password
const connectDB = require('./db/connect') //Go up one level (.) from uploadPatchData.js to /backend, and then select db folder and go into connect.js to retrieve connectDB function
const translateRawChampionsData = require('./translateRawChampionsData') //Import the translateRawChampionsData function
const Champion = require('./models/Champion') //Import the Champion schema
const { BadRequestError } = require('./errors') //Include badRequestError defined in errors folder

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI) //connect to MongoDB
        const translatedJson = translateRawChampionsData() //Call translateRawChampionsData() function to give translatedJson an array of all Champions

        for (const champion of translatedJson) { //iterate through each index of translatedJson which represents a champion/role pair
            if ((await Champion.findOne({ label: champion.label, role: Number(champion.role) })) == null) { //if a champion/role pair doesn't exist, create it
                await Champion.create(champion)
                continue;
            }
            await Champion.updateOne(
                { label: champion.label, role: Number(champion.role) },
                { $push: { gameplayData: champion.gameplayData } }
            )
        }
        process.exit()
    } catch (error) { //throw error if the statement above fails
        console.log(error)
        throw new BadRequestError('Unable to access/upload to MongoDB')
    }
}

start() //call the function
