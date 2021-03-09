const _ = require('lodash')
const express = require('express')
const { Order, validate } = require('../module/order')
const auth = require('../midware/auth')
const { Item } = require('../module/item')
const router = express.Router()

router.get('/:id', auth, async (req, res) => {
    const item = await Order
        .find({ customer: req.params.id })
        .populate('customer', 'userName email -_id')
        .populate('item', 'name type describe price img state ')
        .sort('orderDate')


    res.send(item)
})
router.get('/:id/mightlike', auth, async (req, res) => {
    const order = await Order
        .find({ customer: req.params.id })
        .populate('item', 'type -_id')

    let mightLike = []
    let type = []
    for (let o of order) {
        type.push(o.item.type)

    }
    let uniqueType = Array.from(new Set(type))
    for (type of uniqueType) {
        const sameType = await Item.find({ type })
        mightLike.push(sameType)
    }
    res.send(mightLike)
})


router.post('/', async (req, res) => {
    //Joi数据验证
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    //创建
    let order = new Order(_.pick(req.body, [
        'customer',
        'item',
        'number',
        'state'
    ]))
    await order.save()
    res.send(_.pick(order, ['customer', 'item', 'number', 'state']))
})


module.exports = router