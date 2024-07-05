const mongoose = require('mongoose');

const userIDSchema = new mongoose.Schema({
    userID: {
        type: String
    }
})

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

const CommentSchema = new mongoose.Schema({
    text: { //comment text
        type: String, 
        required: true,
        maxlength: [300, 'Character limit exceeded.']
    },
    championLabel: {//which champion page
        type: String,
        required: true
    },
    user: userSchema,
    date: { //date created
        type: Date,
        default: Date.now()
    },
    upvotes: {
        type: [userIDSchema],
        default: []
    },
    downvotes: {
        type: [userIDSchema],
        default: []
    }
});


module.exports = mongoose.model('Comment', CommentSchema)