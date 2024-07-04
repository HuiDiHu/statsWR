require('dotenv').config()
const connectDB = require('./db/connect')
const translateRawChampionsData = require('./translateRawChampionsData')
const Champion = require('./models/Champion')
const { BadRequestError } = require('./errors')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        const translatedJson = translateRawChampionsData()
        
        for (const champion of translatedJson) { 
            if ((await Champion.findOne({ label: champion.label, role: Number(champion.role) })) == null) {
                await Champion.create(champion)
                continue;
            }
            await Champion.updateOne(
                { label: champion.label, role: Number(champion.role) },
                { $push: { gameplayData: champion.gameplayData } }
            )
        }
        process.exit()
    } catch (error) {
        console.log(error)
        throw new BadRequestError('Unable to access/upload to MongoDB')
    }
}

start()