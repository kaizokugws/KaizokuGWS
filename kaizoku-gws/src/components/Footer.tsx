import Link from 'next/link';
import { Gamepad2, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B0D10] border-t border-[#222] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#4FD1FF] to-[#4FD1FF]/60 flex items-center justify-center shadow-[0_0_15px_rgba(79,209,255,0.3)] group-hover:shadow-[0_0_25px_rgba(79,209,255,0.5)] transition-shadow">
                <Gamepad2 className="w-5 h-5 text-[#0B0D10]" />
              </div>
              <span className="text-lg font-bold">KAIZOKU <span className="text-[#4FD1FF]">GWS</span></span>
            </Link>
            <p className="text-[#9AA4AF] text-sm max-w-md">
              Your ultimate destination for premium games and software downloads. Fast, secure, and reliable BitTorrent-powered distribution platform.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#E6EDF3]">Browse</h4>
            <ul className="space-y-2">
              <li><Link href="/pc-games" className="text-[#9AA4AF] hover:text-[#4FD1FF] text-sm transition-colors">PC Games</Link></li>
              <li><Link href="/pc-softwares" className="text-[#9AA4AF] hover:text-[#4FD1FF] text-sm transition-colors">PC Software</Link></li>
              <li><Link href="/mobile-apps" className="text-[#9AA4AF] hover:text-[#4FD1FF] text-sm transition-colors">Mobile Apps</Link></li>
              <li><Link href="/request" className="text-[#9AA4AF] hover:text-[#4FD1FF] text-sm transition-colors">Request</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#E6EDF3]">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-[#9AA4AF] hover:text-[#4FD1FF] text-sm transition-colors">About Us</Link></li>
              <li><Link href="/privacy" className="text-[#9AA4AF] hover:text-[#4FD1FF] text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/request" className="text-[#9AA4AF] hover:text-[#4FD1FF] text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#222] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#9AA4AF] text-sm">
            © {new Date().getFullYear()} Kaizoku GWS. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:kaizokugws@gmail.com" className="text-[#9AA4AF] hover:text-[#4FD1FF] transition-colors flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span className="text-sm">kaizokugws@gmail.com</span>
            </a>
            <a href="https://www.instagram.com/_shreyasgws_/" target="_blank" rel="noopener noreferrer" className="text-[#9AA4AF] hover:text-[#4FD1FF] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.384-2.615-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}