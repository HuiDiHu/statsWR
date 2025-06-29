require('dotenv').config()
const connectDB = require('../db/connect')
const Champion = require('../models/Champion')

const { BadRequestError } = require('../errors')

const start = async (targetPatchISODate) => {
    try {
        await connectDB(process.env.MONGO_URI)
        const targetPatchDate = new Date(targetPatchISODate)

        await Champion.updateMany(
            {},
            {
                $pull: {
                    "gameplayData": {
                        "date": targetPatchDate
                    }
                }
            }
        );
    } catch (error) {
        console.log(error)
        throw new BadRequestError('Unable to access/upload to MongoDB')
    }
}

module.exports = { uploadPatchData: start }

if (require.main === module) {
    const targetPatchDate = "<enter target patch date here>"

    start(targetPatchDate).finally(() => {
        console.log(`all gameplayData elements with date = ${targetPatchDate} have been removed!`)
        process.exit()
    })
}
