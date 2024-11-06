const express = require('express');
const autenticador=require('../Controllers/AuthController');
const controller = require('../Controllers/UsersController');
const usersRoute = express.Router();


usersRoute.get('/estudiantes',autenticador.authToken,controller.listarEstudiantes);
usersRoute.put ('/habilitarEstudiante',autenticador.authToken,controller.habilitarEstudiante);

module.exports={usersRoute}