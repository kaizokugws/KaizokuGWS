'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Gamepad2, Search, Monitor, Smartphone, Home } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/pc-games', label: 'PC Games', icon: Gamepad2 },
  { href: '/pc-softwares', label: 'Softwares', icon: Monitor },
  { href: '/mobile-apps', label: 'Mobile', icon: Smartphone },
  { href: '/about', label: 'About' },
  { href: '/request', label: 'Request' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
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
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all duration-250 hover:text-[#4FD1FF] ${
                  isActive(link.href)
                    ? 'text-[#4FD1FF]'
                    : 'text-[#9AA4AF]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className={`relative transition-all duration-300 ${searchExpanded ? 'w-64' : 'w-40'}`}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9AA4AF] pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchExpanded(true)}
                onBlur={() => {
                  if (!searchQuery) setSearchExpanded(false);
                }}
                className="w-full bg-[#111418] border border-[#222] rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-[#4FD1FF] transition-all duration-300 placeholder:text-[#9AA4AF]"
              />
            </div>
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
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9AA4AF] pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#161A20] border border-[#222] rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#4FD1FF] transition-colors placeholder:text-[#9AA4AF]"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}