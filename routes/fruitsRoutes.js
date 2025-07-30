const express = require("express");
const fruitRouter = express.Router();
const {addFruits, getFruits} = require('../controllers/fruitsController');

fruitRouter.get('/', getFruits);
fruitRouter.post('/add', addFruits);

module.exports = fruitRouter;