import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Item, ParsedItem } from './types';

const contentDirectory = path.join(process.cwd(), 'src', 'content');

export function getItemSlugs(category: string): string[] {
  const dir = path.join(contentDirectory, category);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith('.md'));
}

export function getItemBySlug(category: string, slug: string): Item {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(contentDirectory, category, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);
  
  return {
    slug: realSlug,
    title: data.title,
    platform: data.platform,
    category: data.category,
    thumbnail: data.thumbnail,
    magnetFile: data.magnetFile,
    repacks: data.repacks || [],
    aliases: data.aliases || [],
  };
}

export async function getParsedItemBySlug(category: string, slug: string): Promise<ParsedItem> {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(contentDirectory, category, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  
  const sections = parseContentSections(contentHtml);
  
  return {
    slug: realSlug,
    title: data.title,
    platform: data.platform,
    category: data.category,
    thumbnail: data.thumbnail,
    magnetFile: data.magnetFile,
    repacks: data.repacks || [],
    content: contentHtml,
    about: typeof sections.about === 'string' ? sections.about : '',
    screenshots: Array.isArray(sections.screenshots) ? sections.screenshots : [],
    systemRequirements: typeof sections.systemRequirements === 'string' ? sections.systemRequirements : '',
    installationGuide: typeof sections.installationGuide === 'string' ? sections.installationGuide : '',
  };
}

function parseContentSections(htmlContent: string): Record<string, string | string[]> {
  const sections: Record<string, string | string[]> = {};
  
  const headings = ['About', 'Screenshots', 'System Requirements', 'Installation Guide'];
  
  for (const heading of headings) {
    const regex = new RegExp(`<h[1-3]>\\s*${heading}\\s*</h[1-3]>([\\s\\S]*?)(?=<h[1-3]>\\s*(${headings.join('|')})\\s*</h[1-3]>|$)`, 'i');
    const match = htmlContent.match(regex);
    
    if (match && match[1]) {
      let content = match[1].trim();
      
      if (heading === 'Screenshots') {
        const images: string[] = [];
        const imgRegex = /<img[^>]+src="([^"]+)"/g;
        let imgMatch;
        while ((imgMatch = imgRegex.exec(content)) !== null) {
          images.push(imgMatch[1]);
        }
        sections[toCamelCase(heading)] = images;
      } else {
        sections[toCamelCase(heading)] = content;
      }
    }
  }
  
  return sections;
}

function toCamelCase(str: string): string {
  return str.replace(/\s+/g, '').replace(/^[A-Z]/, (c) => c.toLowerCase());
}

export function getAllItems(category: string): Item[] {
  const slugs = getItemSlugs(category);
  const items = slugs
    .map((slug) => getItemBySlug(category, slug))
    .sort((item1, item2) => (item1.title > item2.title ? 1 : -1));
  return items;
}

export function getAllCategories(): string[] {
  const categories = ['pc-games', 'pc-softwares', 'mobile-apps'];
  return categories.filter((cat) => {
    const dir = path.join(contentDirectory, cat);
    return fs.existsSync(dir);
  });
}

export function getAllItemsFlat(): Item[] {
  const categories = getAllCategories();
  const allItems: Item[] = [];
  
  for (const category of categories) {
    const items = getAllItems(category);
    allItems.push(...items);
  }
  
  return allItems;
}