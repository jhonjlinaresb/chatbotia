/// <summary>
/// Define las rutas para la API de páginas.
/// </summary>

import { Router } from "express";
import { GetAllPages, GetPageByUrl } from "../controllers/pages";

const router = Router();

router.get("/", GetAllPages);
router.get("/:encodedUrl", GetPageByUrl);

export default router;