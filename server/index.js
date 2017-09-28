
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const db = require('./db')
const api = require('./api')

const app = express()
// const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

app.set('port', (process.env.port || 3000))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors({
    origin:['http://localhost:8001','http://localhost:8002','http://10.200.4.140:8001','http://10.200.4.140:8002','http://10.200.4.140'],
    methods:['GET','POST','PUT','DELETE'],
    alloweHeaders:['Content-Type','Content-Length', 'Authorization', 'Accept','X-Requested-With']
}));
app.use(api)

app.post('/api/setup', function (req, res) {
  new db.User(req.body)
    .save()
    .then(() => {
      res.status(200).end()
      db.initialized = true
    })
    .catch(() => res.status(500).end())
})

// app.get('*', function (req, res) {
//   const fileName = db.initialized ? 'index.html' : 'index.html'
//   const html = fs.readFileSync(resolve('../' + fileName), 'utf-8')
//   // const html = fs.readFileSync(resolve('../setup.html'), 'utf-8')
//   res.send(html)
// })

app.listen(app.get('port'), function () {
  console.log('Visit http://localhost:' + app.get('port'))
})
