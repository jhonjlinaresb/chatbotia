import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

/**
 * @summary Envía un mensaje de texto al número de WhatsApp especificado usando la Cloud API de Meta.
 * @param numero - Número de destino en formato internacional (sin '+').
 * @param mensaje - Texto plano a enviar como respuesta.
 * @returns void
 */
export async function enviarMensaje(numero: string, mensaje: string): Promise<void>
{
  try
  {
    // 🔎 Diagnóstico del entorno
    console.log("🔐 Token en uso (inicio):", process.env.WHATSAPP_TOKEN?.slice(0, 25) + "...");
    console.log("📞 Phone ID en uso:", process.env.WHATSAPP_PHONE_ID);

    const res = await axios.post
    (
      `https://graph.facebook.com/v22.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: numero,
        type: "text",
        text: { body: mensaje }
      },
      {
        headers:
        {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("📤 Preparando mensaje para:", numero);
    console.log("📨 Contenido:", mensaje);
    console.log('📬 Meta responde:', res.data);
  }
  catch (error: any)
  {
    console.error('❌ Error al enviar mensaje:', error.response?.data || error.message);
  }
}