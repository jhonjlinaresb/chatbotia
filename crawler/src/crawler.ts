import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { parseHtml } from './parser';
import { handleAxiosError } from './errorHandler';

async function fetchPage(url: string)
{
  try
  {
    console.log('🔄 Iniciando el proceso de scraping...');

    if (!isValidUrl(url))
    {
      throw new Error(`❌ URL inválida: ${url}`);
    }

    const response = await axios.get(url);
    if (response.status !== 200)
    {
      console.warn(`⚠️ Código de estado inesperado: ${response.status}`);
      return;
    }

    const data = { source: url, extractedOn: new Date().toISOString(), sections: parseHtml(response.data) };

    const outputDir = './output';
    if (!fs.existsSync(outputDir))
    {
      fs.mkdirSync(outputDir);
    }

    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = path.join(outputDir, `page_data_${timestamp}.json`);

    fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`✅ Datos guardados en: ${filename}`);
  }
  catch (error: unknown)
  {
    handleAxiosError(error);
  }
  finally
  {
    console.log('🔚 Proceso de scraping finalizado.\n');
  }
}

function isValidUrl(url: string): boolean
{
  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return regex.test(url);
}

const targetUrl = process.env.TARGET_URL || 'https://www.camaracastellon.com/es/';
fetchPage(targetUrl);