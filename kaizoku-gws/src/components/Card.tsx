import Link from 'next/link';
import Image from 'next/image';
import { Item } from '@/lib/types';

interface CardProps {
  item: Item;
  category: string;
}

export default function Card({ item, category }: CardProps) {
  const href = `/${category}/${item.slug}`;

  return (
    <Link href={href} className="group block">
      <div className="bg-[#141414] rounded-xl overflow-hidden border border-[#222] transition-all duration-300 hover:border-[#ff3e3e] hover:shadow-[0_0_20px_rgba(255,62,62,0.15)]">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg truncate group-hover:text-[#ff3e3e] transition-colors">
            {item.title}
          </h3>
          <p className="text-[#666] text-sm mt-1">{item.category}</p>
        </div>
      </div>
    </Link>
  );
}