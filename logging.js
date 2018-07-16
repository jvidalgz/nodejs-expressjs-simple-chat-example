const fs =  require('fs')
const accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

module.exports = require('morgan')('combined', {stream: accessLogStream})