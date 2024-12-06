const express = require('express');
const controller = require ('../Controllers/ActivitiesController')
const activitiesRouter=express.Router();
const autenticador=require('../Controllers/AuthController');

activitiesRouter.post('/crearActividad',autenticador.authToken,controller.agregarActividad);
activitiesRouter.get('/listarActividades',autenticador.authToken,controller.listarActividades);
activitiesRouter.post('/actualizarActividades',autenticador.authToken,controller.actualizarActividad);
activitiesRouter.post('/eliminarActividad', autenticador.authDocenteRol,controller.eliminarActividad)

module.exports={
  activitiesRouter
}