/// <summary>
/// Rutas relacionadas con el contenido de páginas.
/// </summary>

import { Router } from "express";
import { GetPageByUrl } from "../controllers/pagesController";
import { ConnectDB } from "../db";
import { buildSectionSummary } from "../services/sectionProcessorService";
import { getContextFromFiles } from "../services/contextService";
import { buildReadableContext } from "../services/contextBuilder";

const router = Router();

/// <summary>
/// Obtener una página específica a partir de su URL codificada.
/// </summary>
router.get("/:encodedUrl", GetPageByUrl);

/// <summary>
/// Obtener todas las URLs almacenadas en la base de datos.
/// </summary>
router.get("/", async (req, res) =>
{
    try
    {
        const db = await ConnectDB();
        const urls = await db
            .collection("pages")
            .find({}, { projection: { url: 1, _id: 0 } })
            .toArray();

        res.json(urls);
    }
    catch (error)
    {
        console.error("❌ Error al obtener las URLs:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

/// <summary>
/// Obtener los resúmenes de las secciones de los documentos.
/// </summary>
router.get("/summaries", async (req, res) =>
{
    try
    {
        const db = await ConnectDB();
        const collection = db.collection("pages");

        // Limitar a 5 documentos para pruebas, puedes ajustarlo.
        const docs = await collection.find({}).limit(5).toArray();

        const summaries = docs.map(doc =>
        {
            return {
                id: doc._id,
                summary: buildSectionSummary(doc.sections || [])
            };
        });

        res.json(summaries);
    }
    catch (error)
    {
        console.error("❌ Error al obtener los resúmenes:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

/// <summary>
/// Obtener contexto desde los ficheros generados y almacenados en base de datos.
/// </summary>
router.get("/context/filesFromDB", async (_req, res) =>
{
    try
    {
        const context = await getContextFromFiles();
        res.json({ context });
    }
    catch (error)
    {
        console.error("❌ Error al obtener el contexto desde ficheros:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

/// <summary>
/// Obtener el contexto completo legible para uso por el modelo.
/// </summary>
router.get("/context/files", async (_req, res) =>
{
    try
    {
        const context = await buildReadableContext();
        res.json({ context });
    }
    catch (error)
    {
        console.error("❌ Error al obtener el contexto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;