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
module.exports={
  obtenerLeccion
}