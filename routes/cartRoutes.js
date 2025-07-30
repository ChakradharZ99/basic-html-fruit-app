const express = require("express");
const cartRouter = express.Router();
const {addToCart, getCart, removeFromCart} = require('../controllers/cartControllers');

cartRouter.get('/:user_id', getCart);
cartRouter.post('/add', addToCart);
cartRouter.delete('/:cart_id', removeFromCart);

module.exports = cartRouter;