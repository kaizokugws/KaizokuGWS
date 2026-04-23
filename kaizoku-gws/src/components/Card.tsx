'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Item } from '@/lib/types';

interface CardProps {
  item: Item;
  category: string;
  showTags?: boolean;
}

export default function Card({ item, category, showTags = false }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const href = `/${category}/${item.slug}`;

  const displayTags = useMemo(() => {
    return item.tags?.slice(0, 3) || [];
  }, [item.tags]);

  return (
    <Link 
      href={href} 
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        whileHover={{ scale: 1.03, y: -4 }}
        transition={{ duration: 0.2 }}
        className="bg-[#111418] rounded-xl overflow-hidden border border-[#222] transition-all duration-300 hover:border-[#4FD1FF] hover:shadow-[0_0_30px_rgba(79,209,255,0.15)]"
      >
        <div className="relative h-48 overflow-hidden flex items-center justify-center bg-[#0B0D10]">
          <div className={`absolute inset-0 bg-[#161A20] transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} />
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className={`object-contain transition-all duration-300 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            sizes="(max-width: 768px) 100vw, 25vw"
            onLoad={() => setImageLoaded(true)}
          />
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-[#0B0D10]/60 to-transparent transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`} 
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-base truncate text-[#E6EDF3] group-hover:text-[#4FD1FF] transition-colors">
            {item.title}
          </h3>
          <p className="text-[#9AA4AF] text-sm mt-1">{item.category}</p>
          
          {showTags && displayTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {displayTags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-2 py-0.5 text-xs bg-[#161A20] text-[#9AA4AF] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}