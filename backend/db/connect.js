const mongoose = require('mongoose');

let conn = null

//Define the function that connects the application to MongoDB. Called in other parts of the application including index.js.
const connectDB = async (url) => {
    if (conn == null || mongoose.connection.readyState == 0) {
        console.log("Connecting to mongoDB...")
        conn = await mongoose.connect(url, {
            serverSelectionTimeoutMS: 15000,
        });
    }
    return conn
}

module.exports = connectDB
