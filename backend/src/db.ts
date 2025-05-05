/// <summary>
/// Módulo para conexión a la base de datos MongoDB.
/// </summary>

import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = "chatbotia";
const CLIENT = new MongoClient(MONGODB_URI);

/// <summary>
/// Establece la conexión con MongoDB y retorna la base de datos.
/// </summary>
export async function ConnectDB()
{
    try
    {
        await CLIENT.connect();
        console.log("🟢 Conectado a MongoDB");
        return CLIENT.db(DB_NAME);
    }
    catch (error)
    {
        console.error("❌ Error conectando a MongoDB:", error);
        process.exit(1);
    }
    finally
    {
        // Cerrar conexión, si se requiere.
        // CLIENT.close();
    }
}