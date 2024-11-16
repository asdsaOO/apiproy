const pooldb=require('../conf/db')

async function obtenerLeccion (req,res){
  try{
  const consulta = 'SELECT* FROM "Actividades" a LIMIT 10';
  const resp =  await pooldb.query(consulta);
  res.json(resp.rows)
  }catch(e){
    console.log(e);
  
  }

}

async function guardarLeccion(req,res){
  console.log('guardando leccion');
  
  const data = req.body;
  try{
    const consulta=`SELECT* from public.fn_insertar_actividades_realizadas($1::jsonb)`;
    const resp =  await pooldb.query(consulta,[data]);
    const consulta_completa =(`SELECT* from public.fn_insertar_actividades_realizadas($1::jsonb)`,[data]);
    console.log(consulta_completa);
    
    console.log(resp.rows);
    
    res.json(resp.rows)

  }catch(e){
    console.log(e);
    

  }
}

async function listarLeccionesRealizadas(req,res){
  try{
    console.log('listando lecciones');
    
  const data = req.query;
  console.log(data);
  const consulta= `SELECT * FROM public.fn_obtener_lecciones_por_usuario($1::jsonb);`;
  const resp = await pooldb.query(consulta,[data]);
  
  res.json(resp.rows)
  }catch(e){
    console.log(e);
    
  }

}
module.exports={
  obtenerLeccion,
  guardarLeccion,
  listarLeccionesRealizadas
}