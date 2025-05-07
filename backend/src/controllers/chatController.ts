/// <summary>
/// Controlador para gestionar las solicitudes del chatbot.
/// Utiliza OpenAI para responder preguntas, basándose en el contexto de la base de datos.
/// </summary>

import { Request, Response } from "express";
import { OpenAI } from "openai";
import { getContextFromFiles } from "../services/contextService"; 

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/// <summary>
/// Controlador para procesar la pregunta y generar una respuesta utilizando OpenAI.
/// </summary>
export async function preguntar(req: Request, res: Response): Promise<Response>
{
    const { pregunta } = req.body;

    try
    {
        /// <summary>
        /// Obtiene el contexto de la base de datos.
        /// </summary>
        const contexto = await getContextFromFiles();

        const prompt = `Responde a la siguiente pregunta utilizando esta información como contexto:\n\n${contexto}\n\nPregunta: ${pregunta}`;

        const response = await openai.chat.completions.create
        ({
            model: "gpt-4",
            messages: [
                { role: "system", content: "Eres un asistente útil y experto en información institucional." },
                { role: "user", content: prompt }
            ]
        });

        const respuesta = response.choices[0].message.content;
        return res.json({ respuesta });

    }
    catch (error)
    {
        console.error("❌ Error al procesar la pregunta:", error);
        return res.status(500).json({ error: "Error al procesar la pregunta." });
    }
}