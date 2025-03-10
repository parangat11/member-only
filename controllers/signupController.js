const signupGet = (req, res) => {
    res.render('signup')
}

const signupPost = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.pw, 10)
        await pgPool.query('insert into users (firstname, lastname, email, password) values ($1, $2, $3, $4)', [req.body.firstName, req.body.lastName, req.body.userMail, hashedPassword])
        res.redirect('/')
    } catch (error) {
        console.error(error)
        next(error)
    }
}

module.exports = {
    signupGet,
    signupPost
}