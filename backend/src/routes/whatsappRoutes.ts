import express from 'express';
import { enviarMensaje } from '../services/whatsappService';

const router = express.Router();

/**
 * @summary Recibe mensajes desde el Webhook de WhatsApp
 */
router.post('/webhook', async (req, res) =>
{
    console.log('🌐 Webhook BODY:\n', JSON.stringify(req.body, null, 2));
  const mensaje = req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body;
  const numero = req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from;

  if (mensaje && numero)
{
    console.log(`📩 Mensaje recibido de ${numero}: ${mensaje}`);
    await enviarMensaje(numero, `Hola 👋, gracias por tu mensaje: "${mensaje}"`);
  }

  res.sendStatus(200);
});

/**
 * @summary Verificación de webhook para Meta
 */
router.get('/webhook', (req, res) =>
{
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (token === 'my_verify_token') { res.status(200).send(challenge); }
  else { res.sendStatus(403); }
});

export default router;