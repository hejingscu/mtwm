const mongoose = require('mongoose')
const init = require('./init.json')
const Schema = mongoose.Schema

const ShopSchema = new Schema({
  name: String
})

// const userSchema = new Schema({
//   name: String,
//   pwd: String
// })

// const articleSchema = new Schema({
//   title: String,
//   date: Date,
//   content: String
// })

// const linkSchema = new Schema({
//   name: String,
//   href: String
// })

const Models = {
  // User: mongoose.model('User', userSchema),
  // Article: mongoose.model('Article', articleSchema),
  // Link: mongoose.model('Link', linkSchema),
  Shop: mongoose.model('Shop', ShopSchema),
  initialized: false
}

const initialize = function () {
  Models.Shop.find(null, function (err, doc) {
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
mongoose.connect('mongodb://127.0.0.1/mtwm')
// mongoose.set('debug', true)

const db = mongoose.connection

db.on('error', function () {
  console.log('Database connection error.')
})

db.once('open', function () {
  console.log('The database has connected.')
  initialize()
})

module.exports = Models