import Link from 'next/link';
import { ArrowRight, Gamepad2, Monitor, Smartphone, Star, Zap, Shield } from 'lucide-react';
import { getAllItems } from '@/lib/content';
import { Item } from '@/lib/types';
import { PerspectiveCarousel } from '@/components/PerspectiveCarousel';

const categories = [
  {
    href: '/pc-games',
    icon: Gamepad2,
    title: 'PC Games',
    description: 'Premium AAA and indie games for PC',
    gradient: 'from-[#ff3e3e] to-[#ff6b00]',
  },
  {
    href: '/pc-softwares',
    icon: Monitor,
    title: 'PC Software',
    description: 'Professional tools and utilities',
    gradient: 'from-[#00c853] to-[#00e676]',
  },
  {
    href: '/mobile-apps',
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'APK files for Android devices',
    gradient: 'from-[#2979ff] to-[#00b0ff]',
  },
];

const trendingOrder = [
  'gta-v',
  'elden-ring',
  'rdr2',
  'ghost-of-tsushima',
  'dark-souls-3',
  'death-stranding',
  'gta-5-enhanced',
  'days-gone-remastered',
  'witcher-3',
  'sekiro',
];

export default function Home() {
  const pcGames = getAllItems('pc-games');
  const trendingGames = trendingOrder
    .map((slug) => pcGames.find((g) => g.slug === slug))
    .filter((g): g is Item => g !== undefined)
    .slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#0a0a0a] to-[#0a0a0a]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff3e3e] rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff6b00] rounded-full blur-[128px]" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#141414]/80 backdrop-blur border border-[#222] rounded-full mb-8 animate-fade-in">
            <Zap className="w-4 h-4 text-[#ff3e3e]" />
            <span className="text-sm text-[#888]">Fast & Secure BitTorrent Downloads</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            KAIZOKU <span className="text-[#ff3e3e]">GWS</span>
          </h1>
          
          <p className="text-xl text-[#888] max-w-2xl mx-auto mb-12 animate-slide-up stagger-1">
            Your ultimate destination for premium games and software. 
            Lightning-fast downloads powered by BitTorrent technology.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-2">
            <Link
              href="/pc-games"
              className="group flex items-center gap-2 bg-gradient-to-r from-[#ff3e3e] to-[#ff6b00] hover:from-[#ff5e5e] hover:to-[#ff7d20] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,62,62,0.4)]"
            >
              Browse Games
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 border border-[#333] hover:border-[#ff3e3e] text-[#888] hover:text-white py-3 px-8 rounded-lg transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#141414] rounded-xl p-6 border border-[#222] hover:border-[#ff3e3e] transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#ff3e3e]/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[#ff3e3e]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Downloads</h3>
              <p className="text-[#666] text-sm">BitTorrent-powered downloads ensure maximum speed and reliability.</p>
            </div>
            <div className="bg-[#141414] rounded-xl p-6 border border-[#222] hover:border-[#ff6b00] transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#ff6b00]/20 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#ff6b00]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Safe & Secure</h3>
              <p className="text-[#666] text-sm">All files verified and safe for download. No malware or unwanted software.</p>
            </div>
            <div className="bg-[#141414] rounded-xl p-6 border border-[#222] hover:border-[#ff3e3e] transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#ff3e3e]/20 flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-[#ff3e3e]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
              <p className="text-[#666] text-sm">Curated collection of the best games and software.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group relative overflow-hidden rounded-2xl bg-[#141414] border border-[#222] hover:border-transparent transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className="relative p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <cat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-[#ff3e3e] transition-colors">{cat.title}</h3>
                  <p className="text-[#666]">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      {trendingGames.length > 0 && (
        <section className="py-20 bg-[#0f0f0f]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">Trending Games</h2>
              <Link
                href="/pc-games"
                className="flex items-center gap-2 text-[#ff3e3e] hover:text-[#ff5e5e] transition-colors"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <PerspectiveCarousel items={trendingGames} category="pc-games" className="px-12" />
          </div>
        </section>
      )}
    </div>
  );
}