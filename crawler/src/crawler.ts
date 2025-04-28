import axios from 'axios';
import { parseHtml } from './parser';

async function fetchPage(url: string) 
{
  try 
  {
    const response = await axios.get(url);
    console.log('Respuesta de la página:', response);  // Depuración
    const data = parseHtml(response.data);
    console.log('✅ Datos extraídos:', data);
  } 
  catch (error) 
  {
    console.error('❌ Error al descargar la página:', error);
  }
}

// URL objetivo (cambiar por la web a scrapear)
const targetUrl = process.env.targetUrl || 'https://www.camaracastellon.com/es/'; // Traer de archivo de configuración o variable de entorno
// Llamar a la función de descarga  y análisis  de la página 

fetchPage(targetUrl);
