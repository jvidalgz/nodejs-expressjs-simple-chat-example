const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const passport = require('passport')
require('./passport-init')

app.set('views', './views')
app.set('view engine', 'pug')
app.use(require('./logging'))
// middleware para retornar archivos estáticos (http://expressjs.com/es/starter/static-files.html)
app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap3/dist'))
app.use(express.static('node_modules/jquery/dist'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(require('express-session')({
    secret: 'keyboard cat', resave: false, saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

const authRouter = require('./auth')
app.use(authRouter)


app.use(function(req, res, next){
    if(req.isAuthenticated()) {
        res.locals.user = req.user
        next()
        return
    }
    res.redirect('/login')
})

app.get('/', function(req, res){
    res.render('home')
})


const adminRouter = require('./admin')
app.use('/admin', adminRouter)

const apiRouter = require('./api')
app.use('/api', apiRouter)

app.listen(3000, function(){
  console.log('App listening en puerto 3000');
})
