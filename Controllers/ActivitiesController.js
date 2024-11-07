const pooldb=require('../conf/db')

async function agregarActividad (req,res){
  try{
    const data = req.body;
    const consulta =`SELECT * FROM public.fn_agregar_actividad($1::jsonb);`
    const response = await( pooldb.query(consulta,[data]));
    console.log(response.rows);

    res.json(response.rows)
    

  }catch(e){
    console.log(e);
    
  }
}

async function listarActividades (req,res){
  try{
    console.log('adfadf');
    
    const data = req.body;
    const consulta = `select * from public.fn_listar_actividades(5)`;
    const response = (await (pooldb.query(consulta))).rows;

    res.json (response);

  }catch(e){

    console.log(e);
    
  }

}

module.exports={
  agregarActividad,
  listarActividades
}