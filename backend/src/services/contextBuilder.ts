/// <summary>
/// Construye un texto legible a partir de los documentos almacenados en MongoDB,
/// concatenando secciones de forma comprensible para el modelo.
/// </summary>

import { ConnectDB } from "../db";

export async function buildReadableContext(): Promise<string>
{
    try
    {
        const db = await ConnectDB();
        const docs = await db.collection("pages").find({}).toArray();

        let context = "";

        for (const doc of docs)
        {
            context += `📄 Fuente: ${doc.source || "Desconocida"}\n\n`;

            for (const section of doc.sections || [])
            {
                if (!section.title && !section.content) continue;

                context += `🟦 Sección: ${section.title || "Sin título"}\n${section.content || ""}\n\n`;
            }

            context += `---\n\n`;
        }

        return context.trim();
    }
    catch (error)
    {
        console.error("❌ Error al construir el contexto:", error);
        throw error;
    }
}