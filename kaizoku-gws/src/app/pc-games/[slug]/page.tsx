import { getItemSlugs, getParsedItemBySlug, getRelatedItems } from '@/lib/content';
import ItemHeader from '@/components/ItemHeader';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import SystemRequirements from '@/components/SystemRequirements';
import DownloadSection from '@/components/DownloadSection';
import DownloadInfo from '@/components/DownloadInfo';
import InstallationGuide from '@/components/InstallationGuide';
import RelatedItems from '@/components/RelatedItems';
import fs from 'fs';
import path from 'path';

export async function generateStaticParams() {
  const slugs = getItemSlugs('pc-games');
  return slugs.map((slug) => ({ slug: slug.replace(/\.md$/, '') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getParsedItemBySlug('pc-games', slug);
  return { title: `${item.title} - Kaizoku GWS` };
}

async function getMagnetLink(fileSlug: string): Promise<string> {
  try {
    const magnetPath = path.join(process.cwd(), 'public', 'magnets', `${fileSlug}.txt`);
    if (fs.existsSync(magnetPath)) {
      return fs.readFileSync(magnetPath, 'utf8').trim();
    }
  } catch (e) {}
  return '';
}

export default async function ItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getParsedItemBySlug('pc-games', slug);
  
  let downloadOptions: { name: string; magnetFile: string }[] = [];
  
  if (item.sources && item.sources.length > 0) {
    downloadOptions = await Promise.all(
      item.sources.map(async (source) => ({
        name: source.name,
        magnetFile: await getMagnetLink(source.file),
      }))
    );
  } else if (item.repacks && item.repacks.length > 0) {
    downloadOptions = item.repacks.map(r => ({ name: r.name, magnetFile: r.magnetFile }));
  } else {
    downloadOptions = [{ name: 'Download', magnetFile: item.magnetFile }];
  }

  const relatedItems = getRelatedItems(item, 4);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        <ItemHeader item={item} category="pc-games" about={item.about} />

        <ScreenshotGallery screenshots={item.screenshots} />
        <SystemRequirements requirements={item.systemRequirements} />
        <DownloadInfo item={item} />
        <DownloadSection 
          magnetFiles={downloadOptions} 
          title={item.title}
          fileSize={item.size}
          lastUpdated={item.lastUpdated}
        />
        <InstallationGuide guide={item.installationGuide} />
        
        {relatedItems.length > 0 && (
          <RelatedItems items={relatedItems} />
        )}
      </div>
    </div>
  );
}