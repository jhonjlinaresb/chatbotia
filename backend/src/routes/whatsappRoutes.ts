import express from 'express';
import axios from 'axios';
import { enviarMensaje } from '../services/whatsappService';

const router = express.Router();

/**
 * @summary Webhook de recepción de mensajes de WhatsApp.
 * Procesa el mensaje recibido y genera una respuesta usando el endpoint interno de Chat.
 * @route POST /api/whatsapp/webhook
 */
router.post('/webhook', async (req, res) =>
{
  console.log('🌐 Webhook BODY:\n', JSON.stringify(req.body, null, 2));

  const mensaje = req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body;
  const numero = req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from;

  if (mensaje && numero)
  {
    console.log(`📩 Mensaje recibido de ${numero}: ${mensaje}`);

    try
    {
        console.log("📤 Enviando mensaje a /api/chat/preguntar");
      
        const respuestaApi = await axios.post('http://localhost:3001/api/chat/preguntar', {
          pregunta: mensaje
        });
      
        console.log("✅ Respuesta recibida del endpoint:", respuestaApi.data);
      
        const respuesta = respuestaApi.data?.respuesta || "No hubo respuesta.";
        await enviarMensaje(numero, respuesta);
    }
    catch (error: any)
    {
       console.error("❌ Error al llamar al endpoint:", error.response?.data || error.message);
       await enviarMensaje(numero, "❌ Error interno al procesar tu mensaje.");
    }
      
  }

  res.sendStatus(200);
});

/**
 * @summary Verificación del webhook para la API de Meta (GET).
 * @route GET /api/whatsapp/webhook
 */
router.get('/webhook', (req, res) =>
{
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (token === 'my_verify_token') {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

export default router;