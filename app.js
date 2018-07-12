const express = require('express')
const app = express()
var rooms = require("./data/rooms.json")
app.set('views', './views')
app.set('view engine', 'pug')
// middleware para retornar archivos estáticos (http://expressjs.com/es/starter/static-files.html)
app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist'))

app.get('/', function(req, res){
    res.render('index')
})

app.get('/admin/rooms', function(req, res){
  res.render('rooms', {
      title: 'Admin Rooms',
      rooms:rooms
  })
})

app.listen(3000, function(){
  console.log('App listening en puerto 3000');
})
