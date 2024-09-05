const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        // validate: {
        //     validator: function (v) {
        //         return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%^&*])[^\s]{8,}$/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid password!`
        // }
    },
    token: {
        type: String,
    }
})
module.exports = {
    userSchema
}