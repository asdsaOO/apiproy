const express = require('express');
const topicRouter=express.Router();
const controller=require('../Controllers/TopicsController');
const autenticador=require('../Controllers/AuthController');

topicRouter.post('/agregar',autenticador.authToken, controller.agregarNuevoTema);
topicRouter.get('/listar', controller.listarTemas);
topicRouter.delete('/eliminar',controller.eliminarTema);
topicRouter.put('/modificar',controller.modificarTema);


module.exports={topicRouter};