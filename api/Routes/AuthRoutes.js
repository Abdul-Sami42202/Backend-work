const express = require('express');
const { signupController, loginController } = require('../Controllers/AuthControllers');

const authRoutes = express.Router()

authRoutes.post('/signup', signupController)
authRoutes.post('/login', loginController)

module.exports = authRoutes