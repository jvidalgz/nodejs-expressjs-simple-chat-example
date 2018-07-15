const express = require('express')
let rooms = require("./data/rooms.json")
const router = express.Router()
module.exports = router


router.get('/rooms', function (req, res) {
    res.json(rooms)
})