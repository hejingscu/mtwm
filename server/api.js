const express = require('express')
const cookie = require('cookie-parser');
const router = express.Router()
var expressJwt = require("express-jwt");
const db = require('./db')
var jwt = require('jsonwebtoken');
const app = express()
const mongoose = require('mongoose')
const co = require('co')
mongoose.Promise = global.Promise;  
//app.use(expressJwt({secret: "secret"}).unless({path: ["/login"]}));

app.use(cookie())


//英雄列表
router.get('/wzny/hero/all', (req, res) => {
  db.Hero.find({}, 'name heroId mingwen chuzhuang heroType jineng', (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
        res.send({data: doc})
    }
  })
})


module.exports = router