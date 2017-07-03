const express = require('express')
const router = express.Router()
const db = require('./db')
const fn = () => {}

//店铺api
//店铺列表
router.get('/mtwm/shop/list', (req, res) => {
  var params = null;
  //分页请求
  var indexNum = parseInt(req.query.pageSize)*(parseInt(req.query.pageIndex-1));
  var pageSize = parseInt(req.query.pageSize);
  delete req.query.pageSize;delete req.query.pageIndex;
  req.query == {} ? (params = null) : (params = req.query)
  //根据id查询的特殊情况
  if(req.query.id){params._id = req.query.id;delete params.id;}
  db.Shop.find(params, 'name', (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(JSON.stringify(doc))
    }
  }).limit(pageSize).skip(indexNum)
})
//添加店铺
router.post('/mtwm-admin/shop/add', (req, res) => {
  const postData = req.body
  db.Shop.create(postData, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(JSON.stringify(doc))
    }
  })
})

router.put('/mtwm-admin/shop/edit', (req, res) => {
  const postData = req.body
  const id = req.body._id;
  delete postData._id;
  db.Shop.update({_id: id},postData, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      console.log(doc)
      res.send(JSON.stringify(doc))
    }
  })
})


router.delete('/mtwm-admin/shop/delete/:id', (req, res) => {
  const id = req.param('id');
  db.Shop.remove({_id: id}, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(JSON.stringify(doc))
    }
  })
})


module.exports = router
