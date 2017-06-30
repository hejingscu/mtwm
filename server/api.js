const express = require('express')
const router = express.Router()
const db = require('./db')
const fn = () => {}

//文章列表
router.get('/api/getArticles', (req, res) => {
  var params = null;
  //分页请求
  var indexNum = parseInt(req.query.pageSize)*(parseInt(req.query.pageIndex-1));
  var pageSize = parseInt(req.query.pageSize);
  delete req.query.pageSize;delete req.query.pageIndex;
  req.query == {} ? (params = null) : (params = req.query)
  //根据id查询的特殊情况
  if(req.query.id){params._id = req.query.id;delete params.id;}
  db.Article.find(params, 'title content', (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(JSON.stringify(doc))
    }
  }).limit(pageSize).skip(indexNum)
})

module.exports = router
