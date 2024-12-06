const express = require ('express');
const controller=require('../Controllers/AccountController');
const jwt=require('jsonwebtoken');

const accountRouter=express.Router();
accountRouter.post('/authUser',controller.authUser);
accountRouter.post('/registrar',controller.registrarUsuario);
accountRouter.get('/listarRoles',controller.listarRoles);
accountRouter.put('/registroRapido',controller.registroUsuarioRapido);
accountRouter.get('/obtenerDatosUsuario',controller.extraerDatosUsuario);
accountRouter.post('/modificarUsuario',controller.modificarDatosUsuario);

module.exports={accountRouter}