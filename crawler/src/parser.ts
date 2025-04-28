import cheerio from 'cheerio';

export function parseHtml(html: string) {
  const $ = cheerio.load(html);

  const titles: string[] = [];
  // Extraer títulos de encabezados h1, h2 y h3
  // y almacenarlos en un array
  // Se pueden agregar más etiquetas si es necesario
  $('h1, h2, h3').each((_, element) => {
    titles.push($(element).text().trim());
  });

  return { titles };
}
