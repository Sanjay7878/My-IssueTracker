const mongoose = require('mongoose')

/*Libraries*/
const check = require('../libs/check')
const response = require('../libs/response')
const logger = require('../libs/logger')

/*Models*/
const RecordModel = mongoose.model('Record')
const CommentModel = mongoose.model('Comments')

let getPaginatedComments = (req, res)=>{
    
    let findCurrentIssue =() =>{
        return new Promise((resolve, reject)=>{
            RecordModel.findOne({issueId: req.query.issueId || req.params.issueId}, (err, issueDetails)=>{
                if(err){
                    logger.error(err.message, ' commentsController: getPaginatedComments, findCurrentIssue', 4)
                    let apiResponse = response.generate(true,`Failed to get currentIssue due to: ${err.message}`, 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(issueDetails)){
                    logger.error("No Issue Found for comments", ' commentsController: getPaginatedComments, findCurrentIssue', 4)
                    let apiResponse = response.generate(true,`No Issue Found for comments`, 404, null)
                    reject(apiResponse)
                } else {
                    resolve(issueDetails)
                }
            })
        })
    } // end find current issue

    let findComments = (issueDetails) =>{    
        return new Promise((resolve, reject)=>{
            CommentModel.find({issueId: issueDetails.issueId})
                .skip(parseInt(req.query.skip || req.params.skip) || 0)
                .lean()
                .limit(5)
                .exec((err, commentDetails)=>{
                if(err){
                    logger.error(err.message, ' commentsController: getPaginatedComments, findComments', 4)
                    let apiResponse = response.generate(true,`Failed to get currentIssue due to: ${err.message}`, 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(commentDetails)){
                    logger.error("No Comments", ' commentsController: getPaginatedComments, findComments', 4)
                    let apiResponse = response.generate(true,`No Comments`, 404, null)
                    reject(apiResponse)
                } else {
                    resolve(commentDetails)
                }
            })
        })
    } // end find comments

    findCurrentIssue()
        .then(findComments)
        .then((resolve)=>{
            let apiResponse = response.generate(false, "Comments Found", 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            res.send("Some error occured")
            res.send(err)
        })

} // end get paginated comments

let editComment = (req, res)=>{
    //function to find the user's specific issue that needs to be edited
    let findComment = () =>{
        return new Promise((resolve, reject)=>{
                CommentModel.findOne({commentId: req.params.commentId}, (err, commentDetails)=>{
                        if(err){
                            logger.error(err.message, ' commentsController: editComment, findComment', 8)
                            let apiResponse = response.generate(true, "Failed to find the Comment", 500, null)
                            reject(apiResponse)
                        } else if(check.isEmpty(commentDetails)){
                            logger.error("No Comment Found", ' commentsController: editComment, findComment', 8)
                            let apiResponse = response.generate(true, "No Comment Found", 404, null)
                            reject(apiResponse)
                        } else {
                            resolve(commentDetails.commentId)
                        }
                })
        })
    } // end edit user issue

    // function to edit the issue
    let editParticularComment = (id) =>{
        return new Promise((resolve, reject)=>{
            let options = req.body
            CommentModel.update({commentId: id}, options, {multi: true}, (err, editedComment)=>{
                if(err){
                    logger.error(err.message, ' commentsController: editComment, editParticularComment', 8)
                    let apiResponse = response.generate(true, "Failed to Edit the Comment", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(editedComment)){
                    logger.error("No Comment Found", ' commentsController: editComment, editParticularComment', 8)
                    let apiResponse = response.generate(true, "No Comment Found", 404, null)
                    reject(apiResponse)
                } else {
                    resolve(editedComment)
                }
            })
        })
    }// 

    findComment(req, res)
        .then(editParticularComment)
        .then((resolve)=>{
            console.log("Comment Edited Successfully")
            let apiResponse = response.generate(false, "Comment Edited Successfully", 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            console.log("Some Error occured")
            res.send(err)
        })
} // end edit comment

let deleteComment = (req, res)=>{
    CommentModel.deleteOne({commentId: req.body.commentId}, (err, result)=>{
        if(err){
            logger.error(err.message, ' commentsController: deleteComment, deleteUserComment', 8)
            let apiResponse = response.generate(true, "Failed to Delete the comment", 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(result)){
            logger.error("No Comments Found", ' commentsController: deleteComment, deleteUserComment', 8)
            let apiResponse = response.generate(true, "No Comments Found", 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, "Comment Deteled Successfully", 200, result)
            res.send(apiResponse)
        }
    })
} // end delete comment

module.exports = {
    getPaginatedComments: getPaginatedComments,
    editComment: editComment,
    deleteComment: deleteComment
}