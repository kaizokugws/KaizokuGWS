import 'server-only';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Item, ParsedItem, FilterState, DownloadSource } from './types';

const contentDirectory = path.join(process.cwd(), 'src', 'content');

function validateItem(item: Item, slug: string, category: string): void {
  if (!item.title) console.warn(`[WARN] Missing title in ${category}/${slug}`);
  if (!item.thumbnail) console.warn(`[WARN] Missing thumbnail in ${category}/${slug}`);
  if (!item.magnetFile && (!item.repacks || item.repacks.length === 0)) {
    console.warn(`[WARN] Missing magnetFile in ${category}/${slug}`);
  }
}

function normalizeTags(tags: string[] | undefined): string[] {
  if (!tags) return [];
  return tags.map((tag: string) => tag.toLowerCase().trim());
}

function getDefaultValues(data: Record<string, unknown>, _slug: string): Partial<Item> {
  const d = data as Record<string, unknown>;
  const sourcesRaw = d.sources as Record<string, string>[] | undefined;
  const sources: DownloadSource[] = Array.isArray(sourcesRaw) 
    ? sourcesRaw.map((s: Record<string, string>) => ({ name: s.name || '', file: s.file || '' }))
    : [];
  return {
    size: typeof d.size === 'string' ? d.size : 'Unknown',
    releaseYear: typeof d.releaseYear === 'number' ? d.releaseYear : new Date().getFullYear(),
    tags: normalizeTags(d.tags as string[] | undefined),
    featured: d.featured === true,
    trending: d.trending === true,
    lastUpdated: typeof d.lastUpdated === 'string' ? d.lastUpdated : new Date().toISOString().split('T')[0],
    aliases: Array.isArray(d.aliases) ? (d.aliases as string[]).map((a: string) => a.toLowerCase()) : [],
    related: Array.isArray(d.related) ? d.related as string[] : [],
    sources,
  };
}

export function getItemSlugs(category: string): string[] {
  const dir = path.join(contentDirectory, category);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith('.md'));
}

export function getItemBySlug(category: string, slug: string): Item {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(contentDirectory, category, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Item not found: ${category}/${realSlug}`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);
  const defaults = getDefaultValues(data, realSlug);
  
  const item: Item = {
    slug: realSlug,
    title: data.title || realSlug,
    platform: data.platform === 'Mobile' ? 'Mobile' : 'PC',
    category: category,
    thumbnail: data.thumbnail || '/images/placeholder.jpg',
    magnetFile: data.magnetFile || '',
    repacks: data.repacks || [],
    sources: defaults.sources,
    aliases: defaults.aliases,
    size: defaults.size,
    releaseYear: defaults.releaseYear,
    tags: defaults.tags,
    featured: defaults.featured,
    trending: defaults.trending,
    lastUpdated: defaults.lastUpdated,
  };
  
  validateItem(item, realSlug, category);
  return item;
}

export async function getParsedItemBySlug(category: string, slug: string): Promise<ParsedItem> {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(contentDirectory, category, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  const sections = parseContentSections(contentHtml);
  const defaults = getDefaultValues(data, realSlug);
  
  return {
    slug: realSlug,
    title: data.title || realSlug,
    platform: data.platform === 'Mobile' ? 'Mobile' : 'PC',
    category: category,
    thumbnail: data.thumbnail || '/images/placeholder.jpg',
    magnetFile: data.magnetFile || '',
    repacks: data.repacks || [],
    sources: defaults.sources,
    aliases: defaults.aliases,
    size: defaults.size,
    releaseYear: defaults.releaseYear,
    tags: defaults.tags,
    featured: defaults.featured,
    trending: defaults.trending,
    lastUpdated: defaults.lastUpdated,
    content: contentHtml,
    about: (sections.about as string) || '',
    screenshots: (sections.screenshots as string[]) || [],
    systemRequirements: (sections.systemRequirements as string) || '',
    installationGuide: (sections.installationGuide as string) || '',
  };
}

function parseContentSections(htmlContent: string): Record<string, unknown> {
  const sections: Record<string, unknown> = {};
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
  return slugs
    .map((slug) => getItemBySlug(category, slug))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getAllCategories(): string[] {
  return ['pc-games', 'pc-softwares', 'mobile-apps'].filter((cat) => {
    const dir = path.join(contentDirectory, cat);
    return fs.existsSync(dir);
  });
}

export function getAllItemsFlat(): Item[] {
  const categories = getAllCategories();
  const allItems: Item[] = [];
  for (const category of categories) {
    allItems.push(...getAllItems(category));
  }
  return allItems;
}

export function getTrendingItems(category?: string): Item[] {
  const items = category ? getAllItems(category) : getAllItemsFlat();
  return items.filter((item) => item.trending === true);
}

export function getFeaturedItem(category?: string): Item | null {
  const items = category ? getAllItems(category) : getAllItemsFlat();
  const featured = items.find((item) => item.featured === true);
  return featured || items[0] || null;
}

export function getPopularItems(category?: string, limit = 8): Item[] {
  const items = category ? getAllItems(category) : getAllItemsFlat();
  return [...items]
    .sort((a, b) => (b.lastUpdated || '').localeCompare(a.lastUpdated || ''))
    .slice(0, limit);
}

export function getRecentlyAdded(category?: string, limit = 8): Item[] {
  const items = category ? getAllItems(category) : getAllItemsFlat();
  return [...items]
    .sort((a, b) => (b.lastUpdated || '').localeCompare(a.lastUpdated || ''))
    .slice(0, limit);
}

export function getRelatedItems(item: Item, limit = 4): Item[] {
  const allItems = getAllItemsFlat();
  const relatedSlugs = item.related || [];
  
  const related: Item[] = allItems
    .filter((i) => i.slug !== item.slug)
    .map((i) => {
      let score = 0;
      
      if (relatedSlugs.includes(i.slug)) {
        score += 10;
      }
      
      if (i.category === item.category) score += 2;
      
      if (i.tags && item.tags) {
        const sharedTags = i.tags.filter((t) => item.tags?.includes(t));
        score += sharedTags.length;
      }
      
      return { item: { ...i, category: i.category || item.category }, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item);
  
  return related;
}

export function getAllTags(): string[] {
  const items = getAllItemsFlat();
  const tagSet = new Set<string>();
  items.forEach((item) => {
    (item.tags || []).forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

export function getAllReleaseYears(): number[] {
  const items = getAllItemsFlat();
  const years = new Set<number>();
  items.forEach((item) => {
    if (item.releaseYear) years.add(item.releaseYear);
  });
  return Array.from(years).sort((a, b) => b - a);
}

export function filterItems(
  items: Item[],
  filters: FilterState
): Item[] {
  let filtered = [...items];
  
  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.aliases?.some((a) => a.includes(q)) ||
      item.tags?.some((t) => t.includes(q))
    );
  }
  
  if (filters.category) {
    filtered = filtered.filter((item) => item.category === filters.category);
  }
  
  if (filters.releaseYear) {
    filtered = filtered.filter((item) => item.releaseYear === filters.releaseYear);
  }
  
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter((item) =>
      filters.tags?.some((tag) => item.tags?.includes(tag))
    );
  }
  
  const sortBy = filters.sortBy || 'title';
  const direction = filters.sortDirection || 'asc';
  
  filtered.sort((a, b) => {
    let aVal: string | number = '';
    let bVal: string | number = '';
    
    switch (sortBy) {
      case 'releaseYear':
        aVal = a.releaseYear || 0;
        bVal = b.releaseYear || 0;
        break;
      case 'lastUpdated':
        aVal = a.lastUpdated || '';
        bVal = b.lastUpdated || '';
        break;
      case 'title':
      default:
        aVal = a.title;
        bVal = b.title;
    }
    
    if (typeof aVal === 'number') {
      return direction === 'asc' ? aVal - (bVal as number) : (bVal as number) - aVal;
    }
    return direction === 'asc' 
      ? aVal.localeCompare(bVal as string)
      : (bVal as string).localeCompare(aVal);
  });
  
  return filtered;
}