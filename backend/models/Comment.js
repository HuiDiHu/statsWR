const mongoose = require('mongoose'); //required for creating mongoose schemas

//Create basic schema to hold the attributes of the user who made the comment
const userSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    }
})

//Create schema for Comment objects. Called by comments.js
const CommentSchema = new mongoose.Schema({
    text: { //comment text
        type: String, 
        required: true,
        maxlength: [501, 'Character limit exceeded.']
    },
    championLabel: { //identify the champion page the comment was made on
        type: String,
        required: true
    },
    user: userSchema, //nested schema holding userID, username, and profile picture
    reports: { //comments start with 0 upvotes, downvotes, and reports so set defaults to empty arrays
        type: [String],
        default: []
    },
    upvotes: {
        type: [String],
        default: []
    },
    downvotes: {
        type: [String],
        default: []
    }
}, { timestamps: true }); //{timestmaps: true} ensures MongoDB automatically manages createdAt and updatedAt timestamps for each object


module.exports = mongoose.model('Comment', CommentSchema) //Export the mongoose model so that 'Comment' objects can be created using CommentSchema
