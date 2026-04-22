import { getItemSlugs, getParsedItemBySlug } from '@/lib/content';
import ItemHeader from '@/components/ItemHeader';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import SystemRequirements from '@/components/SystemRequirements';
import DownloadSection from '@/components/DownloadSection';
import InstallationGuide from '@/components/InstallationGuide';

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

  const downloadOptions = item.repacks && item.repacks.length > 0
    ? item.repacks.map(r => ({ name: r.name, magnetFile: r.magnetFile }))
    : [{ name: 'Download', magnetFile: item.magnetFile }];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        <ItemHeader item={item} category="mobile-apps" about={item.about} />

        <ScreenshotGallery screenshots={item.screenshots} />
        <SystemRequirements requirements={item.systemRequirements} />
        <DownloadSection magnetFiles={downloadOptions} title={item.title} />
        <InstallationGuide guide={item.installationGuide} />
      </div>
    </div>
  );
}