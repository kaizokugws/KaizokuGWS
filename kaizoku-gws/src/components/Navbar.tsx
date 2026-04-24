'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Gamepad2, Search, Monitor, Smartphone, Home } from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Item } from '@/lib/types';
import { formatCategory } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/pc-games', label: 'PC Games', icon: Gamepad2 },
  { href: '/pc-softwares', label: 'Softwares', icon: Monitor },
  { href: '/mobile-apps', label: 'Mobile', icon: Smartphone },
  { href: '/about', label: 'About' },
  { href: '/request', label: 'Request' },
];

interface NavbarProps {
  allItems: Item[];
}

export default function Navbar({ allItems }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allItems
      .filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.aliases?.some(alias => alias.toLowerCase().includes(q)) ||
        item.tags?.some(tag => tag.toLowerCase().includes(q))
      )
      .slice(0, 6);
  }, [searchQuery, allItems]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleResultClick = (item: Item) => {
    const category = item.category || 'pc-games';
    router.push(`/${category}/${item.slug}`);
    setSearchQuery('');
    setSearchOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[#222]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#4FD1FF] to-[#4FD1FF]/60 flex items-center justify-center shadow-[0_0_15px_rgba(79,209,255,0.3)] group-hover:shadow-[0_0_25px_rgba(79,209,255,0.5)] transition-shadow">
              <Gamepad2 className="w-5 h-5 text-[#0B0D10]" />
            </div>
            <span className="text-lg font-bold tracking-tight hidden sm:block">
              KAIZOKU <span className="text-[#4FD1FF]">GWS</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-250 hover:text-[#4FD1FF] ${
                    isActive(link.href)
                      ? 'text-[#4FD1FF]'
                      : 'text-[#9AA4AF]'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:flex items-center relative" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9AA4AF] pointer-events-none" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => searchQuery.trim() && setSearchOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchResults.length > 0) {
                    handleResultClick(searchResults[0]);
                  }
                  if (e.key === 'Escape') setSearchOpen(false);
                }}
                className="w-48 bg-[#111418] border border-[#222] hover:border-[#4FD1FF] rounded-full py-1.5 pl-9 pr-3 text-sm transition-all placeholder:text-[#9AA4AF] text-[#E6EDF3] focus:w-64 focus:outline-none"
              />
            </div>

            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 mt-2 w-64 bg-[#111418] border border-[#222] rounded-lg overflow-hidden shadow-xl z-50"
                >
                  {searchResults.length > 0 ? (
                    searchResults.map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => handleResultClick(item)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-[#161A20] transition-colors text-left"
                      >
                        <div className="w-8 h-8 rounded bg-[#222] overflow-hidden flex-shrink-0">
                          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#E6EDF3] truncate">{item.title}</p>
                          <p className="text-xs text-[#9AA4AF]">{formatCategory(item.category)}</p>
                        </div>
                      </button>
                    ))
                  ) : searchQuery.trim() ? (
                    <div className="p-3 text-sm text-[#9AA4AF]">
                      No results found
                    </div>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            className="md:hidden p-2 text-[#9AA4AF] hover:text-[#4FD1FF] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#111418]/95 backdrop-blur border-t border-[#222]">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-[#4FD1FF] bg-[#4FD1FF]/10'
                    : 'text-[#9AA4AF] hover:text-[#E6EDF3] hover:bg-[#161A20]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}