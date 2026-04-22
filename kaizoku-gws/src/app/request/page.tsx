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
          <div className="w-20 h-20 rounded-full bg-[#00c853]/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#00c853]" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Submitted successfully!</h1>
          <p className="text-[#666] mb-6">
            Thank you for your submission. We&apos;ll review your request and get back to you soon.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-[#ff3e3e] hover:text-[#ff5e5e] transition-colors"
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
        <h1 className="text-3xl font-bold mb-4">Request / Contact</h1>
        <p className="text-[#666] mb-8">
          Can&apos;t find what you&apos;re looking for? Let us know!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#141414] border border-[#222] rounded-lg py-3 px-4 focus:outline-none focus:border-[#ff3e3e] transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#141414] border border-[#222] rounded-lg py-3 px-4 focus:outline-none focus:border-[#ff3e3e] transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Request Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full bg-[#141414] border border-[#222] rounded-lg py-3 px-4 focus:outline-none focus:border-[#ff3e3e] transition-colors"
            >
              <option>Request Game</option>
              <option>Report Issue</option>
              <option>Feedback</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#141414] border border-[#222] rounded-lg py-3 px-4 focus:outline-none focus:border-[#ff3e3e] transition-colors resize-none"
              placeholder="Tell us what you need..."
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff3e3e] to-[#ff6b00] hover:from-[#ff5e5e] hover:to-[#ff7d20] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,62,62,0.4)]"
          >
            <Send className="w-5 h-5" />
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}