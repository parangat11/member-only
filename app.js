const express = require('express')
const passport = require('passport')
const path = require('node:path')
const { Pool } = require('pg')
const session = require('express-session')
const indexRouter = require('./routes/indexRouter')
const LocalStrategy = require('passport-local').Strategy

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 20 * 1000
    }
}))
app.use(passport.session())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('hi')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})