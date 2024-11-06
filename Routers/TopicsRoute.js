const express = require('express');
const topicRouter=express.Router();
const controller=require('../Controllers/TopicsController');
const autenticador=require('../Controllers/AuthController');

topicRouter.post('/agregar',autenticador.authToken, controller.agregarNuevoTema);
topicRouter.get('/listar',autenticador.authToken, controller.listarTemas);
topicRouter.delete('/eliminar',controller.eliminarTema);
topicRouter.put('/modificar',controller.modificarTema);
topicRouter.put('/listarSubtemas',autenticador.authToken, controller.listarSubtemas);


module.exports={topicRouter};