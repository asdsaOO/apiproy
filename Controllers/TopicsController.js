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

module.exports={
  agregarNuevoTema
}