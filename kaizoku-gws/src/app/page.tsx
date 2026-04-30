import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Gamepad2, Monitor, Smartphone, Zap, Shield, Star, Download, Users } from 'lucide-react';
import { getTrendingItems, getFeaturedItem, getPopularItems, getRecentlyAdded, getAllItems } from '@/lib/content';
import { TrendingCarousel } from '@/components/TrendingCarousel';
import Card from '@/components/Card';
import FranchiseGrid from '@/components/FranchiseGrid';

const GENERIC_DESCRIPTION = "Discover the ultimate gaming experience. Download now and dive into an epic adventure.";

function truncateDescription(text: string, maxLength: number): string {
  if (!text) return GENERIC_DESCRIPTION;
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export default function Home() {
  const pcGames = getAllItems('pc-games');
  
  const trendingGames = getTrendingItems('pc-games');
  const featuredGame = getFeaturedItem('pc-games');
  const popularGames = getPopularItems('pc-games', 8);
  const recentGames = getRecentlyAdded('pc-games', 8);
  
  const featuredDescription = featuredGame?.description 
    ? truncateDescription(featuredGame.description, 120) 
    : GENERIC_DESCRIPTION;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#161A20] via-[#0B0D10] to-[#0B0D10]" />
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4FD1FF] rounded-full blur-[150px] opacity-30 animate-pulse-glow" />
           <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#4FD1FF] rounded-full blur-[120px] opacity-15 animate-pulse" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide mb-6 animate-slide-up leading-tight">
              KAIZOKU <span className="bg-gradient-to-r from-[#4FD1FF] to-[#22D3EE] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">GWS</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#9AA4AF]/90 max-w-xl mx-auto lg:mx-0 mb-10 animate-slide-up stagger-1 font-light leading-relaxed">
              Built for Gamers Who Don&apos;t Wait.
            </p>

            <p className="text-sm md:text-base text-[#9AA4AF]/70 max-w-lg mx-auto lg:mx-0 mb-10 animate-slide-up stagger-1">
              Curated PC games and software. No clutter, no nonsense — just fast, clean downloads that work.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-slide-up stagger-2">
              <Link
                href="/pc-games"
                className="group flex items-center gap-2.5 bg-gradient-to-r from-[#22D3EE] to-[#4FD1FF] hover:from-[#6ED8FF] hover:to-[#22D3EE] text-[#0B0D10] font-bold py-3.5 px-8 rounded-xl transition-all duration-300 hover:shadow-[0_0_35px_rgba(34,211,238,0.4)] hover:-translate-y-0.5"
              >
                <span className="text-lg">🎮</span> Browse Games
              </Link>
              <Link
                href="/pc-softwares"
                className="flex items-center gap-2.5 border border-[#22D3EE]/40 hover:border-[#22D3EE] text-[#9AA4AF] hover:text-[#E6EDF3] hover:bg-[#22D3EE]/5 py-3.5 px-8 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="text-lg">🧰</span> Get Software
              </Link>
            </div>

            <div className="mt-6 text-center lg:text-left animate-slide-up stagger-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#111418]/80 backdrop-blur border border-[#222] rounded-full">
                <span className="text-sm text-[#E6EDF3]/80">⚡ Optimized Torrents • Clean Files • No BS</span>
              </div>
            </div>

            <div className="mt-5 text-center lg:text-left animate-slide-up stagger-3">
              <div className="inline-flex items-center gap-6 text-xs text-[#E6EDF3]/40 font-medium tracking-wide">
                <span>✔ Pre-installed builds</span>
                <span>✔ No broken links</span>
                <span>✔ Regular updates</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block animate-slow-zoom">
            <div className="relative w-full max-w-md mx-auto flex justify-center">
              <Image
                src="/images/luffy image.png"
                alt="Featured"
                width={500}
                height={500}
                className="object-contain rounded-full shadow-[0_0_60px_rgba(79,209,255,0.2)] mix-blend-normal animate-wobble"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features - moved to above Request CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111418] rounded-xl p-6 border border-[#222] hover:border-[#4FD1FF] transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,209,255,0.1)]">
              <div className="w-12 h-12 rounded-lg bg-[#4FD1FF]/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[#4FD1FF]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#E6EDF3]">Fast Downloads</h3>
              <p className="text-[#9AA4AF] text-sm">BitTorrent-powered downloads ensure maximum speed and reliability.</p>
            </div>
            <div className="bg-[#111418] rounded-xl p-6 border border-[#222] hover:border-[#4FD1FF] transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,209,255,0.1)]">
              <div className="w-12 h-12 rounded-lg bg-[#4FD1FF]/20 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#4FD1FF]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#E6EDF3]">Safe & Secure</h3>
              <p className="text-[#9AA4AF] text-sm">All files verified and safe for download. No malware or unwanted software.</p>
            </div>
            <div className="bg-[#111418] rounded-xl p-6 border border-[#222] hover:border-[#4FD1FF] transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,209,255,0.1)]">
              <div className="w-12 h-12 rounded-lg bg-[#4FD1FF]/20 flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-[#4FD1FF]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#E6EDF3]">Premium Quality</h3>
              <p className="text-[#9AA4AF] text-sm">Curated collection of the best games and software.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      {trendingGames.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="glass-panel rounded-3xl p-8 border border-[var(--glass-border)] border-t-[var(--glass-border-strong)] shadow-[var(--glass-shadow)]">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-heading-2 text-[#E6EDF3]">Trending Games</h2>
                <Link
                  href="/pc-games"
                  className="flex items-center gap-2 text-[#4FD1FF] hover:text-[#6ED8FF] transition-colors"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <TrendingCarousel items={trendingGames} category="pc-games" className="px-12" />
            </div>
          </div>
        </section>
      )}

{/* Featured */}
      {featuredGame && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="relative overflow-hidden rounded-3xl border border-[var(--glass-border)] shadow-[var(--glass-shadow)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#080810]/80 via-[#080810]/50 to-[rgba(79,209,255,0.08)] backdrop-blur-sm z-0" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px]">
                  <Image
                    src={featuredGame.thumbnail}
                    alt={featuredGame.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent lg:bg-gradient-to-l lg:to-transparent to-[#080810]/60" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-sm text-[#4FD1FF] uppercase tracking-wider mb-2">Featured</span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#E6EDF3]">{featuredGame.title}</h2>
                  <p className="text-[#9AA4AF] mb-6">
                    {featuredDescription}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/pc-games/${featuredGame.slug}`}
                      className="flex items-center gap-2 bg-gradient-to-r from-[#4FD1FF] to-[#4FD1FF] hover:from-[#6ED8FF] hover:to-[#6ED8FF] text-[#0B0D10] font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,209,255,0.4)]"
                    >
                      <Download className="w-5 h-5" />
                      Download Now
                    </Link>
                    <Link
                      href={`/pc-games/${featuredGame.slug}`}
                      className="flex items-center gap-2 border border-[#222] hover:border-[#4FD1FF] text-[#9AA4AF] hover:text-[#E6EDF3] py-3 px-6 rounded-lg transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#E6EDF3]">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/pc-games"
              className="group relative overflow-hidden rounded-2xl bg-[#111418] border border-[#222] hover:border-[#4FD1FF] transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,209,255,0.15)] hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#4FD1FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4FD1FF] to-[#4FD1FF]/60 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(79,209,255,0.3)]">
                  <Gamepad2 className="w-8 h-8 text-[#0B0D10]" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-[#E6EDF3] group-hover:text-[#4FD1FF] transition-colors">PC Games</h3>
                <p className="text-[#9AA4AF]">Premium AAA and indie games for PC</p>
              </div>
            </Link>
            <Link
              href="/pc-softwares"
              className="group relative overflow-hidden rounded-2xl bg-[#111418] border border-[#222] hover:border-[#4FD1FF] transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,209,255,0.15)] hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#4FD1FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4FD1FF] to-[#4FD1FF]/60 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(79,209,255,0.3)]">
                  <Monitor className="w-8 h-8 text-[#0B0D10]" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-[#E6EDF3] group-hover:text-[#4FD1FF] transition-colors">PC Software</h3>
                <p className="text-[#9AA4AF]">Professional tools and utilities</p>
              </div>
            </Link>
            <Link
              href="/mobile-apps"
              className="group relative overflow-hidden rounded-2xl bg-[#111418] border border-[#222] hover:border-[#4FD1FF] transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,209,255,0.15)] hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#4FD1FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4FD1FF] to-[#4FD1FF]/60 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(79,209,255,0.3)]">
                  <Smartphone className="w-8 h-8 text-[#0B0D10]" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-[#E6EDF3] group-hover:text-[#4FD1FF] transition-colors">Mobile Apps</h3>
                <p className="text-[#9AA4AF]">APK files for Android devices</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-[#E6EDF3]">Popular</h2>
            <Link
              href="/pc-games"
              className="flex items-center gap-2 text-[#4FD1FF] hover:text-[#6ED8FF] transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularGames.map((item) => (
              <Card key={item.slug} item={item} category="pc-games" />
            ))}
          </div>
        </div>
      </section>

      {/* Franchises */}
      <FranchiseGrid />

      {/* Request CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-[#111418] rounded-2xl p-12 border border-[#222] hover:border-[#4FD1FF] transition-all duration-300 hover:shadow-[0_0_40px_rgba(79,209,255,0.1)]">
            <div className="w-16 h-16 rounded-full bg-[#4FD1FF]/20 flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-[#4FD1FF]" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-[#E6EDF3]">Can&apos;t find what you&apos;re looking for?</h2>
            <p className="text-[#9AA4AF] mb-8">
              We constantly update our library with new releases. Request a game or software and we&apos;ll try to get it for you.
            </p>
            <Link
              href="/request"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4FD1FF] to-[#4FD1FF] hover:from-[#6ED8FF] hover:to-[#6ED8FF] text-[#0B0D10] font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,209,255,0.4)]"
            >
              Request a Game or Software
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}