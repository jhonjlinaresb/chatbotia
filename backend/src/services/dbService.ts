/// <summary>
/// Función para obtener documentos desde la base de datos.
/// </summary>
import { ConnectDB } from "../db"; // Conexión a la base de datos

/// <summary>
/// Obtiene todos los documentos de la colección 'pages' y los retorna como un arreglo.
/// </summary>
export async function obtenerDocumentos() 
{
    try 
    {
        const db = await ConnectDB();  // Conectamos con la base de datos
        const documentos = await db.collection("pages").find({}).toArray();  // Reemplaza "pages" por el nombre correcto de tu colección
        console.log("Documentos obtenidos:", documentos);  // Verifica que los documentos están siendo obtenidos correctamente
        return documentos;
    } 
    catch (error) 
    {
        console.error("Error al obtener documentos de la base de datos:", error);
        throw error;  // Lanza el error para ser manejado más arriba
    }
}