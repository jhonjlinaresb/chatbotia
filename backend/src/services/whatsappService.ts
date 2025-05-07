import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

/**
 * @summary Envía un mensaje de texto por WhatsApp API (Cloud API de Meta)
 */
export async function enviarMensaje(numero: string, mensaje: string): Promise<void>
{
  try
  {
    await axios.post
    (
      `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
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
    console.log(`✅ Mensaje enviado a ${numero}`);
  } catch (error: any) {
    console.error('❌ Error al enviar mensaje:', error?.response?.data || error.message);
  }
}