'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ScreenshotGalleryProps {
  screenshots: string[];
}

export default function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-[#E6EDF3]">Screenshots</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {screenshots.map((screenshot, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="relative aspect-video rounded-lg overflow-hidden bg-[#111418] border border-[#222] hover:border-[#4FD1FF] transition-colors"
          >
            <Image
              src={screenshot}
              alt={`Screenshot ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 p-2 text-[#9AA4AF] hover:text-[#E6EDF3]"
          >
            <X className="w-6 h-6" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev! - 1));
            }}
            className="absolute left-4 p-2 bg-[#111418] rounded-full hover:bg-[#222] transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-[#E6EDF3]" />
          </button>
          
          <div className="relative w-full max-w-4xl aspect-video">
            <Image
              src={screenshots[selectedIndex]}
              alt={`Screenshot ${selectedIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => ((prev! + 1) % screenshots.length));
            }}
            className="absolute right-4 p-2 bg-[#111418] rounded-full hover:bg-[#222] transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-[#E6EDF3]" />
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-[#9AA4AF]">
            {selectedIndex + 1} / {screenshots.length}
          </div>
        </div>
      )}
    </div>
  );
}