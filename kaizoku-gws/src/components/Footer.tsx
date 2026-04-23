import Link from 'next/link';
import { Gamepad2, Instagram, Mail } from 'lucide-react';

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
            © 2026 Kaizoku GWS. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:kaizokugws@gmail.com" className="text-[#9AA4AF] hover:text-[#4FD1FF] transition-colors flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span className="text-sm">kaizokugws@gmail.com</span>
            </a>
            <a href="https://instagram.com/_shreyasgws_" target="_blank" rel="noopener noreferrer" className="text-[#9AA4AF] hover:text-[#4FD1FF] transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}