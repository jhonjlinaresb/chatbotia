import axios from 'axios';

const API_URL = 'http://localhost:3000'; // --> URL de backend 
// const API_URL = process.env.API_URL || 'http://localhost:3000'; // Traer de archivo de configuración o variable de entorno

export async function sendMessage(message: string) {
  const response = await axios.post(`${API_URL}/chat`, { message });
  return response.data.reply; // Ajustar respuesta a backend
}
