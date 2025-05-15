import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import { scrapeWithPuppeteer } from './scrapeWithPuppeteer';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });
console.log('🔍 Variables cargadas desde .env:');
console.log('START_URL:', process.env.START_URL);
console.log('URLS_FILE_PATH:', process.env.URLS_FILE_PATH);
console.log('OUTPUT_DIR:', process.env.OUTPUT_DIR);
console.log(`🧪 .env cargado desde: ${envPath}`);

const START_URL = process.env.START_URL || 'https://www.camaracastellon.com/es/';
const URLS_FILE_PATH = path.resolve(process.env.URLS_FILE_PATH || './urls.txt');
const OUTPUT_DIR = path.resolve(process.env.OUTPUT_DIR || './output');

console.log(`Path de las URLs: ${URLS_FILE_PATH}`);
console.log(`Directorio de salida: ${OUTPUT_DIR}`);

if (!START_URL)
{
  console.error('❌ La variable START_URL no está definida en el archivo .env');
  process.exit(1);
}

if (!fs.existsSync(OUTPUT_DIR))
{
  fs.mkdirSync(OUTPUT_DIR);
}

/**
 * @summary Descubre las URLs internas a partir de una URL base.
 * @param baseUrl URL de la página base desde donde se descubren otras URLs.
 * @returns Array de URLs descubiertas.
 */
async function discoverUrls(baseUrl: string): Promise<string[]>
{
  const browser = await puppeteer.launch({
    headless: true,
    args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu",
        "--window-size=1920,1080",
        "--disable-dev-shm-usage"
    ]
});

  const page = await browser.newPage();

  await page.goto(baseUrl, { waitUntil: 'networkidle2', timeout: 60000 });

  const links = await page.$$eval(
    'a',
    (anchors, base) =>
      anchors
        .map(a => a.getAttribute('href'))
        .filter(href => href && !href.startsWith('#') && !href.startsWith('mailto:'))
        .map(href => new URL(href!, base!).href)
        .filter(href => href.startsWith(new URL(base!).origin)),
    baseUrl
  );  

  await browser.close();

  const uniqueLinks = [...new Set(links)];
  fs.writeFileSync(URLS_FILE_PATH, uniqueLinks.join('\n'), 'utf-8');
  console.log(`✅ Se descubrieron y guardaron ${uniqueLinks.length} URLs en urls.txt`);

  return uniqueLinks;
}

(async () =>
{
  let urls: string[] = [];

  if (fs.existsSync(URLS_FILE_PATH))
  {
    const fileContent = fs.readFileSync(URLS_FILE_PATH, 'utf-8').trim();
    urls = fileContent.split('\n').map(u => u.trim()).filter(Boolean);

    if (urls.length === 0)
    {
      console.log('ℹ️ urls.txt está vacío. Descubriendo URLs...');
      urls = await discoverUrls(START_URL);
    }
    else
    {
      console.log('✅ urls.txt encontrado. Usando URLs existentes...');
    }
  }
  else
  {
    console.log('📄 urls.txt no encontrado. Descubriendo URLs desde .env...');
    urls = await discoverUrls(START_URL);
  }

  if (urls.length === 0)
  {
    console.log('❌ No se encontraron URLs para scrapear.');
    return;
  }

  for (const url of urls)
  {
    console.log(`🕷️ Scrapeando: ${url}`);
    try
    {
      const data = await scrapeWithPuppeteer(url);
      const pageOutputDir = path.resolve('./output/pages');
      if (!fs.existsSync(pageOutputDir))
      {
        fs.mkdirSync(pageOutputDir, { recursive: true });
      }

      const fileName = path.join(pageOutputDir, `page_data_${new URL(url).pathname.replace(/[^a-zA-Z0-9]/g, '_') || 'root'}.json`);

      fs.writeFileSync(fileName, JSON.stringify({ url, data }, null, 2));
    }
    catch (err)
    {
      console.error(`❌ Error al scrapear ${url}:`, err);
    }
  }

  console.log('✅ Proceso de scraping finalizado.');
  console.log(`📂 Datos guardados en ${OUTPUT_DIR}/pages`);
  console.log(`📄 URLs guardadas en ${URLS_FILE_PATH}`);

})();