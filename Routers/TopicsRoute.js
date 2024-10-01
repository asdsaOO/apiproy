const express = require('express');
const topicRouter=express.Router();
const controller=require('../Controllers/TopicsController')

topicRouter.post('/agregar', controller.agregarNuevoTema);


module.exports={topicRouter};