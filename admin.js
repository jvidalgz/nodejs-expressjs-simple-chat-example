const uuid = require('node-uuid')
const _ = require('lodash')
const express = require('express')
let rooms = require("./data/rooms.json")

const router = express.Router()
module.exports = router

router.get('/rooms', function (req, res) {
    res.render('rooms', {
        title: 'Admin Rooms',
        rooms: rooms
    })
})

router.route('/rooms/add')
    .get(function (req, res) {
        res.render('add')
    })
    .post(function (req, res) {
        const room = {
            name: req.body.name,
            id: uuid.v4()
        }
        rooms.push(room)

        res.redirect(`${req.baseUrl}/rooms`)
})

router.get('/rooms/edit/', function (req, res) {
    res.render('edit')
})


router.route('/rooms/edit/:id')
    .get(function (req, res) {
        const roomId = req.params.id
        const room = _.find(rooms, r => r.id === roomId)
        if (!room) {
            res.sendStatus(404)
            return
        }
        res.render('edit', {room})
    }).post(function (req, res) {
        const roomId = req.params.id
        let room = _.find(rooms, r => r.id === roomId)
        if (!room) {
            res.sendStatus(404)
            return
        }
        room.name = req.body.name

        res.redirect(`${req.baseUrl}/rooms`)
})

router.get('/rooms/delete/:id', function (req, res) {
    const roomId = req.params.id
    rooms = rooms.filter(r => r.id !== roomId)
    res.redirect(`${req.baseUrl}/rooms`)
})
