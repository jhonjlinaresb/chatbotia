/// <summary>
/// Servicio que construye el contexto desde los datos almacenados en MongoDB.
/// Lee todas las páginas con contenido útil y limita el número total de secciones para cumplir con los límites de tokens de OpenAI.
/// </summary>

import { ConnectDB } from "../db";

/// <summary>
/// Representa una sección dentro de una página almacenada en la base de datos.
/// </summary>
interface Section
{
    section: string;
    content: string;
}

/// <summary>
/// Construye un contexto legible para el modelo, basado en los documentos de la colección 'pages'.
/// Limita la cantidad de texto para no exceder los límites de tokens de OpenAI.
/// </summary>
export async function getContextFromFiles(): Promise<string>
{
    try
    {
        const db = await ConnectDB();
        const collection = db.collection("pages");

        /// <summary>
        /// Recupera todos los documentos que contengan datos válidos.
        /// </summary>
        const documents = await collection.find({ data: { $exists: true, $ne: [] } }).toArray();

        let context: string = "";
        let totalSections: number = 0;
        const MAX_SECTIONS: number = 60;

        /// <summary>
        /// Procesa cada documento y extrae secciones útiles del campo 'data'.
        /// </summary>
        for (const doc of documents)
        {
            const usefulSections: Section[] = (doc.data as Section[]).filter(section =>
            {
                const content = section?.content?.toLowerCase().trim();
                return (
                    content &&
                    content !== "no content available" &&
                    content.length > 20
                );
            });

            if (usefulSections.length === 0) continue;

            context += `🔗 Fuente: ${doc.url}\n\n`;

            for (const section of usefulSections)
            {
                if (totalSections >= MAX_SECTIONS) break;

                const title = section.section || "Sección";
                context += `🧩 ${title}\n${section.content.trim()}\n\n`;
                totalSections++;
            }

            context += "\n---\n\n";
            if (totalSections >= MAX_SECTIONS) break;
        }
        console.log(context);
        return context || "No se encontró información relevante para responder.";
    }
    catch (error)
    {
        console.error("❌ Error al obtener el contexto desde la base de datos:", error);
        throw error;
    }
}
