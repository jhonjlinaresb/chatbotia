/// <summary>
/// Archivo principal del servidor Express.
/// </summary>

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pagesRoutes from "./routes/pagesRoutes";
import chatRoutes from "./routes/chatRoutes";
import documentRoutes from "./routes/documentRoutes";
import contextRoutes from "./routes/contextRoutes";

dotenv.config();

const PORT = process.env.PORT || 3001;

/// <summary>
/// Inicializa el servidor Express y configura las rutas.
/// </summary>
const APP = express();
APP.use(cors());
//APP.use(express.urlencoded({ extended: true }));

APP.use(express.json());
APP.use("/api/pages", pagesRoutes);
APP.use("/api/chat", chatRoutes);
APP.use("/api/document", documentRoutes); // Rutas para gestionar documentos
APP.use("/api/context", contextRoutes);
// APP.post("/test", (req, res) => {
//     res.json({ message: "Ruta de prueba funcionando" });
// });
// APP.post("/api/chat/preguntar", (req, res) => {
//     res.send("Ruta de prueba funcionando");
// });

/// <summary>
/// Inicia el servidor en el puerto especificado.
/// </summary>
APP.listen(PORT, () =>
{
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});