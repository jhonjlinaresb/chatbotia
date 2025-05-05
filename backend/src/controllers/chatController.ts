/// <summary>
/// Controlador para manejar las solicitudes del chatbot.
/// </summary>

import { Request, Response } from "express"; // Importa los tipos de Express
import { obtenerRespuestaDeFAQ } from "../services/faqService";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/// <summary>
/// Procesa la pregunta del usuario y devuelve una respuesta.
/// Primero busca en la base de datos y, si no encuentra, consulta la API de OpenAI.
/// </summary>
/// <param name="req">La solicitud HTTP.</param>
/// <param name="res">La respuesta HTTP.</param>
export async function preguntar(req: Request, res: Response): Promise<Response> 
{
    console.log("Solicitud recibida:", req.body);
    const { pregunta } = req.body;

    // Buscar en la base de datos
    const respuestaBDD = await obtenerRespuestaDeFAQ(pregunta);

    if (respuestaBDD) 
    {
        return res.json({ respuesta: respuestaBDD });
    } 
    else 
    {
        try 
        {
            // Si no se encuentra en la base de datos, consultar OpenAI
            const response = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [{ role: "user", content: pregunta }],
            });

            return res.json({ respuesta: response.choices[0].message.content });
        } 
        catch (error) 
        {
            return res.status(500).json({ error: "Error al obtener respuesta" });
        }
    }
}
