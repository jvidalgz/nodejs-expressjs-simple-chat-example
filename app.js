const express = require('express')
const app = express()

// middleware para retornar archivos estáticos (http://expressjs.com/es/starter/static-files.html)
app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist'))

app.get('/hola', function(req, res){
  res.send('Hola desde expressjs')
})

app.listen(3000, function(){
  console.log('App listening en puerto 3000');
})
