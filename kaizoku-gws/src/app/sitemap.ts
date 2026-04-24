import { MetadataRoute } from 'next';
import { getAllItems, getAllCategories } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = getAllCategories();
  const baseUrl = 'https://kaizokugws.com';
  
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/pc-games`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/pc-softwares`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/mobile-apps`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/request`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const dynamicPages: MetadataRoute.Sitemap = categories.flatMap(category => {
    const items = getAllItems(category);
    return items.map(item => ({
      url: `${baseUrl}/${category}/${item.slug}`,
      lastModified: item.lastUpdated ? new Date(item.lastUpdated) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  });

  return [...staticPages, ...dynamicPages];
}