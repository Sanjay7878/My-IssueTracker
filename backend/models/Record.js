const mongoose = require('mongoose')
const Schema = mongoose.Schema

const time = require('../libs/timeLib')

let newRecord =  new Schema(
    {
        title:{type: String, default: ''},
        issueType: [],
        description: {type: String},
        issueLocation: {type: String},
        reportedBy: {type: String},
        assignee: {type:String},
        issueId: {type: String, unique: true},
        issueCreatedOn: {type: Date, default: time.now()},
        status: {
            open: {type: Boolean, default: false},
            backlog: {type: Boolean, default: false},
            inProgress: {type: Boolean, default: false},
            inTest: {type: Boolean, default: false},
            closed: {type: Boolean, default: false}
        },
        screenshots: [],
        watchers: []
    }
)

module.exports = mongoose.model('Record', newRecord)