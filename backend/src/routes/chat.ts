/// <summary>
/// Ruta API para manejar mensajes del chatbot.
/// </summary>

import express, { Request, Response } from "express";
import { askChatGPT } from "../services/chatgpt";

const router = express.Router();

/// <summary>
/// GET /api/chat
/// Envía una pregunta y devuelve la respuesta del modelo GPT.
/// </summary>
router.get("/", async (req: Request, res: Response) =>
{
    const userMessage: string = req.query.msg as string;

    if (!userMessage)
    {
        return res.status(400).json({ error: "No se proporcionó el mensaje." });
    }

    try
    {
        const reply: string = await askChatGPT(userMessage);
        return res.json({ response: reply });
    }
    catch (error)
    {
        console.error("Error al comunicarse con OpenAI:", error);
        return res.status(500).json({ error: "Error interno del servidor." });
    }
});

export default router;