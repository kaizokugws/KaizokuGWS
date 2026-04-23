import { getAllItems } from '@/lib/content';
import CategoryGrid from '@/components/CategoryGrid';
import { Smartphone } from 'lucide-react';

export default function MobileAppsPage() {
  const items = getAllItems('mobile-apps');
  const title = 'Mobile Apps';
  const description = 'APK files for Android devices';

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4FD1FF] to-[#4FD1FF]/60 flex items-center justify-center shadow-[0_0_20px_rgba(79,209,255,0.3)]">
              <Smartphone className="w-7 h-7 text-[#0B0D10]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#E6EDF3]">{title}</h1>
              <p className="text-[#9AA4AF]">{description}</p>
            </div>
          </div>
        </div>

        <CategoryGrid items={items} category="mobile-apps" />
      </div>
    </div>
  );
}