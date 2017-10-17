const mongoose = require('mongoose')
const init = require('./init.json')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    phone: String,
    password: String,
    registerTime: Number
})

const ShopSchema = new Schema({
    name: String,
    updateTime: Number,
    icon: String,
    discount: String,//优惠
    priceStart: Number,//起送价
    score: Number,//评分
    goods: Array,
    categoryId: String,
    volume: Number//销量
})

const bannerSchema = new Schema({
    img: String,
    updateTime: Number,
    remark: String
})

const categorySchema = new Schema({
    icon: String,
    updateTime: Number,
    name: String
})

const shopcartSchema = new Schema({
    phone: String,
    info: String
})

const orderSchema = new Schema({
    phone: String,
    list: Array,
    totalAmount: Number,
    shopId: String
})

const Models = {
    User: mongoose.model('User', userSchema),
    Shop: mongoose.model('Shop', ShopSchema),
    Banner: mongoose.model('Banner', bannerSchema),
    Category: mongoose.model('Category', categorySchema),
    Shopcart: mongoose.model('Shopcart', shopcartSchema),
    Order: mongoose.model('Order', orderSchema),
    initialized: false
}

const initialize = function() {
    Models.Shop.find(null, function(err, doc) {
        if (err) {
            console.log(err)
        } else if (!doc.length) {
            console.log('Database opens for the first time...')
            Promise.all(init.map(item => new Models[item.type](item).save()))
                .then(() => console.log('Initialize successfully.'))
                .catch(() => console.log('Something went wrong during initializing.'))
        } else {
            Models.initialized = true
        }
    })
}



//mongoose.connect('mongodb://127.0.0.1/CMS2')
mongoose.connect('mongodb://127.0.0.1/mtwm',{useMongoClient: true})
    // mongoose.set('debug', true)

const db = mongoose.connection

db.on('error', function() {
    console.log('Database connection error.')
})

db.once('open', function() {
    console.log('The database has connected.')
    initialize()
})


module.exports = Models