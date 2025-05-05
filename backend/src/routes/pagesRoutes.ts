/// <summary>
/// Rutas relacionadas con el contenido de páginas.
/// </summary>

import { Router } from "express";
import { GetPageByUrl } from "../controllers/pages";
import { ConnectDB } from "../db";

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

export default router;