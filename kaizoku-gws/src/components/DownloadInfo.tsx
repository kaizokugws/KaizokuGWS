import { HardDrive, Star, Calendar, Clock } from 'lucide-react';
import { Item } from '@/lib/types';

interface DownloadInfoProps {
  item: Item;
}

export default function DownloadInfo({ item }: DownloadInfoProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 py-4 px-5 bg-[#111418] rounded-lg border border-[#222]">
      <div className="flex items-center gap-2 text-[#9AA4AF]">
        <HardDrive className="w-4 h-4" />
        <span className="text-sm">{item.size || 'Unknown'}</span>
      </div>

      <span className="text-[#222]">|</span>

      <div className="flex items-center gap-2 text-[#9AA4AF]">
        <Star className="w-4 h-4 text-[#4FD1FF] fill-[#4FD1FF]" />
        <span className="text-sm">{item.rating || 0}/5</span>
      </div>

      <span className="text-[#222]">|</span>

      <div className="flex items-center gap-2 text-[#9AA4AF]">
        <Calendar className="w-4 h-4" />
        <span className="text-sm">{item.releaseYear || 'Unknown'}</span>
      </div>

      <span className="text-[#222]">|</span>

      <div className="flex items-center gap-2 text-[#9AA4AF]">
        <Clock className="w-4 h-4" />
        <span className="text-sm">
          {item.lastUpdated
            ? new Date(item.lastUpdated).toLocaleDateString()
            : 'Unknown'}
        </span>
      </div>
    </div>
  );
}