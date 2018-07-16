const express = require('express')
const passport = require('passport')
const users = require('./data/users')

const router = express.Router()
module.exports = router

router.get('/login', function (req, res) {
    // en ambiente dev, inicia sesion automáticamente
    if (req.app.get('env') === 'development') {
        const user = users[0]
        req.login(user, function (err) {
            if (err) {
                return next(err)
            }
            return res.redirect('/')
        })
        return
    }
    // caso contrario (!= dev) muestra formulario de inicio de sesion
    res.render('login.pug')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

router.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/login')
})