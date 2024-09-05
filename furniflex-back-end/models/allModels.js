const mongoose = require('mongoose')
const { userSchema } = require('../schemas/userSchema')
// models
const userModel = mongoose.model("userCollection", userSchema)
module.exports = {
    userModel
}