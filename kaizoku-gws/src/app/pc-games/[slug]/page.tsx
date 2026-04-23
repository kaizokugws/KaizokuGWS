import { getItemSlugs, getParsedItemBySlug, getRelatedItems } from '@/lib/content';
import ItemHeader from '@/components/ItemHeader';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import SystemRequirements from '@/components/SystemRequirements';
import DownloadSection from '@/components/DownloadSection';
import DownloadInfo from '@/components/DownloadInfo';
import InstallationGuide from '@/components/InstallationGuide';
import RelatedItems from '@/components/RelatedItems';

export async function generateStaticParams() {
  const slugs = getItemSlugs('pc-games');
  return slugs.map((slug) => ({ slug: slug.replace(/\.md$/, '') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getParsedItemBySlug('pc-games', slug);
  return { title: `${item.title} - Kaizoku GWS` };
}

export default async function ItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getParsedItemBySlug('pc-games', slug);
  
  const downloadOptions = item.repacks && item.repacks.length > 0
    ? item.repacks.map(r => ({ name: r.name, magnetFile: r.magnetFile }))
    : [{ name: 'Download', magnetFile: item.magnetFile }];

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