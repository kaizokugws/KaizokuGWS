import { getItemSlugs, getParsedItemBySlug, getRelatedItems } from '@/lib/content';
import ItemHeader from '@/components/ItemHeader';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import SystemRequirements from '@/components/SystemRequirements';
import DownloadSection from '@/components/DownloadSection';
import DownloadInfo from '@/components/DownloadInfo';
import InstallationGuide from '@/components/InstallationGuide';
import RelatedItems from '@/components/RelatedItems';
import Breadcrumbs from '@/components/Breadcrumbs';
import HideDotWave from '@/components/HideDotWave';

export async function generateStaticParams() {
  const slugs = getItemSlugs('pc-softwares');
  return slugs.map((slug) => ({ slug: slug.replace(/\.md$/, '') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getParsedItemBySlug('pc-softwares', slug);
  return { title: `${item.title} - Kaizoku GWS` };
}

export default async function ItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getParsedItemBySlug('pc-softwares', slug);
  
  const relatedItems = getRelatedItems(item, 4);

  return (
    <div className="min-h-screen py-8">
      <HideDotWave />
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-6">
          <Breadcrumbs items={[
            { label: 'PC Software', href: '/pc-softwares' },
            { label: item.title }
          ]} />
        </div>
        
        <ItemHeader item={item} category="pc-softwares" about={item.about} />

        <ScreenshotGallery screenshots={item.screenshots} />
        <SystemRequirements requirements={item.systemRequirements} />
        <DownloadInfo item={item} />
        <DownloadSection 
          sources={item.sources || []} 
          title={item.title}
          fileSize={item.size}
          lastUpdated={item.lastUpdated}
          downloadLink={item.downloadLink}
        />
        <InstallationGuide guide={item.installationGuide} />
        
        {relatedItems.length > 0 && (
          <RelatedItems items={relatedItems} />
        )}
      </div>
    </div>
  );
}