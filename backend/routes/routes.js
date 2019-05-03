const appConfig = require('../appConfig/appConfig')
const userController = require('../appController/userController')

const auth = require('../middleware/auth')

// function to set up the routing in the application
module.exports.setRouter = (app) =>  {

    let baseUrl = `${appConfig.apiVersion}/user`

    //params: firstName, lastName, dob, companyName, role, mobileNumber, location, email, password
    app.post(`${baseUrl}/signup`, userController.signupFunction)
    /**
     * @api {post} http://trackerapi.sanjayinfotechy.com/api/v1/user/singup Api for user to singup
     * @apiVersion 0.0.1
     * @apiGroup Users
     * 
     * @apiParam {string} firstName first name of the user. (body params) (required)
     * @apiParam {string} lastName last name of the user. (body params) (required)
     * @apiParam {string} dob DOB of the user. 
     * @apiParam {string} companyName company name of the user.
     * @apiParam {string} role Role/Designation of the user.
     * @apiParam {string} mobileNumber mobile number of the user.
     * @apiParam {string} location location of the user.
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "User Created Succesfully",
        * "status": 200,
        * "data": {
        *           "mobileNumber": number,
                     "createdOn": "date",
                     "_id": "string",
                     "firstName": "string",
                     "lastName": "string",
                     "userId": "string",
                     "companyName": "string",
                     "role": "string",
                     "location": "string",
                     "email": "string",
                     "__v": number
        *         }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "Failed to create user",
        * "status": 500,
        * "data": null
        * }
     */

    //params: email, password
    app.post(`${baseUrl}/login`, userController.loginFunction)
    /**
     * @api {post} http://trackerapi.sanjayinfotechy.com/api/v1/user/login Api for user login
     * @apiVersion 0.0.1
     * @apiGroup Users
     * 
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "Login Successful",
        * "status": 200,
        * "data": {
        *           "authToken": "string",
                    "userDetails": {
                                    "mobileNumber": number,
                                    "firstName": "string",
                                    "lastName": "string",
                                    "userId": "string",
                                    "companyName": "string",
                                    "role": "string",
                                    "location": "string",
                                    "email": "string"
                                }
        *         }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No user Found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: userId
    app.post(`${baseUrl}/logout`, userController.logoutFunction)
    /**
     * @api {post} http://trackerapi.sanjayinfotechy.com/api/v1/user/logout Api for Logout
     * @apiVersion 0.0.1
     * @apiGroup Users
     * 
     * @apiParam {string} userId userId of the user
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        *   "error": false,
            "message": "Logged out successfully",
            "status": 200,
            "data": null
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "Already Logged out or Invalid UserId",
        * "status": 404,
        * "data": null
        * }
     */

    //params: authToken
    app.get(`${baseUrl}/get/all`, auth.isAuthorized, userController.getAllUsers)
    /**
     * @api {get} http://trackerapi.sanjayinfotechy.com/api/v1/user/get/all Get All Users
     * @apiVersion 0.0.1
     * @apiGroup Users
     * 
     * @apiParam {String} authToken The token for authentication
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "All User Details Found",
        * "status": 200,
        * "data": {
    *               "mobileNumber": number,
                     "createdOn": "string",
                     "firstName": "string",
                     "lastName": "string",
                     "userId": "string",
                     "companyName": "string",
                     "role": "string",
                     "location": "string",
                     "email": "string",
                     "password": "string"
        *         }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No Users Found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: userId, authToken
    app.get(`${baseUrl}/:userId/get`, auth.isAuthorized, userController.getSingleUser)
    /**
     * @api {get} http://trackerapi.sanjayinfotechy.com/api/v1/user/:userId/get Get Single User Info
     * @apiVersion 0.0.1
     * @apiGroup Users
     * 
     * @apiParam {string} userId userId of the user whose info is needed
     * @apiParam {String} authToken The token for authentication
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "User Found",
        * "status": 200,
        * "data": {
    *               "mobileNumber": number,
                     "createdOn": "string",
                     "_id": "string",
                     "firstName": "string",
                     "lastName": "string",
                     "userId": "string",
                     "companyName": "string",
                     "role": "string",
                     "location": "string",
                     "email": "string",
                     "password": "string"
                     "__v": 0
        *         }
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No User Found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: userId, authToken
    app.delete(`${baseUrl}/:userId/delete`, auth.isAuthorized, userController.deleteUser)
    /**
     * @api {delete} http://trackerapi.sanjayinfotechy.com/api/v1/user/:userId/delete Api to delete user details
     * @apiVersion 0.0.1
     * @apiGroup Users
     * 
     * @apiParam {string} userId userId of the user whose info is needed
     * @apiParam {String} authToken The token for authentication
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "Deleted the user successfully",
        * "status": 200,
        * "data": { 
        *       "n": 1,
                "ok": 1,
                "deletedCount": 1
        * }
        * 
        * @apiErrorExample {json} Error-Response:
        * 
        * {
        * "error": true,
        * "message": "No user Found",
        * "status": 404,
        * "data": null
        * }
     */

    //params: userId, authToken
    //Other parameters: optional
    app.put(`${baseUrl}/:userId/edit`, auth.isAuthorized, userController.editUser)
    /**
     * @api {put} http://trackerapi.sanjayinfotechy.com/api/v1/user/:userId/edit Api to edit user details
     * @apiVersion 0.0.1
     * @apiGroup Users
     * 
     * @apiParam {string} userId userId of the user whose info is needed
     * @apiParam {String} authToken The token for authentication
     * 
        * @apiSuccessExample {json} Success-Response:
        * {
        * "error": false,
        * "message": "User Details Edited successfully",
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
        * "message": "No user Found",
        * "status": 404,
        * "data": null
        * }
     */

} // end set Router
