const mongoose = require('mongoose')
const { userSchema } = require('../schemas/userSchema')
const { productSchema } = require('../schemas/productSchema')
// models
const userModel = mongoose.model("userCollection", userSchema)
const productModel = mongoose.model("productsCollection", productSchema)
module.exports = {
    userModel,
    productModel
}