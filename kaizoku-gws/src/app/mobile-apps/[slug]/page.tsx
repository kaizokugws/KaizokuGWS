import { getItemSlugs, getParsedItemBySlug, getRelatedItems } from '@/lib/content';
import ItemHeader from '@/components/ItemHeader';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import SystemRequirements from '@/components/SystemRequirements';
import DownloadSection from '@/components/DownloadSection';
import DownloadInfo from '@/components/DownloadInfo';
import InstallationGuide from '@/components/InstallationGuide';
import RelatedItems from '@/components/RelatedItems';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateStaticParams() {
  const slugs = getItemSlugs('mobile-apps');
  return slugs.map((slug) => ({ slug: slug.replace(/\.md$/, '') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getParsedItemBySlug('mobile-apps', slug);
  return { title: `${item.title} - Kaizoku GWS` };
}

export default async function ItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getParsedItemBySlug('mobile-apps', slug);
  
  const relatedItems = getRelatedItems(item, 4);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-6">
          <Breadcrumbs items={[
            { label: 'Mobile Apps', href: '/mobile-apps' },
            { label: item.title }
          ]} />
        </div>
        
        <ItemHeader item={item} category="mobile-apps" about={item.about} />

        <ScreenshotGallery screenshots={item.screenshots} />
        <SystemRequirements requirements={item.systemRequirements} />
        <DownloadInfo item={item} />
        <DownloadSection 
          sources={item.sources || []} 
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