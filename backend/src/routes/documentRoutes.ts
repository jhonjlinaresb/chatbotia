/// <summary>
///  Rutas para acceder a los documentos procesados desde la API.
/// </summary>

import { Router } from "express";
import { getDocumentSummary } from "../controllers/documentController";

const router = Router();

// Ruta para obtener los resúmenes de los documentos
router.get("/documents/summaries", getDocumentSummary);

export default router;