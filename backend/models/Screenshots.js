const mongoose = require('mongoose')
const Schema = mongoose.Schema

const time = require('../libs/timeLib')

let screenshot = new Schema(
    {
        screenshots: {type: Array},
        imageId: {type: String, unique: true},
        issueId: {type: String},
        createdOn: {type: Date, default: time.now()}
    }
)

module.exports = mongoose.model('Screenshot', screenshot)