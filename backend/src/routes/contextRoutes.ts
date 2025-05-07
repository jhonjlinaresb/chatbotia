/// <summary>
/// Rutas para obtener el contexto desde los ficheros generados y almacenados en la base de datos.
/// </summary>

import { Router } from "express";
import { getContextFromFiles } from "../services/contextService";
import { buildReadableContext } from "../services/contextBuilder";

const router = Router();

/// <summary>
/// Obtener contexto desde los ficheros generados y almacenados en base de datos.
/// </summary>
router.get("/filesFromDB", async (req, res) =>
{
    try
    {
        const context = await getContextFromFiles(); // Llamamos a la función que obtiene el contexto desde los ficheros
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
router.get("/files", async (req, res) =>
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