const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 10
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart: {
        type: Array,
        default: []
    },
    registrationrDate: {
        type: Date,
        default: Date.now
    },
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        userName: this.userName,
        registrationrDate: this.registrationrDate,
        isAdmin: this.isAdmin,
        cart: this.cart,
    }, "secretKey")
    return token
}

const User = mongoose.model('User', userSchema)

function validateUser(user) {
    const schema = Joi.object({
        userName: Joi.string().trim().min(3).max(10).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).max(255).required(),
        isAdmin: Joi.boolean(),
        cart: Joi.array(),
    })
    return schema.validate(user)
}

exports.User = User
exports.validate = validateUser