const pooldb = require ('../conf/db');
const errorModel = require ('../Models/errorModel');

async function listarEstudiantes (req,res){
  const data = req.query;
  console.log(data);
  
  try{
    console.log("controlador");
    
    const response =  (await pooldb.query(`SELECT* FROM  public.fn_listar_estudiantes ($1::integer)`,[data.tipo])).rows;
    res.json (response);

  }catch(e){
    console.log(e);
    
  }

}
async function habilitarEstudiante (req,res){
  try{
    const data = req.body;
    console.log(data);
    const consulta = `SELECT * FROM fn_habilitar_deshabilitar($1::jsonb)`;
    const response =  await pooldb.query(consulta,[data]);
    console.log(response.rows);
    res.json(response.rows);
    

  }catch(e){
    console.log(e);
    res.json( errorModel.errorModel('API'+e));
    
  }
}

async function eliminarEstudiante (req,res){
  try{
    const data = req.body;
    console.log(data);
    const consulta = `SELECT * FROM fn_eliminar_estudiante($1::jsonb);`;
    const response =  await pooldb.query(consulta,[data]);
    console.log(response.rows);
    res.json(response.rows);
    

  }catch(e){
    console.log(e);
    res.json( errorModel.errorModel('API'+e));
    
  }
}
module.exports = {
  listarEstudiantes,
  habilitarEstudiante,
  eliminarEstudiante
}