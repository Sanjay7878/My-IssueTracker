const socket = require('socket.io')
const mongoose = require('mongoose')
const events = require('events')
const shortid = require('shortid')
const eventEmitter = new events.EventEmitter()

//importing models
const CommentModel = mongoose.model('Comments')

//impoting library files
const tokenLib = require('./tokenLib')
const time = require('./timeLib')
const check = require('./check')


let setServer = (server) =>{

    let onlineUsers = []
    let allWatchers = []
    //creating connection
    let io =socket.listen(server)

    let myIo = io.of('')

    myIo.on('connection', (socket)=>{

        //handshaking with user
        /**
         * @api {listen} /verifyUser Verification the init user
         * @apiVersion 0.0.1
         * @apiGroup Listen 
         *@apiDescription This event <b>("verify-user")</b> has to be listened on the user's end to verify user
        */
        socket.emit('verifyUser', "")

        // code to verify the user and make him online
         /**
         * @api {emit} /set-user Setting user online
         * @apiVersion 0.0.1
         * @apiGroup Emit 
         *@apiDescription This event <b>("set-user")</b> has to be emitted when a user comes online.
         *@apiExample The following data has to be emitted
                        {
                            authToken: String
                        }
        */
        /**
         * @api {listen} /auth-error event
         * @apiVersion 0.0.1
         * @apiGroup Listen 
         *@apiDescription This event <b>("auth-error")</b>  has to be listened to know if any error has occurred on socket.
        */
        /**
         * @api {listen} /watcher-user-list event
         * @apiVersion 0.0.1
         * @apiGroup Listen 
         *@apiDescription This event <b>("watcher-user-list")</b>  has to be listened by all the user who subscribes to the watchers list.
        */
        socket.on('set-user', (authToken)=>{
            tokenLib.verifyWithoutSecretKey(authToken, (err, user)=>{
                if(err){
                    socket.emit('auth-error', {status: 500, error: "Please provide correct auth token"})
                } else {
                    let currentUser = user.data
                    //setting socket user-id
                    socket.userId = currentUser.userId
                    let userObj = {userId: currentUser.userId, fullName: currentUser.fullName}
                    onlineUsers.push(userObj)
                    //setting room name
                    socket.rooms = 'sanTracker'
                    //joining to group chat room
                    socket.join(socket.rooms)
                    socket.to(socket.rooms).broadcast.emit('watcher-user-list', allWatchers)
                }
            })
        }) //end of on set-user
        
         /**
         * @api {emit} /disconnect when user logout
         * @apiVersion 0.0.1
         * @apiGroup Emit 
         *@apiDescription This event <b>("disconnect")</b> has to be emitted when a user logout/closed the browser.
         *@apiExample The following data has to be emitted
         *
         {
           userId :string,
           fullName: string
         } 
        */
        socket.on('disconnect', ()=>{

            let removeIndexOfOnline = onlineUsers.map((user)=> {return user.userId}).indexOf(socket.userId)
            onlineUsers.splice(removeIndexOfOnline, 1)

            let removeIndexOfWathcer = allWatchers.map((user)=> {return user.userId}).indexOf(socket.userId)
            allWatchers.splice(removeIndexOfWathcer, 1)
            
            socket.to(socket.rooms).broadcast.emit('watcher-user-list', allWatchers)
            socket.leave(socket.rooms)
            socket.disconnect(true)

        })// end of on disconnect

        /**
         * @api {Listen} /new-comment when user posts new comments
         * @apiVersion 0.0.1
         * @apiGroup Listen 
         *@apiDescription This event <b>("new-comment")</b> has to be listened when Someone comments on a particular issue.
         *@apiExample The following data has to be listened
         *
         {
           comment: string
         }
        */
        socket.on('new-comment', (data)=>{
            data['commentId'] = shortid.generate()
            eventEmitter.emit('save-comment', data)
        }) // end of on new comment


        eventEmitter.on('save-comment', (data)=>{
            
            let newComment = new CommentModel({
                commentId: data.commentId,
                comment: data.comment,
                commentedBy: data.commentedBy,
                createdOn: time.now(),
                issueId: data.issueId
            })

            newComment.save((err, result)=>{
                if(err){
                    console.log(`Error occured: ${err}`)
                } else if(check.isEmpty(result)){
                    console.log("No Comments to be Saved")
                } else {
                    console.log("Comment saved")
                    console.log(result)
                }
            })
        }) // end on save-comment event

        /**
         * @api {emit} /notifications to notify changes to the watchers
         * @apiVersion 0.0.1
         * @apiGroup Emit 
         *@apiDescription This event <b>("notifications")</b> has to be emitted When Someone comments or makes changes to the issue, that the user is been added as watcher.
         *@apiExample The following data has to be emitted
         *
         {
           message: string
         }
        */
        socket.on('notifications', (data)=>{
            socket.to(socket.rooms).broadcast.emit('watcher-user-list', data)
        })

        /**
         * @api {emit} /notifyByName when someone comments or edites 
         * @apiVersion 0.0.1
         * @apiGroup Emit 
         *@apiDescription This event <b>("notifyByName")</b> has to be emitted when someone comments or edits the issue.
         *@apiExample The following data has to be emitted
         *
         {
           status :string,
           message: string,
           userName :string,
           info: string
        }
        */
        socket.on('notifyByName', (data)=>{
            setTimeout(()=>{
                eventEmitter.emit('changes-made', data)
            }, 2000)
            io.of('/').emit(data.userName, data)
        }) // end notify by name
        
    }) //end socket connection
} // end set server

module.exports = {
    setServer: setServer
}