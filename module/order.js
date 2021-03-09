const mongoose = require('mongoose')
const Joi = require('joi')

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    number: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    state: {
        type: String,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model('Order', orderSchema)

function validateOrder(order) {
    const schema = Joi.object({
        customer: Joi.string().trim().min(0).max(50).required(),
        item: Joi.string().trim().min(0).max(50).required(),
        number: Joi.number().min(1).max(100).required(),
        state: Joi.string().min(3).max(10).required(),
    })
    return schema.validate(order)
}


exports.Order = Order
exports.validate = validateOrder