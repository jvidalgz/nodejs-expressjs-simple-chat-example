const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.set('views', './views')
app.set('view engine', 'pug')
// middleware para retornar archivos estáticos (http://expressjs.com/es/starter/static-files.html)
app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res){
    res.render('index')
})


const adminRouter = require('./admin')
app.use(adminRouter)


app.listen(3000, function(){
  console.log('App listening en puerto 3000');
})
