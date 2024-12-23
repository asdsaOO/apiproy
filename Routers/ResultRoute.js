const express = require('express');
const controller=require ('../Controllers/ResultController');
const resultsRouter=express.Router();


resultsRouter.get('/listarRank',controller.obtenerClasificacion);
resultsRouter.post('/cerrarAbrirTemporada',controller.abrir_cerrar_temporada);
resultsRouter.post('/registroActividad',controller.registroActividade);
resultsRouter.get('/listarDatosLeccion',controller.obtenerDatosLeccion);
resultsRouter.get ('/obtenerDatosRendimiento',controller.obtenerDatosRendimiento);
resultsRouter.get ('/obtenerClasificacionPersonal',controller.obtenerClasificacionPersonal);
resultsRouter.get ('/obtenerDatosRango',controller.obtenerDatosRango);



module.exports={
  resultsRouter,
}