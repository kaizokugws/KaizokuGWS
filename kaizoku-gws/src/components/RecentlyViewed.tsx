'use client';

import { useEffect, useState } from 'react';
import { useRecentlyViewed } from '@/lib/hooks';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Trash2 } from 'lucide-react';

export function RecentlyViewed() {
  const { items, clearItems } = useRecentlyViewed();
  const [isExpanded, setIsExpanded] = useState(true);

  if (items.length === 0) return null;

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#4FD1FF]" />
          <h2 className="text-lg font-semibold text-[#E6EDF3]">Continue Browsing</h2>
        </div>
        <button
          onClick={clearItems}
          className="text-xs text-[#9AA4AF] hover:text-[#4FD1FF] transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-3 h-3" />
          Clear
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/${item.category}/${item.slug}`}
            className="flex-shrink-0 group"
          >
            <div className="w-24 h-32 relative rounded-lg overflow-hidden border border-[#222] group-hover:border-[#4FD1FF] transition-colors">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover"
                sizes="96px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/90 to-transparent" />
              <div className="absolute bottom-1 left-1 right-1">
                <p className="text-xs text-white truncate font-medium">
                  {item.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function useTrackView() {
  const { addItem } = useRecentlyViewed();

  useEffect(() => {
    let slug = '';
    let category = '';
    let title = '';
    let thumbnail = '';

    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const match = path.match(/\/(pc-games|pc-softwares|mobile-apps)\/([^/]+)/);
      if (match) {
        category = match[1];
        slug = match[2];
        
        const titleEl = document.querySelector('h1');
        title = titleEl?.textContent || title;

        const imgEl = document.querySelector('main img') as HTMLImageElement;
        thumbnail = imgEl?.src || '';
      }
    }

    if (slug && category && title) {
      addItem({ slug, title, category, thumbnail });
    }
  }, [addItem]);
}