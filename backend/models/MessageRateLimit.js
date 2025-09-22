const mongoose = require('mongoose');

const MessageRateLimitSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    dailyCount: {
        type: Number,
        default: 0
    },
    windowStart: {
        type: Date,
        required: true
    },
    lastMessageAt: {
        type: Date,
        required: true
    }
}, { timestamps: true, strict: true })

module.exports = mongoose.model('MessageRateLimit', MessageRateLimitSchema)