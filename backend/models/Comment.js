const mongoose = require('mongoose');

const userIDSchema = new mongoose.Schema({
    userID: {
        type: String
    }
})

const CommentSchema = new mongoose.Schema({
    text: { //comment text
        type: String, 
        required: true,
        maxlength: [300, 'Character limit exceeded.']
    },
    userID: { //used for pfp and user authentification for edits
        type: String, 
        required: [true, 'User not found.']
    },
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