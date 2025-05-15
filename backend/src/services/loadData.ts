/// <summary>
/// Servicio para importar archivos JSON desde el crawler y cargarlos en MongoDB.
/// Este servicio lee los archivos JSON desde una carpeta específica, los procesa y guarda sus datos
/// en la base de datos MongoDB. Si un archivo no contiene la propiedad 'url', se guardará de todos modos
/// utilizando el nombre del archivo como 'url'.
/// </summary>

import fs from "fs";
import path from "path";
import { ConnectDB } from "../db";

// Directorio donde se encuentran los archivos generados por el crawler
const DATA_DIR = path.resolve(process.env.CRAWLER_DATA_PATH || "../crawler/output/pages");

async function LoadData()
{
    const db = await ConnectDB();
    const collection = db.collection("pages");

    // Obtener todos los archivos en el directorio
    const files = fs.readdirSync(DATA_DIR);
    console.log(`🔄 Total de archivos a procesar: ${files.length}`);

    // Procesar cada archivo
    for (const file of files)
    {
        const filePath = path.join(DATA_DIR, file);
        const stat = fs.statSync(filePath);

        // Verificar si es un archivo regular (no un directorio)
        if (stat.isFile())
        {
            const content = fs.readFileSync(filePath, "utf-8");
            let json;
            
            try
            {
                json = JSON.parse(content);

                // Si no contiene 'url', sigue con el proceso igual y usa el nombre del archivo
                if (!json.url)
                {
                    console.warn(`⚠️ El archivo ${file} no contiene la propiedad 'url', pero se guardará sin ella.`);
                }

                // Guardar el documento en la colección de MongoDB
                await collection.updateOne(
                    { url: json.url || file },  // Usamos el nombre del archivo como 'url' si no existe
                    { $set: json },
                    { upsert: true }  // Si ya existe un documento con esa URL, lo actualizará
                );

                console.log(`✅ Cargado: ${json.url || file}`);
            }
            catch (error)
            {
                console.error(`❌ Error al procesar el archivo ${file}: ${error}`);
            }
        }
        else
        {
            console.error(`❌ El archivo ${file} es un directorio, no un archivo JSON.`);
        }
    }

    console.log("🎉 Todos los datos han sido cargados.");
    process.exit(0);
}

// Llamada al servicio para cargar los datos
LoadData();