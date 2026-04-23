import Link from 'next/link';
import Image from 'next/image';
import { Item } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

interface RelatedItemsProps {
  items: Item[];
}

export default function RelatedItems({ items }: RelatedItemsProps) {
  if (items.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#E6EDF3]">You May Also Like</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.slice(0, 4).map((item) => (
          <Link
            key={item.slug}
            href={`/${item.category}/${item.slug}`}
            className="group block"
          >
            <div className="bg-[#111418] rounded-xl overflow-hidden border border-[#222] transition-all duration-300 hover:border-[#4FD1FF] hover:shadow-[0_0_20px_rgba(79,209,255,0.15)]">
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm truncate text-[#E6EDF3] group-hover:text-[#4FD1FF] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#9AA4AF] text-xs mt-1">{item.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}