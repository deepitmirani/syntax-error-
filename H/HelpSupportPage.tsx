import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Phone, Search, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../common/Toast';

export const HelpSupportPage: React.FC = () => {
  const { showToast } = useToast();
  const [searchFaq, setSearchFaq] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const faqs = [
    {
      q: 'Where do I collect my food order?',
      a: 'Once your order reaches "Ready" status, head to the designated counter displayed on your token ticket (e.g. Counter 1 — Quick Bites, Counter 2 — Sandwiches). Show your token number (like #A-14) to the chef to collect your tray.',
    },
    {
      q: 'How long does an order take during break rush hours?',
      a: 'Average prep time is 6 to 10 minutes. Items in the "Running Late for Class?" section (like Cutting Chai, Samosas, Maggi) are kept on express priority and prepared under 5 minutes.',
    },
    {
      q: 'Can I cancel an order once placed?',
      a: 'Orders can be cancelled before the kitchen begins preparation (while still in "Placed" state). Once "Preparing" has commenced, ingredients are being cooked and cannot be cancelled.',
    },
    {
      q: 'Why is an item marked "Currently unavailable"?',
      a: 'Items are temporarily turned off when fresh ingredients run low at the kitchen counters. Cafeteria staff restock batches between main lecture breaks (usually 11:30 AM and 2:00 PM).',
    },
    {
      q: 'How do refunds work for failed transactions or cancellations?',
      a: 'Refunds are instantly credited back to your Campus Student Wallet within 2 minutes. For UPI payments, bank processing takes 2-4 business hours.',
    },
    {
      q: 'How do I contact cafeteria counter managers directly?',
      a: 'You can use the live cafeteria support form below, or visit Counter 4 (Central Kitchen Help Desk) in Block C.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchFaq.toLowerCase()) ||
      f.a.toLowerCase().includes(searchFaq.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessageSent(true);
    showToast('Your message has been sent to Cafeteria Desk! 📨');
    setTimeout(() => {
      setMessage('');
      setMessageSent(false);
    }, 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-campus-purple-100 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-campus-purple-100 text-campus-purple-900 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-campus-purple-800" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-campus-charcoal-900 font-display">
                Need a hand? ❓
              </h1>
              <p className="text-xs sm:text-sm text-campus-charcoal-500 mt-0.5">
                Frequently asked questions and direct cafeteria student helpdesk
              </p>
            </div>
          </div>

          {/* Search Help */}
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-campus-charcoal-400" />
            <input
              type="text"
              value={searchFaq}
              onChange={(e) => setSearchFaq(e.target.value)}
              placeholder="Search help topics..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-campus-cream-50 border border-campus-purple-100 rounded-xl text-campus-charcoal-900 focus:outline-none focus:ring-2 focus:ring-campus-purple-400"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* FAQs Accordion Column */}
        <div className="lg:col-span-7 space-y-3">
          <h2 className="text-base font-extrabold text-campus-charcoal-900 px-1">
            Common Cafeteria Questions
          </h2>

          {filteredFaqs.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-campus-purple-100 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-campus-charcoal-900 hover:text-campus-purple-900"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-campus-charcoal-400 transition-transform ${
                      isOpen ? 'rotate-180 text-campus-purple-800' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-campus-charcoal-600 leading-relaxed border-t border-campus-purple-50 pt-2.5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Support Form Column */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-base font-extrabold text-campus-charcoal-900 px-1">
            Contact Cafeteria Desk
          </h2>

          <div className="bg-white p-6 rounded-3xl border border-campus-purple-100 shadow-soft space-y-4">
            <div className="flex items-center gap-3 p-3 bg-campus-purple-50 rounded-2xl border border-campus-purple-100">
              <Phone className="w-4 h-4 text-campus-purple-800" />
              <div>
                <span className="text-[11px] text-campus-charcoal-400 block font-semibold">
                  Cafeteria Intercom Hotline
                </span>
                <span className="text-xs font-black text-campus-purple-900">
                  Ext. #4412 (Block C Cafeteria)
                </span>
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-campus-charcoal-700 mb-1">
                  How can we help you?
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us your issue (e.g. order delayed, food request, payment query)..."
                  className="w-full p-3 text-xs bg-campus-cream-50 border border-campus-purple-100 rounded-xl text-campus-charcoal-900 focus:outline-none focus:ring-2 focus:ring-campus-purple-400"
                />
              </div>

              {messageSent && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Message received! Staff responding in ~5 mins.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-campus-purple-800 hover:bg-campus-purple-700 text-white font-bold text-xs py-3 rounded-xl shadow-soft hover:shadow-purple-glow transition-all"
              >
                <Send className="w-3.5 h-3.5 text-campus-mango-400" />
                <span>Send to Kitchen Staff</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
