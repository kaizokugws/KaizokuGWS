# Kaizoku GWS

**Built for Gamers Who Don't Wait** — a premium games and software distribution platform powered by BitTorrent technology. Browse a curated catalog of repacked PC games, PC software, and mobile apps with optimized torrents, clean files, and direct download options.

> **Site**: [https://kaizokugws.com](https://kaizokugws.com)  
> **Contact**: kaizokugws@gmail.com  
> **Instagram**: [@_shreyagws_](https://instagram.com/_shreyagws_)

---

## Features

### Content Catalog
- **100+ PC Games** — curated repacks from FitGirl, DODI, MR DJ, RG Mechanics, CPY, GOG, and more
- **PC Software** — productivity and creative applications
- **Mobile Apps** — Android and iOS applications
- **Rich Metadata** — size, release year, tags, description, screenshots, system requirements, installation guides per item

### Search & Discovery
- **Global Search** — autocomplete search bar in the navbar across all content
- **Category Grid** — text search across titles, aliases, tags, and category names
- **Tag Filtering** — multi-tag filter to narrow down results
- **Year Filter** — filter by release year
- **Sort Options** — alphabetical, newest (release year), recently added (last updated) with ascending/descending toggle
- **Franchise Filter** — filter games by franchise via URL query (`?franchise=`)
- **Trending Carousel** — 3D rotating carousel with drag support, keyboard navigation, autoplay, and pagination

### Item Detail Pages
- **Breadcrumbs** — Home > Category > Item navigation
- **Screenshot Gallery** — image grid with lightbox viewer, prev/next navigation, and image counter
- **System Requirements** — formatted display of minimum and recommended specs
- **Installation Guide** — step-by-step installation instructions rendered from markdown
- **Related Items** — scored by shared slugs, category, and tags

### Download System
- **Multiple Sources** — each game can have multiple repack sources (FitGirl, DODI, etc.)
- **Magnet Links** — BitTorrent magnet links stored as `.txt` files in `public/magnets/`
- **Direct Downloads** — direct HTTP download links supported
- **3-Step Download Modal** — Select Source → Info → Confirm with progress indicator
- **Fallback Fetching** — tries `/links/` first, then `/magnets/` for source files

### User Experience
- **Favorites** — localStorage-based bookmarking with star toggle on any card
- **Recently Viewed** — tracks detail page visits, displayed as a horizontal scroll strip
- **Pagination** — 51 items per page with numbered buttons and ellipsis
- **Scroll Progress Bar** — fixed top bar showing scroll percentage
- **Back to Top** — floating button appears after scrolling past 400px
- **Page Transitions** — fade opacity animations on route changes
- **Scroll Reveal Animations** — IntersectionObserver-based fade/slide/scale animations
- **Search Highlighting** — yellow highlight on matching text in card titles
- **Skeleton Loading** — shimmer placeholder animations during page load

### Interactive UI
- **Hero Section** — animated gradient with branding and CTA buttons
- **Features Strip** — highlights: Fast Downloads, Safe & Secure, Premium Quality
- **Featured Game** — large 2-column layout with image and description
- **Franchises Grid** — 20+ game franchises with slideshow images
- **Category Navigation** — quick links to PC Games, PC Software, Mobile Apps
- **Latest Releases** — 4-column grid of newest additions
- **Request Form** — EmailJS-powered contact form for game/software requests with success/error states
- **Dark Theme** — deep dark background (`#0B0D10`), glassmorphism panels, cyan accent (`#4FD1FF`)

### Static Pages
- **About** — what is Kaizoku GWS, how it works, disclaimer
- **Privacy Policy** — data collection, cookies, third-party services
- **404 Page** — styled not-found page with navigation buttons
- **Error Boundary** — client-side error fallback with retry option

### SEO & Performance
- **Dynamic Sitemap** — auto-generated from all categories and items
- **Per-Page Metadata** — titles and descriptions via Next.js Metadata API
- **Dynamic OG Tags** — per-item Open Graph metadata
- **Static Generation** — all pages pre-rendered at build time
- **Robots.txt** — allows all crawlers, disallows `/api/`, points to sitemap

---

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | [Next.js](https://nextjs.org/) (App Router) | `16.2.4` |
| **UI Library** | [React](https://react.dev/) | `19.2.4` |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `^5` |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `^4` |
| **Icons** | [Lucide React](https://lucide.dev/) | `^1.8.0` |
| **Class Utilities** | [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | `2.1.1` / `3.5.0` |
| **Markdown** | [gray-matter](https://github.com/jonschlinkert/gray-matter) + [remark](https://remark.js.org/) + [remark-html](https://github.com/remarkjs/remark-html) | `4.0.3` / `15.0.1` / `16.0.1` |
| **Email** | [EmailJS](https://www.emailjs.com/) | `^4.4.1` |
| **Server Guard** | [server-only](https://www.npmjs.com/package/server-only) | `^0.0.1` |
| **Linting** | [ESLint](https://eslint.org/) + `eslint-config-next` | `^9` / `16.2.4` |

---

## Architecture & Data Flow

### Project Structure

```
kaizoku-gws/                    # Next.js application root
├── public/
│   ├── magnets/                # Magnet link .txt files
│   └── links/                  # Direct download link .txt files
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (navbar, footer, background)
│   │   ├── page.tsx            # Homepage
│   │   ├── sitemap.ts          # Dynamic sitemap
│   │   ├── pc-games/           # PC Games listing + [slug] detail
│   │   ├── pc-softwares/       # PC Software listing + [slug] detail
│   │   ├── mobile-apps/        # Mobile Apps listing + [slug] detail
│   │   ├── request/            # Contact/request form
│   │   ├── about/              # About page
│   │   └── privacy/            # Privacy policy
│   ├── components/             # Reusable React components
│   ├── context/                # React context providers
│   ├── lib/
│   │   ├── types.ts            # TypeScript interfaces
│   │   ├── content.ts          # Data layer (read, cache, parse, filter)
│   │   ├── hooks.ts            # Client hooks (favorites, recently viewed)
│   │   ├── utils.ts            # Utility functions
│   │   └── franchises.ts       # Franchise definitions
│   └── content/                # Markdown content files
│       ├── pc-games/           # ~100+ game markdown files
│       ├── pc-softwares/       # Software markdown files
│       └── mobile-apps/        # Mobile app placeholders
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── package.json
```

### Design Patterns

- **Static Site Generation (SSG)** — all pages statically generated at build time via `generateStaticParams()`
- **Server/Client Component Split** — Server Components fetch data; Client Components handle interactivity
- **Markdown-as-Database** — no traditional database. Content lives as Markdown files with YAML frontmatter, read via Node.js `fs`
- **In-Memory Caching** — `content.ts` uses `Map`-based caches with 60-second TTL
- **Repository Pattern** — `content.ts` is the centralized data repository with read/cache/query/filter/sort methods
- **Context Provider** — `BackgroundContext` controls DotWave canvas animation visibility

### Data Flow

```
1. BROWSER REQUEST
       │
2. Next.js App Router matches route
       │
3. Root layout renders:
   BackgroundProvider → DotWaveBackground
   ScrollProgress
   Navbar (allItems for search)
   PageTransition > {children}
   Footer
   ViewTracker (recent views)
       │
4. Page Server Components call content.ts:
   getAllItems('pc-games')        → .md → frontmatter
   getParsedItemBySlug(slug)      → .md → HTML sections
   getTrendingItems() / getFeaturedItem()
   getLatestReleases() / getRelatedItems()
       │
5. Data passed as props to Client Components
       │
6. Client Components handle interactivity:
   CategoryGrid      → search, filter, sort, pagination
   DownloadSection   → magnet fetch → 3-step modal → download
   ScreenshotGallery → lightbox viewer
   FavoritesButton   → localStorage toggle
   TrendingCarousel  → drag/autoplay 3D carousel
```

### Content Model

Items are Markdown files with YAML frontmatter:

```yaml
---
title: "Cyberpunk 2077"
slug: "cyberpunk-2077"
platform: "PC"
category: "pc-games"
tags: ["Action", "RPG", "Open-World"]
featured: true
trending: true
sources:
  - name: "FitGirl Repack"
    file: "cyberpunk-2077-fitgirl"
  - name: "DODI Repack"
    file: "cyberpunk-2077-dodi"
---
```

> **Note**: No API routes, no authentication, no user accounts, no database — fully static.

---

## Getting Started

```bash
cd kaizoku-gws
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

### Environment Variables

Copy `.env.local.example` to `.env.local` and configure EmailJS credentials:

```
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
```

---

## License

All game/software content belongs to their respective owners. This site provides repackaged distributions with optimized compression for archival and convenience purposes.
