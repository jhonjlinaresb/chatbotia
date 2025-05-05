/// <summary>
/// Definición de las rutas relacionadas con el chatbot.
/// </summary>

import express from "express";
import { preguntar } from "../controllers/chatController";

const router = express.Router();

/// <summary>
/// Ruta POST para procesar la pregunta del usuario.
/// </summary>

router.get("/", (req, res) => {
    res.send("Ruta funcionando");
});

router.post("/preguntar", preguntar);

export default router;