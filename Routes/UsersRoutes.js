import express from 'express';
import { getUsersController, updateUsersController } from '../Controllers/UsersControllers.js';


const usersRoutes = express.Router()

usersRoutes.get('/', getUsersController)
// usersRoutes.post('/', addUserController)
usersRoutes.put('/', updateUsersController)
// usersRoutes.delete('/', deleteUserController)

export default usersRoutes