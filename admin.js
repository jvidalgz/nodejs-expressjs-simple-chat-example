const uuid = require('node-uuid')
const _ = require('lodash')
const express = require('express')
let rooms = require("./data/rooms.json")

const router = express.Router()
module.exports = router

router.get('/admin/rooms', function (req, res) {
    res.render('rooms', {
        title: 'Admin Rooms',
        rooms: rooms
    })
})

router.get('/admin/rooms/add', function (req, res) {
    res.render('add')
})
router.get('/admin/rooms/edit/', function (req, res) {
    res.render('edit')
})

router.post('/admin/rooms/add', function (req, res) {
    const room = {
        name: req.body.name,
        id: uuid.v4()
    }
    rooms.push(room)

    res.redirect('/admin/rooms')
})

router.post('/admin/rooms/edit/:id', function (req, res) {
    const roomId = req.params.id
    let room = _.find(rooms, r => r.id === roomId)
    if (!room) {
        res.sendStatus(404)
        return
    }
    room.name = req.body.name

    res.redirect('/admin/rooms')
})

router.get('/admin/rooms/delete/:id', function (req, res) {
    const roomId = req.params.id
    rooms = rooms.filter(r => r.id !== roomId)
    res.redirect('/admin/rooms')
})

router.get('/admin/rooms/edit/:id', function (req, res) {
    const roomId = req.params.id
    const room = _.find(rooms, r => r.id === roomId)
    if (!room) {
        res.sendStatus(404)
        return
    }
    res.render('edit', {room})
})
