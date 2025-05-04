import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

// Conjunto para evitar procesar URLs duplicadas
const visited = new Set<string>();
const discovered: string[] = [];

/**
 * @summary Inicia el proceso de crawling desde una URL base.
 * @param startUrl - La URL desde donde comenzar el rastreo.
 * @param maxDepth - Máxima profundidad de rastreo (niveles de enlaces).
 * @returns Lista de URLs descubiertas dentro del dominio.
 */
export async function crawlSite(startUrl: string, maxDepth = 3) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const baseDomain = new URL(startUrl).hostname;

  /**
   * @summary Visita una URL, extrae enlaces internos y los recorre recursivamente.
   * @param url - URL actual a rastrear.
   * @param depth - Profundidad actual del rastreo.
   */
  async function crawl(url: string, depth: number) {
    if (visited.has(url) || depth > maxDepth) return;
    visited.add(url);
    discovered.push(url);

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

      const links = await page.$$eval('a', anchors =>
        anchors
          .map(a => a.href)
          .filter(href => href && !href.startsWith('mailto:') && !href.startsWith('#'))
      );

      const internalLinks = links.filter(link => new URL(link).hostname === baseDomain);

      for (const link of internalLinks) {
        await crawl(link, depth + 1);
      }
    } catch (err) {
      console.warn(`❌ Error en ${url}:`, err);
    }
  }

  await crawl(startUrl, 0);
  await browser.close();

  // Guardar las URLs descubiertas en el archivo configurado por la variable de entorno URLS_FILE_PATH o en 'urls.txt' por defecto
  const URLS_FILE_PATH = process.env.URLS_FILE_PATH || './urls.txt';
  const filePath = path.resolve(URLS_FILE_PATH);
  const existingUrls = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8').split('\n').map(line => line.trim()) : [];
  const newUrls = [...new Set([...existingUrls, ...discovered])];

  // Escribir las URLs descubiertas y las existentes en el archivo
  fs.writeFileSync(filePath, newUrls.join('\n'), 'utf-8');
  console.log(`🔗 URLs descubiertas guardadas en: ${filePath}`);

  return newUrls;
}