/// <summary>
/// Rutas para el chatbot con la API de OpenAI.
/// </summary>

import express, { Request, Response } from "express";
import { askChatGPT } from "../services/chatgpt";

const router = express.Router();

/// <summary>
/// GET /api/chat?msg=Hola
/// Devuelve la respuesta del modelo de ChatGPT.
/// </summary>
router.get("/", (req: Request, res: Response) =>
    {
        const msg = req.query.msg as string;
    
        if (!msg)
        {
            return res.status(400).json({ error: "Falta el parámetro 'msg'." });
        }
    
        askChatGPT(msg)
            .then(reply => res.json({ response: reply }))
            .catch(error =>
            {
                console.error("Error en la API de OpenAI:", error);
                return res.status(500).json({ error: "Error del servidor." });
            });
    });
    
export default router;