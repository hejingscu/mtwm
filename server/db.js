const mongoose = require('mongoose')
const init = require('./init.json')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise;


const heroSchema = new Schema({
    name: String,
    chuzhuang: Array,
    mingwen: String,
    heroId: String
})


const Models = {
    Hero: mongoose.model('Hero', heroSchema),
    initialized: false
}

const initialize = function() {
    Models.Hero.find(null, function(err, doc) {
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