const express = require('express');
const controller = require ('../Controllers/ActivitiesController')

const activitiesRouter=express.Router();
activitiesRouter.post('/crearActividad',controller.agregarActividad)

module.exports={
  activitiesRouter
}