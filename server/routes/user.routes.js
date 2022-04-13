const express = require('express');
const UserRouter = express.Router();
const UserController = require('../controllers/user.controller');

UserRouter.post('/register', UserController.register);
UserRouter.post('/login', UserController.login);
UserRouter.post('/authorize', UserController.authorize);

module.exports = UserRouter;
