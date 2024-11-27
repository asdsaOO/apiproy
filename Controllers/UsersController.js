const pooldb = require ('../conf/db');
const errorModel = require ('../Models/errorModel');

async function listarEstudiantes (req,res){
  try{
    console.log("controlador");
    
    const response =  (await pooldb.query(`SELECT* FROM  public.fn_listar_estudiantes (5)`)).rows;
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
module.exports = {
  listarEstudiantes,
  habilitarEstudiante
}