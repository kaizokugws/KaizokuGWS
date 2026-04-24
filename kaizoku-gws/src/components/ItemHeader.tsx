import Image from 'next/image';
import { ArrowLeft, Monitor, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { Item } from '@/lib/types';
import { formatCategory } from '@/lib/utils';

interface ItemHeaderProps {
  item: Item;
  category: string;
  about?: string;
}

export default function ItemHeader({ item, category, about }: ItemHeaderProps) {
  return (
    <div className="mb-8">
      <Link
        href={`/${category}`}
        className="inline-flex items-center gap-2 text-[#9AA4AF] hover:text-[#4FD1FF] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {formatCategory(category)}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative aspect-[3/5] rounded-xl overflow-hidden bg-[#111418] max-h-[500px] order-1">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-start order-2 lg:pt-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#E6EDF3]">{item.title}</h1>
          
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-1 text-xs bg-[#4FD1FF]/10 text-[#4FD1FF] rounded-full border border-[#4FD1FF]/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#111418] rounded-lg border border-[#222]">
              {item.platform === 'PC' ? (
                <Monitor className="w-4 h-4 text-[#4FD1FF]" />
              ) : (
                <Smartphone className="w-4 h-4 text-[#4FD1FF]" />
              )}
              <span className="text-sm text-[#E6EDF3]">{item.platform}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#111418] rounded-lg border border-[#222]">
              <span className="text-sm text-[#9AA4AF]">Category:</span>
              <span className="text-sm text-[#E6EDF3]">{formatCategory(item.category)}</span>
            </div>
          </div>

          {about && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-[#E6EDF3]">About</h3>
              <div 
                className="text-[#9AA4AF] text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: about }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}