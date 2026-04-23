import { Gamepad2, Download, Shield, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-[#E6EDF3]">About Kaizoku GWS</h1>
        
        <div className="space-y-8">
          <section className="bg-[#111418] rounded-xl p-6 border border-[#222]">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#E6EDF3]">
              <Gamepad2 className="w-6 h-6 text-[#4FD1FF]" />
              What is Kaizoku GWS?
            </h2>
            <p className="text-[#9AA4AF] leading-relaxed">
              Kaizoku GWS is a premium gaming and software distribution platform powered by BitTorrent technology. 
              We provide fast, reliable, and secure downloads for a curated collection of games and software. 
              Our &quot;GWS&quot; stands for Game WareHouse System - your one-stop destination for all your gaming needs.
            </p>
          </section>

          <section className="bg-[#111418] rounded-xl p-6 border border-[#222]">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#E6EDF3]">
              <Zap className="w-6 h-6 text-[#4FD1FF]" />
              How It Works
            </h2>
            <div className="space-y-4 text-[#9AA4AF]">
              <p>
                1. Browse our collection of games and software across different categories
              </p>
              <p>
                2. Find what you&apos;re looking for using our search and filter features
              </p>
              <p>
                3. Click the download button to initiate the BitTorrent download
              </p>
              <p>
                4. Your BitTorrent client will handle the download automatically
              </p>
              <p>
                5. Enjoy your games and software!
              </p>
            </div>
          </section>

          <section className="bg-[#111418] rounded-xl p-6 border border-[#222]">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#E6EDF3]">
              <Shield className="w-6 h-6 text-[#4FD1FF]" />
              Important Disclaimer
            </h2>
            <p className="text-[#9AA4AF] leading-relaxed">
              Kaizoku GWS is a distribution platform that provides access to content via BitTorrent protocol. 
              All files are uploaded by users and we cannot guarantee the authenticity or safety of individual files. 
              Please ensure you have a reputable antivirus installed and always verify downloads before running them.
              We do not host any copyrighted material directly - our platform facilitates peer-to-peer sharing 
              through the BitTorrent protocol.
            </p>
          </section>

          <section className="bg-[#111418] rounded-xl p-6 border border-[#222]">
            <h2 className="text-2xl font-bold mb-4 text-[#E6EDF3]">Contact Us</h2>
            <p className="text-[#9AA4AF] leading-relaxed mb-4">
              Have questions, suggestions, or requests? We&apos;d love to hear from you! 
              Use our request form to:
            </p>
            <ul className="list-disc list-inside text-[#9AA4AF] space-y-2">
              <li>Request a specific game or software</li>
              <li>Report any issues with downloads</li>
              <li>Provide feedback about our platform</li>
              <li>Ask general questions</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}