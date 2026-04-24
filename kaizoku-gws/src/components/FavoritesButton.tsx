'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useFavorites } from '@/lib/hooks';

interface FavoriteButtonProps {
  slug: string;
  title: string;
  thumbnail: string;
  category: string;
  className?: string;
}

export function FavoriteButton({ slug, title, thumbnail, category, className = '' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  
  const favorite = isFavorite(slug);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite({ slug, title, thumbnail, category });
  };
  
  if (!isLoaded) {
    return <div className="w-8 h-8" />;
  }
  
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className={`absolute top-2 left-2 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all ${
        favorite 
          ? 'bg-[#4FD1FF] text-[#0B0D10]' 
          : 'bg-[#111418]/80 text-[#9AA4AF] hover:text-[#4FD1FF]'
      } ${className}`}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Star className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
    </motion.button>
  );
}

export function FavoritesList() {
  const { items, isLoaded, clearItems } = useFavorites();
  
  if (!isLoaded || items.length === 0) return null;
  
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-[#4FD1FF] fill-current" />
          <h2 className="text-lg font-semibold text-[#E6EDF3]">Your Favorites</h2>
        </div>
        <button
          onClick={clearItems}
          className="text-xs text-[#9AA4AF] hover:text-[#4FD1FF] transition-colors"
        >
          Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item) => (
          <a
            key={item.slug}
            href={`/${item.category}/${item.slug}`}
            className="block group"
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-[#222] group-hover:border-[#4FD1FF] transition-colors">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-xs text-white truncate font-medium">
                  {item.title}
                </p>
              </div>
              <div className="absolute top-2 right-2">
                <Star className="w-4 h-4 text-[#4FD1FF] fill-current" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}