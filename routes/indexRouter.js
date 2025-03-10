const { Router } = require('express')
const indexController = require('../controllers/indexController')
const indexRouter = Router()

indexRouter.get('/', indexController.indexGet)

module.exports = indexRouter