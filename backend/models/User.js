const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema(
    {
        firstName: {type: String, default:' '},
        lastName: {type: String, default:' '},
        userId: {type: String, unique: true},
        dob: {type: Date},
        companyName: {type: String, default:' '},
        role: {type: String, default: ' '},
        mobileNumber: {type: Number,default: ' '},
        location: {type: String, default: ' '},
        email: {type: String, unique: true},
        password: {type: String, default: ' '},
        createdOn: {type: Date, default: Date.now()}
    }
)

module.exports = mongoose.model('User', userSchema)