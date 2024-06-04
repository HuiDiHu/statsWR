require('dotenv').config()
const connectDB = require('./db/connect')
const translateRawChampionsData = require('./translateRawChampionsData.js')
const Champion = require('./models/Champion')
const { BadRequestError } = require('./errors')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Champion.deleteMany({})
        const translatedJson = translateRawChampionsData()
        await Champion.insertMany(translatedJson)
        process.exit()
    } catch(error) {
        console.log(error)
        throw new BadRequestError('Unable to correctly access MongoDB')
    }
}

start()