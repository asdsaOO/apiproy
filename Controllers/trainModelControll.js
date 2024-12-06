const fs = require('fs');
const path = require('path');
const pooldb = require('../conf/db');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { exec } = require('child_process');

// Ruta y configuración del archivo CSV
const directory = path.join(__dirname, '../data');
const filePath = path.join(directory, 'inpDataModel.csv');

const csvWriter = createCsvWriter({
  path: filePath,
  header: [
    { id: 'id_actividad_realizada', title: 'ID Actividad Realizada' },
    { id: 'resultado', title: 'Resultado' },
    { id: 'tiempo', title: 'Tiempo' },
    { id: 'id_tema', title: 'ID Tema' },
    { id: 'id_subtema', title: 'ID Subtema' },
    { id: 'id_usuario', title: 'ID Usuario' },
  ],
});

async function generateCsvWriter(req, res) {
  try {
    // Verificar que la carpeta exista
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
      console.log(`Carpeta ${directory} creada exitosamente.`);
    }
    // Consulta a la base de datos
    const query = `
      SELECT 
        ar.id AS id_actividad_realizada,
        ar.resultado,
        ar.tiempo,
        a.id_tema,
        a.id_subtema,
        u.id AS id_usuario
      FROM 
        public."Act_realizadas" ar
      JOIN 
        public."Actividades" a ON ar.id_actividad = a.id
      JOIN 
        public."Lecciones" l ON ar.id_leccion = l.id
      JOIN 
        public."Usuarios" u ON l.id_usuario = u.id
      WHERE 
        a.activo = true;
    `;
    const resp = await pooldb.query(query);
    // Preprocesar los datos antes de escribir al CSV
    const preprocessedData = resp.rows.map(row => {
      // Convertir 'true'/'false' en valores numéricos (1/0)
      const resultado = row.resultado === true ? 1 : 0;
      // Normalizar el campo 'tiempo' (si es necesario, por ejemplo dividiendo por 1000 para pasarlo a segundos)
      const tiempo = row.tiempo / 1000; // En segundos

      return {
        id_actividad_realizada: row.id_actividad_realizada,
        resultado: resultado,  // Resultado como 1 o 0
        tiempo: tiempo,  // Tiempo en segundos
        id_tema: row.id_tema,
        id_subtema: row.id_subtema,
        id_usuario: row.id_usuario
      };
    });
    console.log('Datos preprocesados:', preprocessedData);  // Depurar los datos
    // Escribir los datos preprocesados al archivo CSV
    await csvWriter.writeRecords(preprocessedData);
    console.log('Archivo CSV generado exitosamente en:', filePath);
    await pruebaPythonScript(res);
    // Responder al cliente si es necesario
  } catch (error) {
    console.error('Error al generar el archivo CSV:', error);
    
  }
}

async function pruebaPythonScript(res) {
  const pythonScriptPath = path.join(__dirname, '../python/entrenarModelo.py');

  if (fs.existsSync(pythonScriptPath)) {
    console.log('El archivo Python existe. Procediendo a ejecutarlo...');
  } else {
    console.error('El archivo Python no existe en la ruta especificada.');
    return;
  }

  exec(`python "${pythonScriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar el script: ${error.message}`);
      res.status(500).json([{omessage:'Error al ejecutar el script',oboolean:false}]);
      return ;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      res.status(500).json([{omessage:`${stderr}`,oboolean:false}]);
      
      return;
    }
    console.log(`stdout: ${stdout}`);
    res.status(200).json([{omessage:'Se actualizaron los datos del modelo',oboolean:true}]);
    
    
  });
}

module.exports = {
  generateCsvWriter
};
