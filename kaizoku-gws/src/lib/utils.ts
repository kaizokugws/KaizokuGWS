import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCategory(slug: string): string {
  const map: Record<string, string> = {
    'pc-games': 'PC Games',
    'pc-softwares': 'PC Software',
    'mobile-apps': 'Mobile Apps',
  };
  return map[slug] ?? slug;
}