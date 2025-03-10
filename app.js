const express = require('express')
const passport = require('passport')
const path = require('node:path')
const { Pool } = require('pg')
const session = require('express-session')
const indexRouter = require('./routes/indexRouter')
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
        maxAge: 20 * 1000
    }
}))
app.use(passport.session())
app.use(express.urlencoded({ extended: false }))

app.get('/sign-up', (req, res) => {
    res.render('signup')
})
app.post("/sign-up", async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.pw, 10);
        await pgPool.query("insert into users (firstname, lastname, email, password) values ($1, $2, $3, $4)", [req.body.firstName, req.body.lastName, req.body.userMail, hashedPassword]);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        next(error);
    }
});   

app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/404'
}))

app.get('/', (req, res) => {
    res.render('index')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})