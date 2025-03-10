const { Router } = require('express')
const logoutController = require('../controllers/logoutController')
const logoutRouter = Router()

logoutRouter.get('/', logoutController.logoutGet)


module.exports = logoutRouter