/// <summary>
/// Función para obtener el contexto desde la base de datos.
/// Formatea los datos para ser utilizados por OpenAI.
/// </summary>

import { ConnectDB } from "../db";

interface Section {
    title: string;
    content: string;
}

export async function obtenerContexto()
{
    try
    {
        const db = await ConnectDB();
        const collection = db.collection("pages");

        /// <summary>
        /// Obtiene todos los documentos, extrae el contenido de cada sección.
        /// </summary>
        const documentos = await collection.find({}).toArray();

        let contexto = "";

        documentos.forEach(doc =>
        {
            doc.sections.forEach((section: Section) =>
            {
                contexto += `Sección: ${section.title}\n${section.content}\n\n`;
            });
        });

        /// <summary>
        /// Retorna el contexto formado de los documentos obtenidos de la base de datos.
        /// </summary>
        return contexto;
    }
    catch (error)
    {
        console.error("Error al obtener el contexto de la base de datos:", error);
        throw error;
    }
}