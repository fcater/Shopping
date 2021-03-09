const _ = require('lodash')
const express = require('express')
const { Item, validate } = require('../module/item')
const router = express.Router()

router.get('/', async (req, res) => {
    const items = await Item.find().sort('date')
    res.send(items)
})

router.get('/:id', async (req, res) => {
    const items = await Item.find({ owner: req.params.id }).sort('date')
    res.send(items)
})

router.post('/', async (req, res) => {
    //Joi数据验证
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    //创建
    let item = new Item(_.pick(req.body, [
        'owner',
        'name',
        'type',
        'describe',
        'stock',
        'price',
        'discount',
        'img'
    ]))
    await item.save()
    //返回创建结果
    res.send(_.pick(item, ["name", 'type', "describe", "stock", 'price', 'sales', 'discount', 'img']))
})

module.exports = router