const appConfig = require('../appConfig/appConfig')
const recordController = require('../appController/recordsController')

const auth = require('../middleware/auth')




// function to set up the routing in the application
module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/records`


    //params: userId, title, description, issueLocation
    //optional params: issueType, screenshots, assignee, watchers, comments
    app.post(`${baseUrl}/create/issue`, recordController.createIssue)
    /**
     * @api {post} http://trackerapi.sanjayinfotechy.com/api/v1/records/create/issue Create a new issue
     * @apiVersion 0.0.1
     * @apiGroup Records
     * 
     * @apiParam {String} authToken The token for authentication
     * @apiParam {string} userId userId of the user who is creating an issue. (body params) (required)
     * @apiParam {string} title title of the issue. (body params) (required)
     * @apiParam {string} description description of the issue. (body params) (required)
     * @apiParam {string} issueLocation loaction of the issue. (body params) (required)
     * @apiParam {string} issueType type of issue. (body params) (optional)
     * @apiParam {file} screenshots screenshotsof the issue. (body params) (optional)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "Issue Created Successfully",
        * "status": 200,
        * "data": {
        *           "status": {
                        "open": true,
                        "backlog": false,
                        "inProgress": false,
                        "inTest": false,
                        "closed": false
                     },
                     "title": "String",
                     "issueType": [],
                     "issueCreatedOn": "Date",
                     "screenshots": [],
                     "watchers": [],
                     "comments": [],
                     "description": "String",
                     "issueLocation": "String",
                     "reportedBy": "String",
                     "issueId": "String",
        *         }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "Failed To Create Issue",
        * "status": 500,
        * "data": null
        * }
     */
      
     //params: screenshot: File, issueId
     app.post(`${baseUrl}/add/screenshot`,recordController.multerUpload.single('screenshots'), recordController.addScreenshot)
      
       /*
     //params: filename, issueId
      app.post(`${baseUrl}/delete/screenshot`, recordController.deleteScreenshot)
         */
    //params: userId, issueId
    app.post(`${baseUrl}/delete/issue`,auth.isAuthorized, recordController.deleteIssue)
    /**
     * @api {post} http://trackerapi.sanjayinfotechy.com/api/v1/records/delete/issue Delete a created Issue
     * @apiVersion 0.0.1
     * @apiGroup Records
     * 
     * @apiParam {String} authToken The token for authentication
     * @apiParam {string} userId userId of the user who has created an issue. (body params) (required)
     * @apiParam {string} issueId issueId of the issue. (body params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "Issue Deleted Successfully",
        * "status": 200,
        * "data": {
        *           "n": 1,
                    "ok": 1,
                    "deletedCount": 1"
        *         }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "Failed to Delete the issue",
        * "status": 500,
        * "data": null
        * }
     */


    //params: issueId
    app.put(`${baseUrl}/edit/user/issue`,auth.isAuthorized, recordController.editIssue)
    /**
     * @api {put} http://trackerapi.sanjayinfotechy.com/api/v1/records/edit/user/issue Edit a particular Issue
     * @apiVersion 0.0.1
     * @apiGroup Records
     * 
     * @apiParam {String} authToken The token for authentication
     * @apiParam {string} issueId issueId of the issue. (body params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "Issue Deleted Successfully",
        * "status": 200,
        * "data": {
        *           "n": 1,
                    "nModified": 1,
                    "ok": 1
        *         }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "Failed to Edit the issue",
        * "status": 500,
        * "data": null
        * }
     */
      
    //params: authToken, skip
    app.get(`${baseUrl}/get/pagination`,auth.isAuthorized, recordController.getPaginatedIssues)
    /**
     * @api {get} http://trackerapi.sanjayinfotechy.com/api/v1/records/get/pagination Get Paginationed Records
     * @apiVersion 0.0.1
     * @apiGroup Records
     * 
     * @apiParam {String} authToken The token for authentication
     * @apiParam {string} skip skip count for pagination
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "All Issues Found",
        * "status": 200,
        * "data": {
        *           "status": {
                        "open": true,
                        "backlog": false,
                        "inProgress": false,
                        "inTest": false,
                        "closed": false
                     },
                     "title": "String",
                     "issueType": [],
                     "issueCreatedOn": "Date",
                     "screenshots": [],
                     "watchers": [],
                     "comments": [],
                     "description": "String",
                     "issueLocation": "String",
                     "reportedBy": "String",
                     "issueId": "String",
        *         },
                  {
        *           "status": {
                        "open": true,
                        "backlog": false,
                        "inProgress": false,
                        "inTest": false,
                        "closed": false
                     },
                     "title": "String",
                     "issueType": [],
                     "issueCreatedOn": "Date",
                     "screenshots": [],
                     "watchers": [],
                     "comments": [],
                     "description": "String",
                     "issueLocation": "String",
                     "reportedBy": "String",
                     "issueId": "String",
        *         }
                  ..................
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No Issue Found",
        * "status": 500,
        * "data": null
        * }
     */

    //params: authToken
    app.get(`${baseUrl}/all/issues`,auth.isAuthorized, recordController.getAllIssue)
    /**
     * @api {get} http://trackerapi.sanjayinfotechy.com/api/v1/records/all/issues Get All Issues
     * @apiVersion 0.0.1
     * @apiGroup Records
     * 
     * @apiParam {String} authToken The token for authentication
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "All Issues Found",
        * "status": 200,
        * "data": {
        *           "status": {
                        "open": true,
                        "backlog": false,
                        "inProgress": false,
                        "inTest": false,
                        "closed": false
                     },
                     "title": "String",
                     "issueType": [],
                     "issueCreatedOn": "Date",
                     "screenshots": [],
                     "watchers": [],
                     "comments": [],
                     "description": "String",
                     "issueLocation": "String",
                     "reportedBy": "String",
                     "issueId": "String",
        *         }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No Issue Found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: fullName
    app.get(`${baseUrl}/all/user/issues`,auth.isAuthorized, recordController.getParticularUserIssues)
    /**
     * @api {get} http://trackerapi.sanjayinfotechy.com/api/v1/records/all/user/issues Get All Specific User Created Issues
     * @apiVersion 0.0.1
     * @apiGroup Records
     * 
     * @apiParam {String} fullName fullName of the user
     * @apiParam {String} authToken The token for authentication
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "All User Created issue found",
        * "status": 200,
        * "data": {
        *           "status": {
                        "open": true,
                        "backlog": false,
                        "inProgress": false,
                        "inTest": false,
                        "closed": false
                     },
                     "title": "String",
                     "issueType": [],
                     "issueCreatedOn": "Date",
                     "screenshots": [],
                     "watchers": [],
                     "comments": [],
                     "description": "String",
                     "issueLocation": "String",
                     "reportedBy": "String",
                     "issueId": "String",
        *         }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No User created Issue found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: issueId
    app.get(`${baseUrl}/get/:issueId/issue`,auth.isAuthorized, recordController.viewSingleIssue)
    /**
     * @api {get} http://trackerapi.sanjayinfotechy.com/api/v1/records/get/:issueId/issue Get Single Issue Created By A User
     * @apiVersion 0.0.1
     * @apiGroup Records
     * 
     * @apiParam {String} authToken The token for authentication
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "Issue Record found",
        * "status": 200,
        * "data": {
        *           "status": {
                        "open": true,
                        "backlog": false,
                        "inProgress": false,
                        "inTest": false,
                        "closed": false
                     },
                     "title": "String",
                     "issueType": [],
                     "issueCreatedOn": "Date",
                     "screenshots": [],
                     "watchers": [],
                     "comments": [],
                     "description": "String",
                     "issueLocation": "String",
                     "reportedBy": "String",
                     "issueId": "String",
        *         }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No Issue Records found",
        * "status": 404,
        * "data": null
        * }
     */
    
} // end set router