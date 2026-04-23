'use client';

import { Calendar, HardDrive, Star, Clock } from 'lucide-react';
import { Item } from '@/lib/types';

interface DownloadInfoProps {
  item: Item;
}

export default function DownloadInfo({ item }: DownloadInfoProps) {
  return (
    <div className="flex flex-wrap gap-4 py-3 px-4 bg-[#161A20] rounded-lg border border-[#222]">
      {item.size && item.size !== 'Unknown' && (
        <div className="flex items-center gap-2 text-sm text-[#9AA4AF]">
          <HardDrive className="w-4 h-4 text-[#4FD1FF]" />
          <span>{item.size}</span>
        </div>
      )}
      {item.rating && item.rating > 0 && (
        <div className="flex items-center gap-2 text-sm text-[#9AA4AF]">
          <Star className="w-4 h-4 text-[#4FD1FF] fill-current" />
          <span>{item.rating}/5</span>
        </div>
      )}
      {item.releaseYear && (
        <div className="flex items-center gap-2 text-sm text-[#9AA4AF]">
          <Calendar className="w-4 h-4 text-[#4FD1FF]" />
          <span>{item.releaseYear}</span>
        </div>
      )}
      {item.lastUpdated && (
        <div className="flex items-center gap-2 text-sm text-[#9AA4AF]">
          <Clock className="w-4 h-4 text-[#4FD1FF]" />
          <span>{item.lastUpdated}</span>
        </div>
      )}
    </div>
  );
}