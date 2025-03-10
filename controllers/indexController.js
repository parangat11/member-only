const indexGet = (req, res) => {
    res.render('index', { user: req.user })
}

module.exports = {
    indexGet
}