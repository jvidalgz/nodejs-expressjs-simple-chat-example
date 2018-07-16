const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const users = require('./data/users')
const _ = require('lodash')

passport.use(new LocalStrategy(function (username, password, done) {
    const user = _.find(users, u => u.name === username)

    if (!user || user.password !== password) {
        done(null, false)
        return
    }
    done(null, user)

}))

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})