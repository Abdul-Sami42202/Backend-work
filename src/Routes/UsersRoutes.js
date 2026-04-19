const express = require('express');
const { getUsersController, updateUsersController } = require('../Controllers/UsersControllers');


const usersRoutes = express.Router()

usersRoutes.get('/', getUsersController)
// usersRoutes.post('/', addUserController)
usersRoutes.put('/', updateUsersController)
// usersRoutes.delete('/', deleteUserController)

module.exports = usersRoutes