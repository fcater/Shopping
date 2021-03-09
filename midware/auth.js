const jwt = require('jsonwebtoken')

module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send('拒绝访问,没有提供令牌.')
    try {
        const decoded = jwt.verify(token, "secretKey")
        req.user = decoded
        next()
    }
    catch (ex) {
        return res.status(400).send('非法令牌.')
    }
}