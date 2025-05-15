import { ConnectDB } from "../db";
import fs from "fs";

/**
 * @summary
 * Representa una sección dentro de una página almacenada en la base de datos.
 */
interface Section
{
    section: string;
    content: string;
}

/**
 * @summary
 * Servicio que construye el contexto desde los datos almacenados en MongoDB.
 * Lee todas las páginas con contenido útil y concatena secciones hasta alcanzar un máximo de tokens estimados.
 */
export async function getContextFromFiles(): Promise<string>
{
    try
    {
        const db = await ConnectDB();
        const collection = db.collection("pages");

        const documents = await collection.find({
            data: { $exists: true, $ne: [] }
        }).toArray();

        let context: string = "";
        let totalSections: number = 0;
        let estimatedTokens: number = 0;

        const MAX_SECTIONS: number = 120;
        const MAX_TOKENS: number = 28000; // Límite ajustado para GPT-4o

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

            if (usefulSections.length === 0)
                continue;

            const header = `🔗 Fuente: ${doc.url}\n\n`;
            const headerTokens = Math.ceil(header.length / 4);

            if (estimatedTokens + headerTokens > MAX_TOKENS)
                break;

            context += header;
            estimatedTokens += headerTokens;

            for (const section of usefulSections)
            {
                if (totalSections >= MAX_SECTIONS)
                    break;

                const cleanContent = section.content.trim();
                const sectionTokens = Math.ceil(cleanContent.length / 4);

                if (estimatedTokens + sectionTokens > MAX_TOKENS)
                    break;

                const title = section.section || "Sección";
                context += `🧩 ${title}\n${cleanContent}\n\n`;

                totalSections++;
                estimatedTokens += sectionTokens;
            }

            context += "\n---\n\n";

            if (totalSections >= MAX_SECTIONS || estimatedTokens >= MAX_TOKENS)
                break;
        }

        fs.writeFileSync("./debug_context.txt", context);        
        console.log(`📄 Contexto generado | Secciones: ${totalSections} | Tokens estimados: ${estimatedTokens}`);

        return context || "No se encontró información relevante para responder.";
    }
    catch (error)
    {
        console.error("❌ Error al obtener el contexto desde la base de datos:", error);
        throw error;
    }
}