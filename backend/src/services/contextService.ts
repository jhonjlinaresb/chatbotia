/// <summary>
/// Función para obtener el contexto desde la base de datos y los ficheros almacenados.
/// Formatea los datos para ser utilizados por OpenAI.
/// </summary>

import { ConnectDB } from "../db";

interface Section
{
    title: string;
    content: string;
}

/// <summary>
/// Obtiene el contexto desde los ficheros almacenados en el sistema.
/// Limita el número de secciones procesadas para evitar exceder los límites de tokens.
/// </summary>
export async function getContextFromFiles()
{
    try
    {
        const db = await ConnectDB();
        const collection = db.collection("pages");

        const documents = await collection.find({ sections: { $exists: true, $ne: [] } }).limit(10).toArray();

        let context = "";

        for (const doc of documents)
        {
            const validSections = (doc.sections || []).filter(
                (section: any) =>
                    section &&
                    section.content &&
                    section.content.trim().toLowerCase() !== "no content available"
            ).slice(0, 3);

            if (validSections.length === 0) continue; // omitimos documentos sin secciones útiles

            context += `🔗 Fuente: ${doc.source || doc.url}\n\n`;

            validSections.forEach((section: any, index: number) =>
            {
                const title = section.title || `Sección ${index + 1}`;
                context += `🧩 ${title}\n${section.content.trim()}\n\n`;
            });

            context += "\n---\n\n";
        }
        console.log("🔍 Contexto obtenido desde los ficheros:", context);
        return context || "No se encontró información relevante para responder la pregunta.";
    }
    catch (error)
    {
        console.error("❌ Error al obtener contexto desde la base de datos:", error);
        throw error;
    }
}