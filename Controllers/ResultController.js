const pooldb = require('../conf/db')

async function obtenerClasificacion(req, res) {
  try {
    const data = req.query;
    const consulta = `SELECT * FROM fn_obtener_clasificaciones_estudiantes($1::json);`;
    const resp = await (pooldb.query(consulta, [data]));
    console.log(resp.rows);

    res.json(resp.rows);
  } catch (e) {
    console.log(e);
  }

}
async function obtenerDatosRango(req, res) {
  const data = req.query;
  const consulta = `SELECT r.nombre , r.descripcion 
                    FROM rangos r 
                    INNER JOIN "Usuarios" u ON u.id_rango = r.id and u.id = $1::integer`
  const respuesta = (await pooldb.query(consulta,[data.idUsuario])).rows;
  res.json (respuesta)

}

async function obtenerClasificacionPersonal(req, res) {
  try {
    const data = req.query.idUsuario;
    const consulta = `SELECT id_rango  FROM "Usuarios" u  WHERE u.id = ${data}`;
    console.log(consulta);

    const resp = await (pooldb.query(consulta));
    const rango = resp.rows[0].id_rango;
    console.log("rango: " + rango);

    const resp2 = await (pooldb.query(`SELECT * FROM fn_obtener_clasificaciones_estudiantes('{"idrango":${rango}}'::json);`));
    res.json(resp2.rows);

  } catch (e) {
    console.log(e);


  }
}

async function abrir_cerrar_temporada(req, res) {
  try {
    const consulta = `SELECT * FROM fn_cerrar_abrir_temporada('{}'::jsonb);`;
    const resp = await (pooldb.query(consulta));
    res.json(resp.rows);

  } catch (e) {
    console.log(e);

  }

}
async function registroActividade(req, res) {
  try {
    const data = req.body;
    const consulta = `SELECT * FROM fn_registro_actividad($1::jsonb);`;
    const resp = await (pooldb.query(consulta, [data]))
    res.json(resp.rows);

  } catch (e) {
    console.log(e);

  }

}
async function obtenerDatosLeccion(req, res) {
  try {
    const data = req.query;
    console.log(data);

    const consulta = `SELECT * FROM fn_obtener_datos_de_leccion($1::JSONB);`;
    const consulta2 = `SELECT * FROM fn_obtener_datos_de_leccion('${data}'::JSONB);`
    console.log(consulta2);

    const resp = await (pooldb.query(consulta, [data]));
    res.json(resp.rows);

  } catch (e) {
    console.log(e);


  }

}
async function obtenerDatosRendimiento(req, res) {

  try {
    const data = req.query;
    console.log("llamada");


    const consulta = `SELECT * FROM fn_obtener_resultados_de_rendimiento($1::JSONB);`;
    const resp = await (pooldb.query(consulta, [data]));
    res.json(resp.rows);

  } catch (e) {
    console.log(e);

  }

}

module.exports = {
  obtenerClasificacion,
  abrir_cerrar_temporada,
  registroActividade,
  obtenerDatosLeccion,
  obtenerDatosRendimiento,
  obtenerClasificacionPersonal,
  obtenerDatosRango
}