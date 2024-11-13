const express = require('express');
const controller = require ('../Controllers/ActivitiesController')
const activitiesRouter=express.Router();

activitiesRouter.post('/crearActividad',controller.agregarActividad);
activitiesRouter.get('/listarActividades',controller.listarActividades);
activitiesRouter.post('/actualizarActividades',controller.actualizarActividad);
activitiesRouter.post('/eliminarActividad',controller.eliminarActividad)

module.exports={
  activitiesRouter
}