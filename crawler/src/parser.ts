import * as cheerio from 'cheerio';

export function parseHtml(html: string) {
  const $ = cheerio.load(html);
  const pageData: { section: string; content: string }[] = [];

  $('h1, h2, h3').each((_, element) => {
    const title = $(element).text().trim();
    const nextContent = $(element).nextUntil('h1, h2, h3').text().trim();
    const content = nextContent || 'No content available';

    pageData.push({ section: title, content });
  });

  $('p').each((_, element) => {
    const paragraph = $(element).text().trim();
    if (paragraph) {
      pageData.push({ section: 'Paragraph', content: paragraph });
    }
  });

  $('ul, ol').each((_, element) => {
    const listItems: string[] = [];
    $(element).find('li').each((_, li) => {
      const text = $(li).text().trim();
      if (text) listItems.push(text);
    });
    if (listItems.length) {
      pageData.push({ section: 'List', content: listItems.join('\n') });
    }
  });

  $('a').each((_, element) => {
    const linkText = $(element).text().trim();
    const linkUrl = $(element).attr('href') || '';
    if (linkText && linkUrl) {
      pageData.push({ section: 'Link', content: `Text: ${linkText}, URL: ${linkUrl}` });
    }
  });

  return pageData;
}
