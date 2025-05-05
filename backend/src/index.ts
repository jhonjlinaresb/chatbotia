/// <summary>
/// Archivo principal del servidor Express.
/// </summary>

import express from "express";
import dotenv from "dotenv";
import pagesRoutes from "./routes/pages";
import chatRoutes from "./routes/chat";

dotenv.config();

const PORT = process.env.PORT || 3001;

/// <summary>
/// Inicializa el servidor Express y configura las rutas.
/// </summary>
const app = express();

app.use(express.json());
app.use("/api/pages", pagesRoutes);
app.use("/api/chat", chatRoutes);

/// <summary>
/// Inicia el servidor en el puerto especificado.
/// </summary>
app.listen(PORT, () =>
{
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});