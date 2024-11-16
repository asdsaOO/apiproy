const express = require('express');
const controller=require ('../Controllers/LessonsController');
const lessonsRouter = express.Router();

lessonsRouter.get('/obtenerLeccion',controller.obtenerLeccion);
lessonsRouter.post('/guardarLeccion',controller.guardarLeccion);
lessonsRouter.get('/listarLeccionesRealizadas',controller.listarLeccionesRealizadas);


module.exports={
  lessonsRouter
}