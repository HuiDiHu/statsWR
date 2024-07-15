/*
    - get all comments (can access regardless of login status)
    - decide whether or not expand comments button is necessary based on number of comments in database for certain page
    - create new comment (only after logged in)
    - update comment (edit their own comment, upvote/downvote)
    - delete comment (delete comment)
    - send database (commentID + userID + token), retrieve from database to load onto screen, 
*/

const { StatusCodes } = require('http-status-codes') //include status code constants
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors') //include 3 errors from errors folder
const Comment = require('../models/Comment') //include Comment schema from Comment.js
const User = require('../models/User') //include User schema from User.js
const banList = require('../constants.json')['ban_list'] //include list of all banned users from constants.json

//get all comments for a specific champion
const getAllChampionComments = async (req, res) => { 
    //use destructuring syntax to extract championLabel from the request object
    const { champion: championLabel } = req.query;

    //throw error if championLabel is null
    if (!championLabel) {throw new BadRequestError('Invalid champion page.')}

    //create a comments array with all the comments matching the championLabel from the database
    const comments = await Comment.find({ championLabel })

    //confirm that the function was successful and return the comments array as a json response for frontend display (filter out comments from banned users)
    res.status(StatusCodes.OK).json({ comments: comments.filter((comment) => !banList.includes(comment.user.userID)) })
}

//handle the process of creating a user comment
const createComment = async (req, res) => { 
    //use destructuring syntax to extract ChampionLabel, text, and userID from request object
    const { champion: championLabel } = req.query;
    const { text } = req.body;
    const { userID } = req.user;

    //throw erorrs if any of the variables above are null
    if (!userID) {throw new UnauthenticatedError('Please log in before using this feature.')}
    if (!championLabel) {throw new BadRequestError('Invalid champion page.')}
    const user = await User.findById(userID);
    if (!user) {throw new UnauthenticatedError('Please log in before using this feature.')}
    if (!text) {throw new NotFoundError('Please enter a message.')}

    //create a Comment object in the database with text (the content of the comment), user info (userID, username, and pfp), and championLabel to identify the champion page the comment was made on
    const comment = await Comment.create({ text, user: { userID, username: user.username, profile: user.profile}, championLabel });

    //confirm that the function was successful and return the comment variable as a json response for frontend display
    res.status(StatusCodes.CREATED).json({ comment })
}

//handle the process of upvoting/downvoting single comment with commentID (unique id)
const updateComment = async (req, res) => {
    //use destructuring syntax to extract commentID, upvotes, and downvotes from request object
    const {
        params: { id: commentID }
    } = req;
    const { upvote, downvote } = req.body
    
    //check if a user has already upvoted or downvoted a comment. ($addToSet is for adding votes, $pull is for retracting votes)
    let updates = {
        "$addToSet": {},
        "$pull": {}
    }
    if (upvote !== null) {
        upvote ? updates["$addToSet"]["upvotes"] = req.user.userID : updates["$pull"]["upvotes"] = req.user.userID
    }
    if (downvote !== null) {
        downvote ? updates["$addToSet"]["downvotes"] = req.user.userID : updates["$pull"]["downvotes"] = req.user.userID
    }

    //update comment 
    const comment = await Comment.findByIdAndUpdate(commentID, updates, {new: true})

    //confirm that the function was successful and return the comment variable as a json response for frontend display
    res.status(StatusCodes.OK).json({ comment })
}

//handle the process of deleting a single comment
const deleteComment = async (req, res) => {
    //use destructuring syntax to extract commentID from request object
    const {
        params: { id: commentID }
    } = req;
    
    //find single comment with commentID (unique id)
    const comment = await Comment.findByIdAndDelete(commentID)
    if (!comment) {
        throw new BadRequestError('Comment not found.')
    }

    //confirm that the function was successful and return the comment variable as a json response for frontend display
    res.status(StatusCodes.OK).json({ comment })
}

//handle the process of reporting a comment
const updateReports = async (req, res) => {
    //use destructuring syntax to extract commentID and text from request object
    const {
        params: { id: commentID }
    } = req;
    const { report } = req.body

    let updates = {
        "$addToSet": {},
        "$pull": {}
    }
    if (report) {
        updates["$addToSet"]["reports"] = req.user.userID
    } else {
        updates["$pull"]["reports"] = req.user.userID
    }

    //update comment object in the database to show it has been reported
    await Comment.findByIdAndUpdate(commentID, updates, {new: true})

    //confirm that the function was successful and send a message for frontend display
    res.status(StatusCodes.OK).send('Comment report status successfully updated.')
}

module.exports = { //Exports the functions so they can be used by other parts of the application.
    getAllChampionComments,
    createComment,
    updateComment,
    deleteComment,
    updateReports
}




