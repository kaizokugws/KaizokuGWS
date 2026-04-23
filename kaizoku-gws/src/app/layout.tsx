import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollProgress, BackToTop } from "@/components/ScrollProgress";
import PageTransition from "@/components/PageTransition";
import ViewTracker from "@/components/ViewTracker";
import { getAllItemsFlat } from "@/lib/content";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kaizoku GWS - Premium Games & Software",
  description: "Your ultimate destination for premium games and software downloads via BitTorrent",
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
      </body>
    </html>
  );
}