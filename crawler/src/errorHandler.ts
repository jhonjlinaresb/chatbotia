import axios from 'axios';

export function handleAxiosError(error: unknown): void
{
    if (!axios.isAxiosError(error))
    {
    console.error('❌ Error inesperado:', error);
    return;
    }

    if (error.response) 
    {
        switch (error.response.status)
        {
        case 400:
            console.error('❌ 400: Solicitud incorrecta');
            break;
        case 401:
            console.error('❌ 401: No autorizado');
            break;
        case 403:
            console.error('❌ 403: Prohibido');
            break;
        case 404:
            console.error('❌ 404: Página no encontrada');
            break;
        case 500:
            console.error('❌ 500: Error interno del servidor');
            break;
        default:
            console.error(`❌ ${error.response.status}: Error desconocido del servidor`);
        }
    }
    else if (error.request)
    {
    console.error('❌ No hubo respuesta del servidor (request enviado)');
    }
    else
    {
    console.error(`❌ Error de configuración en la solicitud: ${error.message}`);
    }
}
