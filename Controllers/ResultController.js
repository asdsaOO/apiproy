const pooldb=require('../conf/db')

async function obtenerClasificacion (req,res){
  try{
    const data=req.query;
    const consulta = `SELECT * FROM fn_obtener_clasificaciones_estudiantes($1::json);`;
    const resp =  await (pooldb.query(consulta,[data]));
    console.log(resp.rows);
    
    res.json(resp.rows);
  }catch(e){
    console.log(e);
  }

}

async function abrir_cerrar_temporada (req,res){
  try{
    const consulta = `SELECT * FROM fn_cerrar_abrir_temporada('{}'::jsonb);`;
    const resp = await (pooldb.query(consulta));
    res.json(resp.rows);

  }catch(e){
    console.log(e);
    
  }

}
async function registroActividade(req,res){
  try{
    const data = req.body;
    const consulta =  `SELECT * FROM fn_registro_actividad($1::jsonb);`;
    const resp = await (pooldb.query(consulta,[data]))
    res.json (resp.rows);

  }catch(e){
    console.log(e);
    
  }

}

module.exports={
  obtenerClasificacion,
  abrir_cerrar_temporada ,
  registroActividade 
}