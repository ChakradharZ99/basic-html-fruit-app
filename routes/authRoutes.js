const express = require("express");
const authRouter = express.Router();
const {signin, login, logout} = require('../controllers/authControllers');

authRouter.post('/signin', signin);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

module.exports = authRouter;