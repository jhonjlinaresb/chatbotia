import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error("❌ OPENAI_API_KEY no está definida en el archivo .env");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * @summary Envía un mensaje al modelo de OpenAI (ChatGPT) y obtiene una respuesta contextual.
 * @param message - Mensaje del usuario enviado desde WhatsApp.
 * @returns Texto generado por el modelo como respuesta al mensaje.
 */
export async function askChatGPT(message: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      //model: "gpt-3.5-turbo",
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Eres un chatbot útil y preciso para responder preguntas relacionadas con la Cámara de Comercio de Castellón: https://www.camaracastellon.com/es/",
        },
        { role: "user", content: message },
      ],
    });

    const respuesta = completion.choices[0].message?.content;

    console.log("💬 ChatGPT respondió:", respuesta);

    return respuesta || "No tengo una respuesta clara en este momento.";
  } catch (error: any) {
    console.error("❌ Error al consultar OpenAI:", error.message);
    return "⚠️ Ocurrió un error al generar una respuesta con el asistente.";
  }
}