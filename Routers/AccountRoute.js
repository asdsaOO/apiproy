const express = require ('express');
const controller=require('../Controllers/AccountController');
const jwt=require('jsonwebtoken');

const accountRouter=express.Router();
accountRouter.post('/authUser',controller.authUser);
accountRouter.post('/registrar',controller.registrarUsuario);
accountRouter.get('/listarRoles',controller.listarRoles);

module.exports={accountRouter}