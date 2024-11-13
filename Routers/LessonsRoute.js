const express = require('express');
const controller=require ('../Controllers/LessonsController');
const lessonsRouter = express.Router();

lessonsRouter.get('/obtenerLeccion',controller.obtenerLeccion);


module.exports={
  lessonsRouter
}