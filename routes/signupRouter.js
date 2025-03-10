const { Router } = require('express')
const signupController = require('../controllers/signupController')
const signupRouter = Router()

signupRouter.get('/', signupController.signupGet)
signupRouter.post('/', signupController.signupPost)

module.exports = signupRouter