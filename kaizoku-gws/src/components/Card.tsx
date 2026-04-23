import Link from 'next/link';
import Image from 'next/image';
import { Item } from '@/lib/types';

interface CardProps {
  item: Item;
  category: string;
  featured?: boolean;
}

export default function Card({ item, category, featured = false }: CardProps) {
  const href = `/${category}/${item.slug}`;

  if (featured) {
    return (
      <Link href={href} className="group block">
        <div className="relative h-72 rounded-2xl overflow-hidden bg-[#161A20] border border-[#222] transition-all duration-300 hover:border-[#4FD1FF] hover:shadow-[0_0_30px_rgba(79,209,255,0.15)]">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 text-xs font-medium bg-[#4FD1FF]/20 text-[#4FD1FF] rounded-full">
                {item.category}
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#E6EDF3] group-hover:text-[#4FD1FF] transition-colors">
              {item.title}
            </h3>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="group block">
      <div className="bg-[#111418] rounded-xl overflow-hidden border border-[#222] transition-all duration-300 hover:border-[#4FD1FF] hover:shadow-[0_0_20px_rgba(79,209,255,0.15)] hover:-translate-y-1">
        <div className="relative h-44 overflow-hidden">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-base truncate text-[#E6EDF3] group-hover:text-[#4FD1FF] transition-colors">
            {item.title}
          </h3>
          <p className="text-[#9AA4AF] text-sm mt-1">{item.category}</p>
        </div>
      </div>
    </Link>
  );
}