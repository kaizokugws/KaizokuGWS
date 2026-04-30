import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollProgress, BackToTop } from "@/components/ScrollProgress";
import PageTransition from "@/components/PageTransition";
import ViewTracker from "@/components/ViewTracker";
import DotWaveBackground from "@/components/DotWaveBackground";
import { BackgroundProvider } from "@/context/BackgroundContext";
import { getAllItemsFlat } from "@/lib/content";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Kaizoku GWS - Premium Games & Software",
    template: "%s | Kaizoku GWS",
  },
  description: "Your ultimate destination for premium games and software downloads via BitTorrent",
  keywords: ["games", "software", "download", "torrent", "pc games", "repack"],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allItems = getAllItemsFlat();
  
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col bg-[#0B0D10]`}>
        <BackgroundProvider>
          <DotWaveBackground />
          <div className="relative z-10 flex flex-col min-h-full">
            <ScrollProgress />
            <Navbar allItems={allItems} />
            <main className="flex-1 pt-16">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
            <BackToTop />
            <ViewTracker />
          </div>
        </BackgroundProvider>
      </body>
    </html>
  );
}