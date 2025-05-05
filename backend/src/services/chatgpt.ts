/// <summary>
/// Servicio para interactuar con la API de OpenAI (ChatGPT).
/// </summary>

import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config();

/// <summary>
/// Inicializa el cliente OpenAI con la clave del entorno.
/// </summary>
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/// <summary>
/// Envía un mensaje al modelo ChatGPT y obtiene la respuesta.
/// </summary>
export async function askChatGPT(message: string): Promise<string>
{
    const completion = await openai.chat.completions.create
    ({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "Eres un chatbot útil y preciso." },
            { role: "user", content: message }
        ]
    });

    return completion.choices[0].message.content ?? "Sin respuesta del modelo.";
}