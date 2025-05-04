import axios from 'axios';

/**
 * @summary Maneja y muestra mensajes personalizados para errores de solicitudes HTTP hechas con Axios.
 * @param error Objeto de error capturado en un catch
 */
export function HandleAxiosError(error: unknown): void 
{
  if (!(axios.isAxiosError(error))) 
  {
    ConsoleError("❌ Error inesperado:", error);
    return;
  }

  if (error.response) 
  {
    switch (error.response.status) 
    {
      case 400:
        ConsoleError("❌ 400: Solicitud incorrecta");
        break;
      case 401:
        ConsoleError("❌ 401: No autorizado");
        break;
      case 403:
        ConsoleError("❌ 403: Prohibido");
        break;
      case 404:
        ConsoleError("❌ 404: Página no encontrada");
        break;
      case 500:
        ConsoleError("❌ 500: Error interno del servidor");
        break;
      default:
        ConsoleError(`❌ ${error.response.status}: Error desconocido del servidor`);
    }
  } 
  else if (error.request) 
  {
    ConsoleError("❌ No hubo respuesta del servidor (request enviado)");
  } 
  else 
  {
    ConsoleError(`❌ Error de configuración en la solicitud: ${error.message}`);
  }
}

/**
 * @summary Método auxiliar para escribir mensajes en la consola de error
 * @param message El mensaje a mostrar
 * @param additionalInfo Información adicional que se puede incluir
 */
function ConsoleError(message: string, additionalInfo?: unknown): void 
{
  if (additionalInfo) 
  {
    console.error(message, additionalInfo);
  } 
  else 
  {
    console.error(message);
  }
}