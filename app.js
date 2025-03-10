const express = require('express')
const passport = require('passport')
const path = require('node:path')
const { Pool } = require('pg')
const session = require('express-session')
const indexRouter = require('./routes/indexRouter')
const signupRouter = require('./routes/signupRouter')
const pgSession = require('connect-pg-simple')(session)
const bcrypt = require('bcryptjs')
require('./config/passport')

const pgPool = new Pool({
    connectionString: process.env.DATABASE_URL
})

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(session({
    secret: process.env.SECRET,
    store: new pgSession({
        pool: pgPool,
        tableName: 'session_data',
        createTableIfMissing: true
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
}))
app.use(passport.session())
app.use(express.urlencoded({ extended: false }))

app.use('/sign-up', signupRouter)   

app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login-failure'
}))

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err)
        }
        res.redirect('/')
    })
})

app.get('/', (req, res) => {
    res.render('index', { user: req.user })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})