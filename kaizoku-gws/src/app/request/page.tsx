'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function RequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Request Game',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-[#4FD1FF]/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#4FD1FF]" />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-[#E6EDF3]">Submitted successfully!</h1>
          <p className="text-[#9AA4AF] mb-6">
            Thank you for your submission. We&apos;ll review your request and get back to you soon.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-[#4FD1FF] hover:text-[#6ED8FF] transition-colors"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4 text-[#E6EDF3]">Request / Contact</h1>
        <p className="text-[#9AA4AF] mb-8">
          Can&apos;t find what you&apos;re looking for? Let us know!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-[#E6EDF3]">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#111418] border border-[#222] rounded-lg py-3 px-4 focus:outline-none focus:border-[#4FD1FF] transition-colors text-[#E6EDF3]"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#E6EDF3]">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#111418] border border-[#222] rounded-lg py-3 px-4 focus:outline-none focus:border-[#4FD1FF] transition-colors text-[#E6EDF3]"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#E6EDF3]">Request Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full bg-[#111418] border border-[#222] rounded-lg py-3 px-4 focus:outline-none focus:border-[#4FD1FF] transition-colors text-[#E6EDF3]"
            >
              <option>Request Game</option>
              <option>Request Software</option>
              <option>Report Issue</option>
              <option>Feedback</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#E6EDF3]">Message</label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#111418] border border-[#222] rounded-lg py-3 px-4 focus:outline-none focus:border-[#4FD1FF] transition-colors resize-none text-[#E6EDF3]"
              placeholder="Tell us what you need..."
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FD1FF] to-[#4FD1FF] hover:from-[#6ED8FF] hover:to-[#6ED8FF] text-[#0B0D10] font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(79,209,255,0.4)]"
          >
            <Send className="w-5 h-5" />
            Submit Request
          </button>
        </form>

        <p className="text-center text-[#9AA4AF] text-lg mt-8">
          Or email us directly at{' '}
          <a 
            href="mailto:kaizokugws@gmail.com" 
            className="inline-flex items-center gap-1 px-5 py-2.5 bg-[#4FD1FF]/15 border border-[#4FD1FF]/50 rounded-lg text-[#4FD1FF] font-bold text-lg hover:bg-[#4FD1FF]/25 hover:border-[#4FD1FF] transition-all duration-300"
            style={{
              textShadow: '0 0 10px rgba(79, 209, 255, 0.6), 0 0 20px rgba(79, 209, 255, 0.4)',
            }}
          >
            <span className="text-xl">kaizokugws@gmail.com</span>
          </a>
        </p>
      </div>
    </div>
  );
}