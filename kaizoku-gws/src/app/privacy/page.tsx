export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-8">
          <section className="bg-[#141414] rounded-xl p-6 border border-[#222]">
            <h2 className="text-xl font-bold mb-4">Data Collection</h2>
            <p className="text-[#888] leading-relaxed">
              Kaizoku GWS does not collect personal information from our users. 
              We do not require registration to browse or download content. 
              When you submit a request through our contact form, we only collect 
              the information you voluntarily provide (name, email, message).
            </p>
          </section>

          <section className="bg-[#141414] rounded-xl p-6 border border-[#222]">
            <h2 className="text-xl font-bold mb-4">Cookies</h2>
            <p className="text-[#888] leading-relaxed">
              Our website uses minimal cookies primarily for session management and 
              basic analytics. We do not use cookies for advertising or tracking purposes. 
              You can disable cookies in your browser settings without affecting your 
              ability to browse our site.
            </p>
          </section>

          <section className="bg-[#141414] rounded-xl p-6 border border-[#222]">
            <h2 className="text-xl font-bold mb-4">Third-Party Services</h2>
            <p className="text-[#888] leading-relaxed">
              Our website may contain links to third-party websites or services. 
              We are not responsible for the privacy practices of these external sites. 
              We encourage you to review the privacy policies of any third-party sites 
              you visit.
            </p>
          </section>

          <section className="bg-[#141414] rounded-xl p-6 border border-[#222]">
            <h2 className="text-xl font-bold mb-4">Changes to Policy</h2>
            <p className="text-[#888] leading-relaxed">
              We reserve the right to modify this privacy policy at any time. 
              Any changes will be posted on this page. Your continued use of our 
              platform following any changes indicates your acceptance of the new terms.
            </p>
          </section>

          <section className="bg-[#141414] rounded-xl p-6 border border-[#222]">
            <h2 className="text-xl font-bold mb-4">Contact</h2>
            <p className="text-[#888] leading-relaxed">
              If you have any questions about this privacy policy, please contact us 
              through our request form.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}