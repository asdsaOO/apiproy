const pooldb=require('../conf/db')

async function agregarActividad (req,res){
  console.log("agregar actividad");
  
  try{
    const data = req.body;
    const consulta =`SELECT * FROM public.fn_agregar_actividad($1::jsonb);`
    const response = await( pooldb.query(consulta,[data]));
    

    res.json(response.rows)
    

  }catch(e){
    console.log(e);
    
  }
}

async function listarActividades (req,res){
  try{
    
    
    const data = req.body;
    const consulta = `select * from public.fn_listar_actividades(5)`;
    const response = (await (pooldb.query(consulta))).rows;
    console.log(response);
    

    res.json (response);

  }catch(e){

    console.log(e);
    
  }

}

async function actualizarActividad (req,res){
  console.log("actualizar actividad");
  
  try{
    const data = req.body;
    const consulta =`SELECT * FROM public.fn_actualizar_actividad($1::jsonb);`
    const response = await( pooldb.query(consulta,[data]));
    console.log(response.rows);

    res.json(response.rows)
    

  }catch(e){
    console.log(e);
    
  }
}
async function eliminarActividad(req,res){
  try{
    const data = req.body;
    const consulta = `SELECT * FROM public.fn_borrar_logico_actividad($1);`
    const resp = await pooldb.query(consulta,[data.idActividad]);
    res.json(resp.rows)

  }catch{

  }

}


module.exports={
  agregarActividad,
  listarActividades,
  actualizarActividad,
  eliminarActividad
}