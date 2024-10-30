const pooldb=require('../conf/db')



async function agregarNuevoTema(req,res){
  try{
    const data= req.body;
    console.log("ENTRO AL CONTROLADOR EL DATO ES "+JSON.stringify(data));
    const consulta=`select* from public.fn_registrar_tema('${JSON.stringify(data)}'::jsonb);`;
    console.log("la consulta es "+consulta);
    
    const result= await pooldb.query(consulta)
    console.log(result.rows);
    res.json(result.rows);

  }catch(e){
    console.log(e);
  } 

}

async function listarTemas (req,res){
  try{
    console.log();
    const consulta ="SELECT * FROM fn_listar_temas(1);";
    const result= await pooldb.query(consulta);
    console.log(result.rows);
    res.json(result.rows);

  }catch(e){
    console.log(e);
    
    

  }
}

async function eliminarTema(req,res){
  try{
    const data = req.body;
    console.log("eliminar tema dato recibido:");
    console.log(data);
    const consulta = `SELECT * FROM public.fn_eliminartema('${JSON.stringify(data)}'::jsonb);`
    console.log("consulta: consulta");
    const result= await pooldb.query(consulta);
    console.log("respuesta:"+ result.rows);
    res.json(result.rows);
    
  }catch (e){
    console.log(e);
    
  }

}
async function modificarTema (req,res){
  try{
    const data = req.body;
    console.log(("modificar tema dato recibido"));
    console.log(data);
    const consulta = `select* from public.fn_modificar_tema('${JSON.stringify(data)}'::jsonb);`;
    console.log(consulta);
    
    const result = await pooldb.query(consulta);
    console.log("respuesta:");
    console.log(result.rows);
    res.json(result.rows);

  }catch(e){
    console.log(e);
    
  }
  
  
}

module.exports={
  agregarNuevoTema,
  listarTemas,
  eliminarTema,
  modificarTema
}