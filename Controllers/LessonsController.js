const pooldb = require('../conf/db');
const { spawn } = require('child_process');
const path = require('path');



async function obtenerLeccion(req, res) {
  try {
    console.log('Obteniendo datos de actividades...');
    const id = (req.query).idUsuario;
    // Consulta para obtener datos de actividades
    const consulta = `SELECT a.id, a.id_tema, a.id_subtema,$1::integer AS id_usuario FROM "Actividades" a ORDER BY RANDOM()`;
    const resp = await pooldb.query(consulta, [id]);
    console.log('Datos obtenidos de la base de datos:', resp.rows);

    // Serializar los datos a JSON
    const inputData = JSON.stringify(resp.rows);
    console.log('Datos enviados al script de Python:', inputData);

    const pythonScriptPath = path.join(__dirname, '../python/predecir.py');

    // Ejecutar el script de Python
    const pythonProcess = spawn('python', [pythonScriptPath]);

    // Capturar la salida del script
    pythonProcess.stdout.on('data', async (data) => {
      console.log(`Salida del script Python: ${data.toString()}`);
      try {
        const result = JSON.parse(data.toString());
        if (!res.headersSent) { // Solo enviar si los encabezados no han sido enviados
          console.log(result);
          const consulta2 = `SELECT * FROM "Actividades" a WHERE a.id IN (${result});`
          const resp2 = await pooldb.query(consulta2);

          console.log(consulta2);
          const actividadesFaltantes = await obtenerOtrasActividades(result,id);
          const leccion = [...actividadesFaltantes,...resp2.rows]

          res.json(leccion); // Enviar respuesta al cliente
        }
      } catch (error) {
        console.error('Error al parsear la respuesta de Python:', error);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Error en el formato de los datos recibidos del script Python' });
        }
      }
    });

    // Capturar errores del script Python
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error en el script Python: ${data.toString()}`);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Error en el script Python' });
      }
    });

    pythonProcess.on('close', (code) => {
      console.log(`El proceso Python finalizó con código ${code}`);
    });

    // Enviar los datos al script Python
    pythonProcess.stdin.write(inputData);
    pythonProcess.stdin.end();

  } catch (e) {
    console.error('Error en la función obtenerLeccion:', e);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }
}

async function obtenerOtrasActividades(idActividades, idUsuario) {
  // Paso 1: Busca actividades que el usuario no ha realizado
  const consultaNoRealizadas = `
    SELECT * 
    FROM public."Actividades" a
    WHERE a.id NOT IN (
      SELECT ar.id_actividad
      FROM public."Act_realizadas" ar
      JOIN public."Lecciones" l ON ar.id_leccion = l.id
      WHERE l.id_usuario = $1::integer
    )
    AND a.id NOT IN (${idActividades.join(",")}) 
    ORDER BY RANDOM()
    LIMIT 5;
  `;
  const actividadesNoRealizadas = (await pooldb.query(consultaNoRealizadas, [idUsuario])).rows;

  // Si ya hay 5 actividades, retorna el resultado
  if (actividadesNoRealizadas.length === 5) {
    return actividadesNoRealizadas;
  }

  // Paso 2: Busca actividades adicionales para completar las 5
  const faltantes = 5 - actividadesNoRealizadas.length;
  const idsSeleccionados = actividadesNoRealizadas.map(a => a.id).concat(idActividades);
  const consultaCompletadas = `
    SELECT * 
    FROM public."Actividades" a
    WHERE a.id NOT IN (${idsSeleccionados.join(",")}) 
    ORDER BY RANDOM()
    LIMIT $1::integer;
  `;
  const actividadesCompletadas = (await pooldb.query(consultaCompletadas, [faltantes])).rows;

  // Combina las actividades no realizadas y las adicionales
  return [...actividadesNoRealizadas, ...actividadesCompletadas];
}


async function guardarLeccion(req, res) {
  console.log('guardando leccion');

  const data = req.body;
  try {
    const consulta = `SELECT* from public.fn_insertar_actividades_realizadas($1::jsonb)`;
    const resp = await pooldb.query(consulta, [data]);
    const consulta_completa = (`SELECT* from public.fn_insertar_actividades_realizadas($1::jsonb)`, [data]);
    console.log(consulta_completa);

    console.log(resp.rows);

    res.json(resp.rows)

  } catch (e) {
    console.log(e);


  }
}

async function listarLeccionesRealizadas(req, res) {
  try {
    console.log('listando lecciones');

    const data = req.query;
    console.log(data);
    const consulta = `SELECT * FROM public.fn_obtener_lecciones_por_usuario($1::jsonb);`;
    const resp = await pooldb.query(consulta, [data]);

    res.json(resp.rows)
  } catch (e) {
    console.log(e);

  }

}
module.exports = {
  obtenerLeccion,
  guardarLeccion,
  listarLeccionesRealizadas
}