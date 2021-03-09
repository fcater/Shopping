const mongoose = require('mongoose')
const express = require("express")
const users = require('./routs/users')
const items = require('./routs/items')
const orders = require('./routs/orders')
const auth = require('./routs/auth')
const app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
//设置传输文件的最大值为50mb

//设置允许跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-auth-token,Content-Type,Access-Token,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});


app.use(express.json())
app.use('/api/users', users)
app.use('/api/items', items)
app.use('/api/orders', orders)
app.use('/api/auth', auth)

mongoose.set('useFindAndModify', false)//findandmodify打开
mongoose.connect("mongodb://localhost/shop-demo", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("正在连接数据库"))
    .catch((err) => console.log("无法连接数据库", err))

app.listen(5000, () => { console.log('正在监听5000端口'); })