import app from './app';

const PORT = process.env.PORT || 3000; // Crear variable de entorno para el puerto

app.listen(PORT, () => {
  console.log(`Servidor online en http://localhost:${PORT}`);
});
