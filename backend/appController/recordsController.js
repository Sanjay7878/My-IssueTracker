const mongoose = require('mongoose')
const shortid = require('shortid')
const fs = require('fs')
/*Libraries*/
const check = require('../libs/check')
const response = require('../libs/response')
const logger = require('../libs/logger')
const time = require('../libs/timeLib')


/*Models*/
const UserModel = mongoose.model('User')
const RecordModel = mongoose.model('Record')
const ScreenshotModel = mongoose.model('Screenshot')
/**
 * 
 * Multer logic
 * 
 */
const path = require('path')
const multer = require('multer')

//setting storage for screenshots
const storage = multer.diskStorage({
    destination: 'appController/screenshots',
    filename: (req, file, cb)=>{
        cb(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
}) // end storage

//setting filter for file
const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    } else {
        cb(new Error("images file type not supported. Upload only png or jpeg"), false)
    }
}

//function to upload using multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
})

/**
 * 
 * end multer
 * 
*/

let createIssue = (req, res)=>{
    
    //function to find who is creating the issue
    let findCreator =() =>{
        return new Promise((resolve, reject)=>{
            UserModel.findOne({userId: req.body.userId || req.query.userId}, (err, userDetails)=>{
                if(err){
                    logger.error(err.message, ' recordsController: createIssue, findCreator', 8)
                    let apiResponse = response.generate(true, "Failed to Save to user", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(userDetails)){
                    logger.error("No User Found", ' recordsController: createIssue, findCreator', 8)
                    let apiResponse = response.generate(true, "No User Found", 404, null)
                    reject(apiResponse)
                } else {
                    resolve(userDetails)
                }
            })
        })
    } // end save to user

    //function to create the issue
    let createNewRecord = (userDetails) =>{
        return new Promise((resolve, reject)=>{
            
            upload.single('screenshots')
            let newIssue = new RecordModel({
                title: req.body.title,
                description: req.body.description,
                issueLocation: req.body.issueLocation,
                reportedBy: userDetails.firstName+' '+userDetails.lastName, 
                issueId: shortid.generate(),
                issueCreatedOn: time.now(),
                assignee: req.body.assignee,
                screenshot: req.file
            })
            newIssue.status.open = true
            let issueType = (req.body == undefined || req.body.issueType == null || req.body.issueType == '')? []: req.body.issueType.split(',')
            newIssue.issueType = issueType

            let watchers = (req.body == undefined || req.body.watchers == null || req.body.watchers == '')? []: req.body.watchers.split(',')
            newIssue.watchers = watchers

            newIssue.save((err, issueDetails)=>{
                if(err){
                    logger.error(err.message, ' recordsController, createIssue, createNewRecord', 8)
                    let apiResponse = response.generate(true, "Failed To Create Issue", 500, null)
                    reject(apiResponse)
                } else {
                    resolve(issueDetails)
                }
            })
        })
    } // end create new record

    findCreator(req, res)
        .then(createNewRecord)
        .then((resolve)=>{
            let apiResponse = response.generate(false, "Issue Created Successfully", 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            console.log("Some Error occured")
            res.send(err)
        })
} // end create new issue

/**
let addScreenshot = (req, res)=>{
    upload.single('screenshots')
    let newScreenshot = new ScreenshotModel({
        screenshots: req.file,
        issueId: req.body.issueId,
        imageId: shortid.generate(),
        createdOn: time.now()
    })

    newScreenshot.save((err, result)=>{
        if(err){
            logger.error(err, "recordsController: addscreenshot", 6)
            let apiResponse = response.generate(true, "Failed to add screenshot", 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(result)){
            logger.error("No Screenshot attached to save", "recordsController: addscreenshot", 6)
            let apiResponse = response.generate(true, "No Screenshot attached to save", 404, null)
            res.send(apiResponse)
        }else {
            let apiResponse = response.generate(false, "Screenshot attached", 200, result)
            res.send(apiResponse)
        }
    })
} // end add screenshot

 
let deleteScreenshot = (req, res) =>{
    
    let findCurrentIssue = () =>{
        return new Promise((resolve, reject)=>{
            RecordModel.findOne({issueId: req.body.issueId}, (err, issueDetails)=>{
                if(err){
                    logger.error(err.message, ' recordsController: deleteScreenshot, findCurrentIssue', 8)
                    let apiResponse = response.generate(true, "Failed to Delete Screenshot", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(issueDetails)){
                    logger.error("No issue Found", ' recordsController: deleteScreenshot, findCurrentIssue', 8)
                    let apiResponse = response.generate(true, "No issue Found", 404, null)
                    reject(apiResponse)
                } else {
                    resolve(issueDetails.issueId)
                }
            })

        })
    } // end find current issue

    let findCurrentScreenshot = (id) =>{
        return new Promise((resolve, reject)=>{
            ScreenshotModel.find({issueId: req.body.issueId}, (err, screenshots)=>{
                if(err){
                    logger.error(err.message, ' recordsController: deleteScreenshot, deleteCurrentScreenshot', 8)
                    let apiResponse = response.generate(true, "Failed to Delete Screenshot", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(screenshots)){
                    logger.error("No Screenshot Found", ' recordsController: deleteScreenshot, deleteCurrentScreenshot', 8)
                    let apiResponse = response.generate(true, "No Screenshot Found", 404, null)
                    reject(apiResponse)
                } else {
                    resolve(screenshots)
                }
            })
        })
    } // end find current screenshot

    let deleteCurrentScreenshot = (screenshotDetails) =>{
        return new Promise((resolve, reject)=>{
            ScreenshotModel.findOneAndDelete({imageId: req.imageId}, (err, result)=>{
                if(err){
                    logger.error(err.message, ' recordsController: deleteScreenshot, deleteCurrentScreenshot', 8)
                    let apiResponse = response.generate(true, "Failed to Delete Screenshot", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(result)){
                    logger.error("No Screenshot Found", ' recordsController: deleteScreenshot, deleteCurrentScreenshot', 8)
                    let apiResponse = response.generate(true, "No Screenshot Found", 404, null)
                    reject(apiResponse)
                } else {
                    console.log(result.path)
                    resolve(result)
                }
            })
        })
    } // end find current screenshot

    findCurrentIssue()
        .then(findCurrentScreenshot)
        .then(deleteCurrentScreenshot)
        .then((resolve)=>{
            let apiResponse = response.generate(false, "Screenshot Deleted", 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            res.send(err)
            console.log(err)
        })

} // end delete screenshot

*/
let editIssue = (req, res)=>{

    //function to find the user's specific issue that needs to be edited
    let findIssue = () =>{
        return new Promise((resolve, reject)=>{
                RecordModel.findOne({issueId: req.body.issueId}, (err, issueDetails)=>{
                        if(err){
                            logger.error(err.message, ' recordsController: editIssue, findIssue', 8)
                            let apiResponse = response.generate(true, "Failed to find the issue", 500, null)
                            reject(apiResponse)
                        } else if(check.isEmpty(issueDetails)){
                            logger.error("No Issue Found", ' recordsController: editIssue, findIssue', 8)
                            let apiResponse = response.generate(true, "No Issue Found", 404, null)
                            reject(apiResponse)
                        } else {
                            resolve(issueDetails.issueId)
                        }
                })
        })
    } // end edit user issue

    // function to edit the issue
    let editUserIssue = (id) =>{
        return new Promise((resolve, reject)=>{
            let options = req.body
            RecordModel.update({issueId: id}, options, {multi: true}, (err, editedIssue)=>{
                if(err){
                    logger.error(err.message, ' recordsController: editIssue, editUserIssue', 8)
                    let apiResponse = response.generate(true, "Failed to Edit the Issue", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(editedIssue)){
                    logger.error("No Issue Found", ' recordsController: editIssue, editUserIssue', 8)
                    let apiResponse = response.generate(true, "No Issue Found", 404, null)
                    reject(apiResponse)
                } else {
                    resolve(editedIssue)
                }
            })
        })
    }// 

    findIssue(req, res)
        .then(editUserIssue)
        .then((resolve)=>{
            console.log("Issue Edited Successfully")
            let apiResponse = response.generate(false, "Issue Edited Successfully", 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            console.log("Some Error occured")
            res.send(err)
        })
} // end edit issue

let deleteIssue = (req, res)=>{
    //function to find the particular user
    let findUser = () =>{
        return new Promise((resolve, reject)=>{
            UserModel.findOne({userId: req.body.userId || req.params.userId}, (err, userDetails)=>{
                if(err){
                    logger.error(err.message, ' recordsController: deleteIssue, findUser', 8)
                    let apiResponse = response.generate(true, "Failed to Find the User", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(userDetails)){
                    logger.error("No User Found", ' recordsController: deleteIssue, findUser', 8)
                    let apiResponse = response.generate(true, "No User Found", 404, null)
                    reject(apiResponse)
                } else {
                    resolve(userDetails)
                }
            })
        })
    } // end find user

    //function to find the user's specific issue that needs to be edited
    let findIssue = (userDetails) =>{
        return new Promise((resolve, reject)=>{
                RecordModel.findOne({issueId: req.body.issueId}, (err, issueDetails)=>{
                    if(err){
                        logger.error(err.message, ' recordsController: deleteIssue, findIssue', 8)
                        let apiResponse = response.generate(true, "Failed to find the issue", 500, null)
                        reject(apiResponse)
                    } else if(check.isEmpty(issueDetails)){
                        logger.error("No Issue Found", ' recordsController: deleteIssue, findIssue', 8)
                        let apiResponse = response.generate(true, "No Issue Found", 404, null)
                        reject(apiResponse)
                    } else {
                        if(userDetails.firstName+' '+userDetails.lastName === issueDetails.reportedBy){
                            resolve(issueDetails.issueId)
                        } else {
                            logger.error("Cannot delete other user created issue", ' recordsController: deleteIssue, findIssue', 8)
                            let apiResponse = response.generate(true, "Cannot delete other user created issue", 404, null)
                            reject(apiResponse)
                        }
                    }
                })
        })
    } // end edit user issue

    let deleteUserIssue = (id) =>{
        return new Promise((resolve, reject)=>{
            RecordModel.deleteOne({issueId: id}, (err, result)=>{
                if(err){
                    logger.error(err.message, ' recordsController: deleteIssue', 8)
                    let apiResponse = response.generate(true, "Failed to Delete the issue", 500, null)
                    reject(apiResponse)
                } else if(check.isEmpty(result)){
                    logger.error("No Issue Found", ' recordsController: deleteIssue', 8)
                    let apiResponse = response.generate(true, "No Issue Found", 404, null)
                    reject(apiResponse)
                } else {
                    resolve(result)
                }
            })
        })
    }// 

    findUser(req, res)
        .then(findIssue)
        .then(deleteUserIssue)
        .then((resolve)=>{
            console.log("Issue Deleted Successfully")
            let apiResponse = response.generate(false, "Issue Deleted Successfully", 200, resolve)
            res.send(apiResponse)
        })
        .catch((err)=>{
            console.log(err)
            console.log("Some Error occured")
            res.send(err)
        })
} // end delete issue

//function to get only 10 issues 
let getPaginatedIssues = (req, res)=>{
    RecordModel.find()
    .select('-_id -__v -sanTracker')
    .sort('-issueCreatedOn')
    .skip(parseInt(req.query.skip) || 0)
    .lean()
    .limit(10)
    .exec((err, allIssues)=>{
        if(err){
            logger.error(err.message, 'recordController: getPaginatedIssues', 7)
            let apiResponse = response.generate(true, `Failed to get All Issues: ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(allIssues)){
            logger.error('No Issues Found', 'recordController: getPaginatedIssues', 7)
            let apiResponse = response.generate(true, "No Issue Found", 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, "All Issues Found", 200, allIssues)
            res.send(apiResponse)
        }
    })
} // end get paginated issues

let getAllIssue = (req, res)=>{
    RecordModel.find()
        .select('-issueCreatedOn')
        .exec((err, allIssues)=>{
            if(err){
                logger.error(err.message, 'recordController: getAllIssue', 7)
                let apiResponse = response.generate(true, `Failed to get All Issues: ${err.message}`, 500, null)
                res.send(apiResponse)
            } else if(check.isEmpty(allIssues)){
                logger.error('No Issues Found', 'recordController: getAllIssue', 7)
                let apiResponse = response.generate(true, "No Issue Found", 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, "All Issues Found", 200, allIssues)
                res.send(apiResponse)
            }
        })
} // get all issues

let getParticularUserIssues = (req, res)=>{
    RecordModel.find({reportedBy: req.params.fullName || req.query.fullName || req.body.fullName}, (err, currentUserIssue)=>{
        if(err){
            logger.error(err.message, ' recordsController: getParticularUserIssues', 6)
            let apiResponse = response.generate(true, 'Failed to find current User', 500, null)
            res.send(apiResponse)
        }else if(check.isEmpty(currentUserIssue)){
            logger.error('No User created Issue found', ' recordsController: getParticularUserIssues', 6)
            let apiResponse = response.generate(true, 'No User created Issue found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All User Created issue found', 200, currentUserIssue)
            res.send(apiResponse)
        }
    })

} // end get particular user's All issue

let viewSingleIssue = (req, res)=>{
    RecordModel.findOne({issueId: req.params.issueId}, (err, currentUserIssue)=>{
        if(err){
            logger.error(err.message, ' recordsController: getParticularUserIssues', 6)
            let apiResponse = response.generate(true, 'Failed to find issue', 500, null)
            res.send(apiResponse)
        }else if(check.isEmpty(currentUserIssue)){
            logger.error('No Issue Records found', ' recordsController: getParticularUserIssues', 6)
            let apiResponse = response.generate(true, 'No Issue Records found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Issue Record found', 200, currentUserIssue)
            res.send(apiResponse)
        }
    })
} // end get single issue


module.exports = {
    createIssue: createIssue,
    editIssue: editIssue,
    deleteIssue: deleteIssue,
    getPaginatedIssues: getPaginatedIssues,
    getAllIssue: getAllIssue,
    getParticularUserIssues: getParticularUserIssues,
    viewSingleIssue: viewSingleIssue,
    multerUpload: upload
}