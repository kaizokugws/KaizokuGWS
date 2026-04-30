'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Item } from '@/lib/types';
import CategoryGrid from '@/components/CategoryGrid';
import { Gamepad2 } from 'lucide-react';
import { franchises } from '@/lib/franchises';

const title = 'PC Games';
const description = 'Discover and download the best PC games';

interface PCGamesClientProps {
  items: Item[];
}

export default function PCGamesClient({ items }: PCGamesClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const franchiseFilter = searchParams.get('franchise') || '';

  const filteredItems = franchiseFilter
    ? items.filter(game => game.tags?.includes(franchiseFilter))
    : items;

  const activeFranchise = franchises.find(f => f.tag === franchiseFilter);

  const clearFranchiseFilter = () => {
    router.push('/pc-games');
  };

  return (
    <Suspense fallback={<div className="min-h-screen py-12"><div className="max-w-7xl mx-auto px-4">Loading...</div></div>}>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4FD1FF] to-[#4FD1FF]/60 flex items-center justify-center shadow-[0_0_20px_rgba(79,209,255,0.3)]">
                <Gamepad2 className="w-7 h-7 text-[#0B0D10]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#E6EDF3]">{title}</h1>
                <p className="text-[#9AA4AF]">{description}</p>
              </div>
            </div>
          </div>

          {/* Franchise filter pill */}
          {activeFranchise && (
            <div className="mb-6 flex items-center gap-2">
              <span 
                className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-mono rounded-full"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  border: `1px solid ${activeFranchise.accentColor}40`,
                  color: '#E6EDF3',
                }}
              >
                Showing: {activeFranchise.name}
                <button
                  onClick={clearFranchiseFilter}
                  className="ml-1 hover:text-[#4FD1FF] transition-colors"
                >
                  ×
                </button>
              </span>
            </div>
          )}

          <CategoryGrid items={filteredItems} category="pc-games" basePath="/pc-games" />
        </div>
      </div>
    </Suspense>
  );
}
