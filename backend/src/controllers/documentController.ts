/// <summary>
/// Controller to manage documents extracted from the database.
/// Controlador para gestionar los documentos extraídos de la base de datos.
/// </summary>

import { Request, Response } from "express";
import { ConnectDB } from "../db";
import { buildSectionSummary } from "../services/sectionProcessorService";

export async function getDocumentSummary(req: Request, res: Response)
{
    try
    {
        const db = await ConnectDB();
        const collection = db.collection("pages");

        // Retrieve documents, limiting to 5 for performance (optional)
        const docs = await collection.find({}).limit(5).toArray();

        const summaries = docs.map(doc =>
        {
            return { id: doc._id, summary: buildSectionSummary(doc.sections || []) /*Generamos el resumen de las secciones*/};
        });

        res.json(summaries); // Enviamos los resúmenes en la respuesta
    }
    catch (error)
    {
        console.error("X Error fetching summaries:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
