/*
    - get all comments (can access regardless of login status)
    - decide whether or not expand comments button is necessary based on number of comments in database for certain page
    - create new comment (only after logged in)
    - update comment (edit their own comment, upvote/downvote)
    - delete comment (delete comment)
    - send database (commentID + userID + token), retrieve from database to load onto screen, 

*/

//require model
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')
const Comment = require('../models/Comment')
const User = require('../models/User')

const getAllChampionComments = async (req, res) => {
    //get all comments 
    const { champion: championLabel } = req.query;
    if (!championLabel) {throw new BadRequestError('Invalid champion page.')}

    const comments = await Comment.find({ championLabel })

    res.status(StatusCodes.OK).json({ comments })
}

const createComment = async (req, res) => { 
    const { champion: championLabel } = req.query;
    const { text } = req.body;
    const { userID } = req.user;
    if (!userID) {throw new UnauthenticatedError('Please log in before using this feature.')}
    if (!championLabel) {throw new BadRequestError('Invalid champion page.')}
    const user = await User.findById(userID);
    if (!user) {throw new UnauthenticatedError('Please log in before using this feature.')}
    
    if (!text) {throw new NotFoundError('Please enter a message.')}
    const comment = await Comment.create({ text, user: { userID, username: user.username, profile: user.profile}, championLabel });

    res.status(StatusCodes.CREATED).json({ comment })
}

const updateComment = async (req, res) => {
    const {
        params: { id: commentID }
    } = req;
    const { upvote, downvote } = req.body
    //update upvotes/downvotes
    //single comment with commentID (unique id)

    let updates = {
        "$push": {},
        "$pull": {}
    }
    if (upvote !== null) {
        upvote ? updates["$push"]["upvotes"] = req.user.userID : updates["$pull"]["upvotes"] = req.user.userID
    }
    if (downvote !== null) {
        downvote ? updates["$push"]["downvotes"] = req.user.userID : updates["$pull"]["downvotes"] = req.user.userID
    }
    const comment = await Comment.findByIdAndUpdate(commentID, updates, {new: true})
    res.status(StatusCodes.OK).json({ comment })
}

const deleteComment = async (req, res) => {
    const {
        params: { id: commentID }
    } = req;
    //delete single comment
    //single comment with commentID (unique id)

    const comment = await Comment.findByIdAndDelete(commentID)
    if (!comment) {
        throw new BadRequestError('Comment not found.')
    }

    res.status(StatusCodes.OK).json({ comment })
}

module.exports = {
    getAllChampionComments,
    createComment,
    updateComment,
    deleteComment
}




