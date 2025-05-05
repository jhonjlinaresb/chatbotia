/// <summary>
/// Servicio para interactuar con la base de datos de preguntas frecuentes (FAQ).
/// </summary>

import { ConnectDB } from "../db";

/// <summary>
/// Consulta la base de datos para obtener la respuesta a una pregunta.
/// </summary>
/// <param name="pregunta">La pregunta a buscar en la base de datos.</param>
/// <returns>La respuesta asociada a la pregunta o null si no se encuentra.</returns>
export async function obtenerRespuestaDeFAQ(pregunta: string): Promise<string | null> 
{
    const db = await ConnectDB();
    const faqCollection = db.collection("faq");

    const resultado = await faqCollection.findOne({ pregunta });

    return resultado ? resultado.respuesta : null;
}