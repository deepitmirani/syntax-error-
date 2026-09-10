import React, { useState } from 'react';
import { CheckCircle2, Sparkles, ArrowRight, DollarSign, PackageCheck, Users } from 'lucide-react';
import { useToast } from '../../common/Toast';

export const SellOnPlate2ClassPage: React.FC = () => {
  const { showToast } = useToast();
  const [vendorName, setVendorName] = useState('');
  const [stallType, setStallType] = useState('Home-baked Cookies & Brownies');
  const [studentId, setStudentId] = useState('P2C-2024-8842');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorName.trim() || !description.trim()) return;
    setSubmitted(true);
    showToast('Application submitted to Cafeteria Committee! 🎓');
  };

  const benefits = [
    {
      icon: <PackageCheck className="w-5 h-5 text-campus-purple-700" />,
      title: 'List Your Food Items',
      desc: 'Set custom prices, food descriptions, prep times, and dietary tags easily on the campus network.',
    },
    {
      icon: <DollarSign className="w-5 h-5 text-campus-mango-600" />,
      title: 'Instant Campus Payouts',
      desc: 'Direct digital settlements to your student wallet or UPI without handling physical cash change.',
    },
    {
      icon: <Users className="w-5 h-5 text-campus-coral-600" />,
      title: 'Reach 8,000+ Students',
      desc: 'Get instant visibility across all college blocks, lecture halls, and hostel dining tables.',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-campus-purple-900 via-campus-purple-800 to-campus-purple-950 text-white p-8 sm:p-12 rounded-3xl sm:rounded-[32px] shadow-soft-lg border border-campus-purple-700/50">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-xs font-bold text-campus-mango-300">
            <Sparkles className="w-3.5 h-3.5 text-campus-mango-400" />
            <span>Campus Food Entrepreneurship Program</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display leading-tight">
            Have something delicious to sell? 🏪
          </h1>
          <p className="text-sm sm:text-base text-campus-purple-100 font-medium leading-relaxed">
            Whether you run a student culinary pop-up, weekend baking stall, or campus snack stall, Plate2Class gives you full order ticketing and queue management tools.
          </p>
        </div>
      </div>

      {/* 3 Core Value Props */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {benefits.map((b, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-3xl border border-campus-purple-100 shadow-soft hover:shadow-soft-lg transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-campus-cream-200 flex items-center justify-center mb-4">
              {b.icon}
            </div>
            <h3 className="font-extrabold text-base text-campus-charcoal-900 mb-1.5 font-display">
              {b.title}
            </h3>
            <p className="text-xs text-campus-charcoal-500 leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Application Form */}
      <div className="bg-white rounded-3xl border border-campus-purple-100 p-6 sm:p-8 shadow-soft max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-campus-charcoal-900 font-display">
            Apply to Sell on Plate2Class
          </h2>
          <p className="text-xs text-campus-charcoal-500 mt-1">
            Fill out the quick form to get reviewed by the Campus Cafeteria Committee
          </p>
        </div>

        {submitted ? (
          <div className="text-center p-8 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-black text-emerald-900">Application Received!</h3>
            <p className="text-xs text-emerald-700 max-w-sm mx-auto leading-relaxed">
              Our campus food committee will review your proposed menu and hygiene checklist within 24 hours. Keep an eye on your college email!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-campus-charcoal-700 mb-1">
                Stall / Student Brand Name
              </label>
              <input
                type="text"
                required
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                placeholder="e.g. Rishi's Sweet Bites & Waffles"
                className="w-full px-3.5 py-2.5 text-xs bg-campus-cream-50 border border-campus-purple-100 rounded-xl text-campus-charcoal-900 focus:outline-none focus:ring-2 focus:ring-campus-purple-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-campus-charcoal-700 mb-1">
                  Food Category
                </label>
                <select
                  value={stallType}
                  onChange={(e) => setStallType(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-campus-cream-50 border border-campus-purple-100 rounded-xl text-campus-charcoal-900 focus:outline-none focus:ring-2 focus:ring-campus-purple-400 font-medium"
                >
                  <option value="Home-baked Cookies & Brownies">Home-baked Cookies & Brownies</option>
                  <option value="Specialty Coffee & Beverages">Specialty Coffee & Beverages</option>
                  <option value="Regional Street Snacks">Regional Street Snacks</option>
                  <option value="Healthy Gym Salads & Bowls">Healthy Gym Salads & Bowls</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-campus-charcoal-700 mb-1">
                  Student ID
                </label>
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="P2C-2024-XXXX"
                  className="w-full px-3.5 py-2.5 text-xs bg-campus-cream-50 border border-campus-purple-100 rounded-xl text-campus-charcoal-900 focus:outline-none focus:ring-2 focus:ring-campus-purple-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-campus-charcoal-700 mb-1">
                Tell us about your dishes & kitchen prep
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mention what dishes you plan to sell, hygiene measures, and available hours..."
                className="w-full p-3 text-xs bg-campus-cream-50 border border-campus-purple-100 rounded-xl text-campus-charcoal-900 focus:outline-none focus:ring-2 focus:ring-campus-purple-400"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-campus-purple-800 hover:bg-campus-purple-700 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-2xl shadow-soft hover:shadow-purple-glow transition-all active:scale-95"
            >
              <span>Submit Vendor Application</span>
              <ArrowRight className="w-4 h-4 text-campus-mango-400" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
