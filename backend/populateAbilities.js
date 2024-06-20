require('dotenv').config()
const connectDB = require('./db/connect')
const championAbilities = require('./championAbilities.json')
const { BadRequestError } = require('./errors')
const Abilities = require('./models/Abilities')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Abilities.deleteMany({})

        for (var key of Object.keys(championAbilities)) {
            const champion = {label: key, ability: championAbilities[key]}
            await Abilities.create(champion)
        }
        process.exit()
    } catch (error) {
        console.log(error)
        throw new BadRequestError('Unable to connect to MongoDB')
    }
}

start()
