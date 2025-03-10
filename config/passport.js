const passport = require('passport')
const pool = require('./pool')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy

const customFields = {
    usernameField: 'userMail',
    passwordField: 'pw'
}

passport.use(
    new LocalStrategy(customFields, async (username, password, done) => {
        try {
            const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [username])
            const user = rows[0]
            if(!user) {
                return done(null, false, { message: 'Incorrect username' })
            }
            const match = await bcrypt.compare(password, user.password)
            if(!match) {
                return done(null, false, { message: 'Incorrect password' })
            }
            return done(null, user)
        }
        catch(err) {
            return done(err)
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
        const user = rows[0]

        done(null, user)
    }
    catch(err) {
        done(err)
    }
})