import { readFile } from 'fs/promises';
import path from 'path';

interface SvgParams {
    mainTitle: string;
    subtitle: string;
    sectionTitle: string;
    image1: string;
    image2: string;
    image3: string;
    value1: string;
    value2: string;
    value3: string;
}

export async function manipulateSvg(params: SvgParams): Promise<string> {
    const svgTemplatePath = path.join(__dirname, '..', '..', 'templates', 'svg_template.svg');
    let svgContent = await readFile(svgTemplatePath, 'utf-8');

    // Replace placeholders with actual values
    Object.entries(params).forEach(([key, value]) => {
        svgContent = svgContent.replace(new RegExp(`{{${key}}}`, 'g'), value as string);
    });

    return svgContent;
}