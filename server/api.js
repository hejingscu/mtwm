const express = require('express')
const router = express.Router()
const db = require('./db')
const fn = () => {}

var checkUserIsExsit = function(postData){
  return db.User.findOne({ phone: postData.phone })
}

//用户模块api
router.post('/mtwm/user/register/exsit', (req, res) => {
  const postData = req.body
  //查询用户是否存在
  checkUserIsExsit(postData).then( isExsit => {
    if(!isExsit){
      res.json({exsit: false, description: "手机号可使用"})
    }else{
      res.json({exsit: true, description: "用户已存在"})
    }
  })
})
router.post('/mtwm/user/register', (req, res) => {
  const postData = req.body
  postData.registerTime = new Date().getTime()
  //查询用户是否存在
  checkUserIsExsit(postData).then( isExsit => {
    if(!isExsit){
      db.User.create(postData, (err, doc) => {
        if (err) {
          console.log(err)
        } else if (doc) {
          res.send(JSON.stringify(doc))
        }
      })
    }else{
      res.json({exsit: true, description: "用户已存在"})
    }
  })
})
router.post('/mtwm/user/login', (req, res) => {
  const postData = req.body
  postData.registerTime = new Date().getTime()
  //查询用户是否存在
  checkUserIsExsit(postData).then( isExsit => {
    if(!isExsit){
      res.json({code: 2, description: "用户不存在"})
    }else{
      if(postData.password !== isExsit.password){
        res.json({code: 1, description: "密码错误"})
        return false
      }
      req.session.phone = isExsit.phone;
      res.json({code: 0, description: "登录成功"})
    }
  })
})

//店铺api
//店铺列表
router.get('/mtwm/shop', (req, res) => {
  var params = null;
  //分页请求
  var indexNum = parseInt(req.query.pageSize)*(parseInt(req.query.pageIndex-1)),
      pageSize = parseInt(req.query.pageSize),
      rank = '' || req.query.rank

  delete req.query.pageSize;delete req.query.pageIndex;
  req.query == {} ? (params = null) : (params = req.query)
  //根据id查询的特殊情况
  if(req.query.id){params._id = req.query.id;delete params.id;}
  console.log(params)
  db.Shop.find(params, 'name updateTime icon priceStart score discount', (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(JSON.stringify(doc))
    }
  }).limit(pageSize).skip(indexNum).sort({priceStart:1})
})
//店铺管理
router.post('/mtwm-admin/shop/add', (req, res) => {
  const postData = req.body
  postData.updateTime = new Date().getTime()
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
  postData.updateTime = new Date().getTime()
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
//配置商家信息
router.get('/mtwm/shop/manage/:id', (req, res) => {
  const id = req.param('id');
  console.log(id)
  db.Shop.find({_id: id}, 'priceStart score discount goods', (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      console.log(doc[0])
      res.send(doc[0])
    }
  })
})
router.put('/mtwm-admin/shop/manage/edit', (req, res) => {
  const postData = req.body
  const id = req.body._id;
  postData.updateTime = new Date().getTime()
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
//添加商品
router.post('/mtwm-admin/shop/manage/goods/add/:shopid', (req, res) => {
  const postData = req.body
  const shopid = req.param('shopid');
  postData.updateTime = new Date().getTime()
  db.Shop.find({_id: shopid}, 'goods' ,(err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      console.log(doc)
      doc[0].goods.push(postData)
    }
  })
})

//banner管理
router.get('/mtwm/banner', (req, res) => {
  var params = null;
  //分页请求
  var indexNum = parseInt(req.query.pageSize)*(parseInt(req.query.pageIndex-1));
  var pageSize = parseInt(req.query.pageSize);
  delete req.query.pageSize;delete req.query.pageIndex;
  req.query == {} ? (params = null) : (params = req.query)
  //根据id查询的特殊情况
  if(req.query.id){params._id = req.query.id;delete params.id;}
  db.Banner.find(params, 'img updateTime remark', (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(JSON.stringify(doc))
    }
  }).limit(pageSize).skip(indexNum)
})
router.post('/mtwm-admin/banner/add', (req, res) => {
  const postData = req.body
  postData.updateTime = new Date().getTime()
  db.Banner.create(postData, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(JSON.stringify(doc))
    }
  })
})
router.put('/mtwm-admin/banner/edit', (req, res) => {
  const postData = req.body
  const id = req.body._id;
  postData.updateTime = new Date().getTime()
  delete postData._id;
  db.Banner.update({_id: id},postData, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      console.log(doc)
      res.send(JSON.stringify(doc))
    }
  })
})
router.delete('/mtwm-admin/banner/delete/:id', (req, res) => {
  const id = req.param('id');
  db.Banner.remove({_id: id}, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(JSON.stringify(doc))
    }
  })
})


//类目管理
router.get('/mtwm/category', (req, res) => {
  var params = null;
  //分页请求
  var indexNum = parseInt(req.query.pageSize)*(parseInt(req.query.pageIndex-1));
  var pageSize = parseInt(req.query.pageSize);
  delete req.query.pageSize;delete req.query.pageIndex;
  req.query == {} ? (params = null) : (params = req.query)
  //根据id查询的特殊情况
  if(req.query.id){params._id = req.query.id;delete params.id;}
  db.Category.find(params, 'icon updateTime name', (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(JSON.stringify(doc))
    }
  }).limit(pageSize).skip(indexNum)
})
router.post('/mtwm-admin/category/add', (req, res) => {
  const postData = req.body
  postData.updateTime = new Date().getTime()
  db.Category.create(postData, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(JSON.stringify(doc))
    }
  })
})
router.put('/mtwm-admin/category/edit', (req, res) => {
  const postData = req.body
  const id = req.body._id;
  postData.updateTime = new Date().getTime()
  delete postData._id;
  db.Category.update({_id: id},postData, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      console.log(doc)
      res.send(JSON.stringify(doc))
    }
  })
})
router.delete('/mtwm-admin/category/delete/:id', (req, res) => {
  const id = req.param('id');
  db.Category.remove({_id: id}, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(JSON.stringify(doc))
    }
  })
})

module.exports = router
