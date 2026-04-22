export interface Repack {
  name: string;
  magnetFile: string;
}

export interface Item {
  slug: string;
  title: string;
  platform: 'PC' | 'Mobile';
  category: string;
  thumbnail: string;
  magnetFile: string;
  repacks: Repack[];
  aliases?: string[];
}

export interface ParsedItem extends Item {
  content: string;
  about: string;
  screenshots: string[];
  systemRequirements: string;
  installationGuide: string;
}