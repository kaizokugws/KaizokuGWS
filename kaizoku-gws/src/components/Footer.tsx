import Link from 'next/link';
import { Gamepad2, Mail, Send, Code } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#222] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff3e3e] to-[#ff6b00] flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">KAIZOKU <span className="text-[#ff3e3e]">GWS</span></span>
            </Link>
            <p className="text-[#888] text-sm max-w-md">
              Your ultimate destination for premium games and software downloads. Fast, secure, and reliable BitTorrent-powered distribution platform.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/pc-games" className="text-[#888] hover:text-[#ff3e3e] text-sm transition-colors">PC Games</Link></li>
              <li><Link href="/pc-softwares" className="text-[#888] hover:text-[#ff3e3e] text-sm transition-colors">PC Software</Link></li>
              <li><Link href="/mobile-apps" className="text-[#888] hover:text-[#ff3e3e] text-sm transition-colors">Mobile Apps</Link></li>
              <li><Link href="/request" className="text-[#888] hover:text-[#ff3e3e] text-sm transition-colors">Request</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-[#888] hover:text-[#ff3e3e] text-sm transition-colors">About Us</Link></li>
              <li><Link href="/privacy" className="text-[#888] hover:text-[#ff3e3e] text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/request" className="text-[#888] hover:text-[#ff3e3e] text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#222] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#666] text-sm">
            © 2024 Kaizoku GWS. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[#666] hover:text-[#ff3e3e] transition-colors">
              <Send className="w-5 h-5" />
            </a>
            <a href="#" className="text-[#666] hover:text-[#ff3e3e] transition-colors">
              <Code className="w-5 h-5" />
            </a>
            <a href="#" className="text-[#666] hover:text-[#ff3e3e] transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}