export interface Repack {
  name: string;
  magnetFile: string;
}

export interface DownloadSource {
  name: string;
  file: string;
}

export interface Item {
  slug: string;
  title: string;
  platform: 'PC' | 'Mobile';
  category: string;
  thumbnail: string;
  magnetFile: string;
  repacks: Repack[];
  sources?: DownloadSource[];
  aliases?: string[];
  size?: string;
  releaseYear?: number;
  tags?: string[];
  featured?: boolean;
  trending?: boolean;
  lastUpdated?: string;
  related?: string[];
}

export interface ParsedItem extends Item {
  content: string;
  about: string;
  screenshots: string[];
  systemRequirements: string;
  installationGuide: string;
}

export interface ItemFilter {
  category?: string;
  releaseYear?: number;
  tags?: string[];
  search?: string;
}

export type SortOption = 'lastUpdated' | 'title' | 'releaseYear';
export type SortDirection = 'asc' | 'desc';

export interface FilterState {
  search: string;
  category: string | null;
  releaseYear: number | null;
  tags: string[];
  sortBy: SortOption;
  sortDirection: SortDirection;
}