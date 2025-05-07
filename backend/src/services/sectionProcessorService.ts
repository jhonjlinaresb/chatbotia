/// <summary>
/// Service to process document sections into a readable plain text format for AI models.
/// </summary>

export function buildSectionSummary(sections: any[]): string
{
    let output = "";

    for (const item of sections)
    {
        if (!item.section || !item.content)
        {
            continue;
        }

        const title = item.section.toString().trim();
        const content = item.content.toString().trim();

        output += `🔹 ${title}\n`;  // Titulo de la sección
        output += `${content}\n\n`; // Contenido de la sección
    }

    return output.trim();
}