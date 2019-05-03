const mongoose = require('mongoose')

const Schema = mongoose.Schema

let newComment = new Schema({
    commentId: {type: String},
    comment: {type: String, default: ''},
    commentedBy : {type: String, default: ''},
    createdOn: {type: Date, default: Date.now()},
    seen: { type: Boolean, default: false},
    issueId: {type: String}
})

module.exports = mongoose.model('Comments', newComment)