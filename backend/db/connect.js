const mongoose = require('mongoose');

//Define the function that connects the application to MongoDB. Called in other parts of the application including index.js.
const connectDB = (url) => {
    return mongoose.connect(url);
}

module.exports = connectDB
