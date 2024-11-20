const express = require('express');
const controller = require ('../Controllers/trainModelControll');
const modelRouter = express.Router();

modelRouter.post('/entrenarModelo',controller.generateCsvWriter);


module.exports={
  modelRouter
}