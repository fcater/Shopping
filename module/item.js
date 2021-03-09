const mongoose = require('mongoose')
const Joi = require('joi')

const itemSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 10
    },
    type: {
        type: String,
        trim: true
    },
    describe: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    stock: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 1000
    },
    price: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 100000
    },
    sales: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    img: {
        type: String,
        trim: true
    },
    launchDate: {
        type: Date,
        default: Date.now
    },
})

const Item = mongoose.model('Item', itemSchema)

function validateItem(item) {
    const schema = Joi.object({
        owner: Joi.string().trim().min(0).max(50).required(),
        name: Joi.string().trim().min(3).max(10).required(),
        type: Joi.string().trim().min(3).max(10).required(),
        describe: Joi.string().min(3).max(255).required(),
        stock: Joi.number().min(0).max(1000).required(),
        price: Joi.number().min(0).max(100000).required(),
        sales: Joi.number().min(0).max(100000),
        discount: Joi.number(),
        img: Joi.string().trim().min(3).required()
    })
    return schema.validate(item)
}

exports.Item = Item
exports.validate = validateItem