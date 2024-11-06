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

module.exports={
  agregarActividad
}