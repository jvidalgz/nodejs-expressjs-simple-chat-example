const express = require('express')
const app = express()
const rooms = require("./data/rooms.json")
const bodyParser = require('body-parser')
const uuid = require('node-uuid')
app.set('views', './views')
app.set('view engine', 'pug')
// middleware para retornar archivos estáticos (http://expressjs.com/es/starter/static-files.html)
app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res){
    res.render('index')
})

app.get('/admin/rooms', function(req, res){
  res.render('rooms', {
      title: 'Admin Rooms',
      rooms:rooms
  })
})

app.get('/admin/rooms/add', function(req, res){
    res.render('add')
})

app.post('/admin/rooms/add', function(req, res){
    const room = {
        name: req.body.name,
        id: uuid.v4()
    }
    rooms.push(room)

    res.redirect('/admin/rooms')
})


app.listen(3000, function(){
  console.log('App listening en puerto 3000');
})
