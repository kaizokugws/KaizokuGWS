import Image from 'next/image';
import { ArrowLeft, Monitor, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { Item } from '@/lib/types';

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
        className="inline-flex items-center gap-2 text-[#888] hover:text-[#ff3e3e] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {category.replace('-', ' ')}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative aspect-[3/5] rounded-xl overflow-hidden bg-[#141414] max-h-[500px] order-1">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-start order-2 lg:pt-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{item.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#141414] rounded-lg border border-[#222]">
              {item.platform === 'PC' ? (
                <Monitor className="w-4 h-4 text-[#ff3e3e]" />
              ) : (
                <Smartphone className="w-4 h-4 text-[#ff3e3e]" />
              )}
              <span className="text-sm">{item.platform}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#141414] rounded-lg border border-[#222]">
              <span className="text-sm text-[#888]">Category:</span>
              <span className="text-sm">{item.category}</span>
            </div>
          </div>

          {about && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <div 
                className="text-[#888] text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: about }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}