const pooldb=require('../conf/db');
require('dotenv').config();
const respModel = require('../Models/errorModel')
const jwt = require ('jsonwebtoken');
const argon2=require('argon2');
const mailer=require('../helpers/SendMail')


async function authUser(req,res){
  const data = req.body;
  console.log(process.env.JWT_KEY);
  const dateIat = Math.floor(Date.now()/1000);
  console.log(data);
  const consulta = `SELECT * FROM fn_verificar_usuario($1::jsonb)`;
  const response = await pooldb.query(consulta,[data]);
  console.log(response.rows);
  if(response.rows[0].oboolean){
    if(await argon2.verify(response.rows[0].opassword,data.password.toString())){
      //se autentico correctamente
      const tokenPayload={
        id:data.password,
        fistName: "user",
        email: data.email,
        iat: dateIat
      }
      const token = jwt.sign(tokenPayload,process.env.JWT_KEY);
      //console.log(token);
      res.cookie('Nkauth',token);
      res.json(respModel.successModel());

    }else{
      res.json(respModel.errorModel('Error: Las contraseñas no coinciden'));
    }
  
  }else{
    res.json(respModel.errorModel('Error: El usuario no existe'));

  }
  
  //const token = jwt.sign(tokenPayload,process.env.jwt);
  console.log(process.env.JWT_KEY);
  

  
}
async function registrarUsuario(req,res){
  const data=req.body;
  console.log(data);
  const passcrypt=await argon2.hash(data.password);
  data.password=passcrypt;
  console.log(passcrypt);
  const consulta = `select* from fn_registrar_usuario ($1::jsonb);`;
  const response = await pooldb.query(consulta,[data]);
  console.log(response.rows);
  
  res.json(response.rows);

}

async function listarRoles (req,res){
  const response = await pooldb.query('SELECT* FROM "Roles"');
  console.log("listando");
  console.log(response.rows);
  
  
  res.json(response.rows)
}

async function registroUsuarioRapido(req,res){
  const data=req.body;
  console.log(data);
  const password=data.password;
  const passcrypt=await argon2.hash((data.password).toString());
  data.password=passcrypt;
  console.log(passcrypt);
  const consulta = `select* from fn_registrar_usuario ($1::jsonb);`;
  const response = await pooldb.query(consulta,[data]);
  if(response.rows[0].oboolean){
    await mailer.sendPassword(data.email,password);

  }
 
  console.log(response.rows);
  res.json(response.rows);
}


module.exports={
  registrarUsuario,
  authUser,
  listarRoles,
  registroUsuarioRapido
}