const _ = require('lodash')
const express = require('express')
const bcrypt = require('bcrypt')
const { User, validate } = require('../module/user')
const auth = require('../midware/auth')
const router = express.Router()

router.get('/', async (req, res) => {
    const users = await User.find().sort('date')
    res.send(users)
})
router.get('/:id', (req, res) => {
    res.send('个人信息')
})

router.post('/', async (req, res) => {
    //Joi数据验证
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    //查重
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("此邮箱已经注册过了")
    //创建
    user = new User(_.pick(req.body, [
        'userName',
        'email',
        'password',
    ]))
    //加密密码
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    const token = user.generateAuthToken()
    //返回token
    res
        .header('x-auth-token', token)
        .header('access-control-expose-headers', 'x-auth-token')
        .send(_.pick(user, ["_id", "userName", "email", 'sex']))
})

router.put("/:id", auth, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            cart: req.body.cart,
        }, { new: true })
        res.send("成功！")
    }
    catch (ex) {
        return res.status(404).send('指定ID的用户不存在.')
    }
})

router.delete('/:id', (req, res) => {
    res.send('删除用户')
})

module.exports = router