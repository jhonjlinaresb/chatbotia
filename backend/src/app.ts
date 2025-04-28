import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola desde el chatbot backend!');
});

export default app;
