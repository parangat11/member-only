const passport = require('passport')

const loginGet = (req, res) => {
    res.render('login')
}
// passport.authenticate itself returns a cb function that acts as a middleware.
const loginPost = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login-failure'
})

module.exports = {
    loginGet,
    loginPost
}