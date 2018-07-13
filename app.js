const express = require('express')
const app = express()
let rooms = require("./data/rooms.json")
const bodyParser = require('body-parser')
const uuid = require('node-uuid')
const _ = require('lodash')
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
app.get('/admin/rooms/edit/', function(req, res){
    res.render('edit')
})

app.post('/admin/rooms/add', function(req, res){
    const room = {
        name: req.body.name,
        id: uuid.v4()
    }
    rooms.push(room)

    res.redirect('/admin/rooms')
})

app.post('/admin/rooms/edit/:id', function(req, res){
    const roomId = req.params.id
    if(!room) {
        res.sendStatus(404)
        return
    }
    let room = _.find(rooms, r => r.id === roomId)
    room.name= req.body.name


    res.redirect('/admin/rooms')
})

app.get('/admin/rooms/delete/:id', function(req, res){
    const roomId = req.params.id
    rooms = rooms.filter(r => r.id !== roomId)
    res.redirect('/admin/rooms')
})

app.get('/admin/rooms/edit/:id', function(req, res){
    const roomId = req.params.id
    const room = _.find(rooms, r => r.id === roomId)
    if(!room) {
        res.sendStatus(404)
        return
    }
    res.render('edit', {room})
})



app.listen(3000, function(){
  console.log('App listening en puerto 3000');
})
