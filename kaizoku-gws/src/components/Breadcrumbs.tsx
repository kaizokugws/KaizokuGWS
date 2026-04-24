'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { formatCategory } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-1 text-sm ${className}`}>
      <Link
        href="/"
        className="flex items-center gap-1 text-[#9AA4AF] hover:text-[#4FD1FF] transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <ChevronRight className="w-4 h-4 text-[#9AA4AF]/50" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-[#9AA4AF] hover:text-[#4FD1FF] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#E6EDF3] font-medium truncate max-w-[200px]">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function CategoryBreadcrumbs({ category }: { category: string }) {
  const categoryLabel = formatCategory(category);
  const categoryUrl = `/${category}`;
  
  return (
    <Breadcrumbs
      items={[{ label: categoryLabel, href: categoryUrl }]}
    />
  );
}

export function ItemBreadcrumbs({ item, category }: { item: string; category: string }) {
  const categoryLabel = formatCategory(category);
  const categoryUrl = `/${category}`;
  
  return (
    <Breadcrumbs
      items={[
        { label: categoryLabel, href: categoryUrl },
        { label: item }
      ]}
    />
  );
}