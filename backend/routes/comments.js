const appConfig = require('../appConfig/appConfig')
const commentController = require('../appController/commentsController')

const auth = require('../middleware/auth')

// function to set up the routing in the application
module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/comments`

    
    //params: authToken, commentId
    app.put(`${baseUrl}/edit/:commentId`,auth.isAuthorized , commentController.editComment)
    /**
     * @api {put} http://trackerapi.sanjayinfotechy.com/api/v1/comments/edit Edit a particular comment
     * @apiVersion 0.0.1
     * @apiGroup Comments
     * 
     * @apiParam {String} authToken The token for authentication
     * @apiParam {string} commentId commentId of the Particular comment
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        *   "error": false,
            "message": "Comment Edited Successfully",
            "status": 200,
            "data": {
            *           "n": 1,
                        "nModified": 1,
                        "ok": 1
        *           }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "Failed to Edit the Comment",
        * "status": 500,
        * "data": null
        * }
     */

    //params: authToken, commentId
    app.post(`${baseUrl}/delete`,auth.isAuthorized , commentController.deleteComment)
    /**
     * @api {post} http://trackerapi.sanjayinfotechy.com/api/v1/comments/delete Delete a particular comment
     * @apiVersion 0.0.1
     * @apiGroup Comments
     * 
     * @apiParam {String} authToken The token for authentication
     * @apiParam {string} commentId commentId of the Particular comment
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        *   "error": false,
            "message": "Comment Deteled Successfully",
            "status": 200,
            "data": {
            *           "n": 1,
                        "ok": 1,
                        "deletedCount": 1"
        *           }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "Failed to Delete the comment",
        * "status": 505,
        * "data": null
        * }
     */
    
     //params: authToken, issueId, skip
    app.get(`${baseUrl}/get/all`,auth.isAuthorized , commentController.getPaginatedComments)
    /**
     * @api {get} http://trackerapi.sanjayinfotechy.com/api/v1/comments/get/all Get all comments of an issue
     * @apiVersion 0.0.1
     * @apiGroup Comments
     * 
     * @apiParam {String} authToken The token for authentication
     * @apiParam {string} issueId issueId of the Particular Issue
     * @apiParam {string} skip skip of the Particular Issue
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        *   "error": false,
            "message": "Comments Found",
            "status": 200,
            "data": [
                {
                    "_id": "string",
                    "comment": "string",
                    "commentedBy": "string",
                    "createdOn": "date,
                    "seen": boolean,
                    "commentId": "string",
                    "issueId": "string",
                    "__v": 0
                }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No Comments",
        * "status": 404,
        * "data": null
        * }
     */

}