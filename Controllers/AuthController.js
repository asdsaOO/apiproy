require('dotenv').config();
const respModel = require('../Models/errorModel')
const jwt = require ('jsonwebtoken');

function authToken(req,res,next){
  try{
    const token= req.cookies.Nkauth;
    console.log('el token es: ');
    console.log(token);
    const validPayload = jwt.verify(token,process.env.JWT_KEY);
    
    
    console.log(validPayload);
    console.log('se autentico');
    next();
  }catch(e){
    console.log(e);
    res.status(401).json({ok:false, message: 'permisos invalidos'});

  }
}

module.exports={authToken}