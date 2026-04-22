import { getAllItems } from '@/lib/content';
import Card from '@/components/Card';
import RequestCard from '@/components/RequestCard';
import SearchBar from '@/components/SearchBar';
import { Monitor } from 'lucide-react';

export default function PCSoftwaresPage() {
  const items = getAllItems('pc-softwares');
  const title = 'PC Software';
  const description = 'Professional tools and utilities for your PC';

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00c853] to-[#00e676] flex items-center justify-center">
              <Monitor className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-[#666]">{description}</p>
            </div>
          </div>
          <SearchBar items={items} category="pc-softwares" />
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#666] mb-6">No software available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <Card key={item.slug} item={item} category="pc-softwares" />
            ))}
            <RequestCard />
          </div>
        )}
      </div>
    </div>
  );
}