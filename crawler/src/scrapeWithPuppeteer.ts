import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

// === CONFIGURACIONES GLOBALES ===
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const TIMEOUT_MS = 60000;

/**
 * @summary Realiza scraping de una página web usando Puppeteer y extrae encabezados, párrafos, listas y enlaces.
 * @param url URL de la página a extraer
 * @returns Array de objetos con secciones de contenido
 */
export async function scrapeWithPuppeteer(url: string)
{
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  await page.setUserAgent(USER_AGENT);

  try
  {
    console.log('🔄 Iniciando scraping con Puppeteer...');

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: TIMEOUT_MS });

    const html = await page.content();
    const $ = cheerio.load(html);

    const pageData: { section: string; content: string }[] = [];

    // === Extraer encabezados y contenido siguiente ===
    $('h1, h2, h3').each((_, element) =>
    {
      const title = $(element).text().trim();
      const content = $(element).nextUntil('h1, h2, h3').text().trim() || 'No content available';
      pageData.push({ section: title, content: content });
    });

    // === Extraer párrafos ===
    $('p').each((_, element) =>
    {
      const text = $(element).text().trim();
      if (text)
      {
        pageData.push({ section: 'Paragraph', content: text });
      }
    });

    // === Extraer listas ===
    $('ul, ol').each((_, element) =>
    {
      const listItems: string[] = [];

      $(element).find('li').each((_, li) =>
      {
        const itemText = $(li).text().trim();
        if (itemText)
        {
          listItems.push(itemText);
        }
      });

      if (listItems.length)
      {
        pageData.push({ section: 'List', content: listItems.join('\n') });
      }
    });

    // === Extraer enlaces ===
    $('a').each((_, element) =>
    {
      const linkText = $(element).text().trim();
      const href = $(element).attr('href') || '';

      if (linkText && href)
      {
        pageData.push({ section: 'Link', content: `Text: ${linkText}, URL: ${href}` });
      }
    });

    return pageData;
  }
  catch (error)
  {
    console.error('❌ Error durante el scraping con Puppeteer:', error);
    return [];
  }
  finally
  {
    await browser.close();
    console.log('🔚 Proceso de scraping con Puppeteer finalizado.');
  }
}