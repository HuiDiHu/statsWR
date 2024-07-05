const mongoose = require('mongoose');

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
    upvotes: {
        type: [String],
        default: []
    },
    downvotes: {
        type: [String],
        default: []
    }
}, { timestamps: true });


module.exports = mongoose.model('Comment', CommentSchema)