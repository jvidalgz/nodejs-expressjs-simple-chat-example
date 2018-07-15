const express = require('express')
let rooms = require("./data/rooms.json")
let messages = require("./data/messages")
const router = express.Router()
const _ = require('lodash')
const uuid = require('node-uuid')
module.exports = router


router.get('/rooms', function (req, res) {
    res.json(rooms)
})

router.route('/rooms/:roomId/messages').get(function (req, res) {
    const roomId = req.params.roomId
    const roomMessages = messages.filter(m => m.roomId == roomId)

    const room = _.find(rooms, r => r.id === roomId)
    if (!room) {
        console.log('no hay room');
        res.sendStatus(404)
        return
    }
    res.json({
        room: room,
        messages: roomMessages
    })

}).post(function (req, res) {
    const roomId = req.params.roomId
    console.log(roomId)
    const message = {
        roomId: roomId,
        text: req.body.text,
        userId: '293847asjc',
        id: uuid.v4()
    }
    console.log(message)
    messages.push(message)
    res.sendStatus(200)
}).delete(function (req, res) {
    const roomId = req.params.roomId;
    messages = messages.filter(m => m.roomId !== roomId);
    res.sendStatus(200);
});
