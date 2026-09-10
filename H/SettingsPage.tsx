import React, { useState } from 'react';
import { Settings, User, Leaf, Save } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../common/Toast';

export const SettingsPage: React.FC = () => {
  const { student, toggleVegOnly } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [phone, setPhone] = useState(student.phone);
  const [block, setBlock] = useState(student.block);
  const [notifSound, setNotifSound] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile settings saved successfully! 💾');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-3xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-campus-purple-100 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-campus-purple-100 text-campus-purple-900 flex items-center justify-center">
            <Settings className="w-6 h-6 text-campus-purple-800" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-campus-charcoal-900 font-display">
              Student Profile & Preferences ⚙️
            </h1>
            <p className="text-xs sm:text-sm text-campus-charcoal-500 mt-0.5">
              Manage your cafeteria delivery alerts, hostel room, and dietary filter
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-3xl border border-campus-purple-100 shadow-soft space-y-4">
          <h2 className="text-base font-extrabold text-campus-charcoal-900 flex items-center gap-2">
            <User className="w-4 h-4 text-campus-purple-800" />
            <span>Personal Information</span>
          </h2>

          <div className="flex items-center gap-4 pb-4 border-b border-campus-purple-50">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-campus-purple-400 shadow-sm"
            />
            <div>
              <h3 className="font-extrabold text-sm text-campus-charcoal-900">{student.name}</h3>
              <p className="text-xs text-campus-charcoal-500">{student.studentId}</p>
              <span className="inline-block mt-1 text-[10px] font-bold bg-campus-mango-100 text-campus-charcoal-800 px-2 py-0.5 rounded-md">
                Verified Campus Student
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-campus-charcoal-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-campus-cream-50 border border-campus-purple-100 rounded-xl text-campus-charcoal-900 focus:outline-none focus:ring-2 focus:ring-campus-purple-400"
              />
            </div>
            <div>
              <label className="block font-bold text-campus-charcoal-700 mb-1">College Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-campus-cream-50 border border-campus-purple-100 rounded-xl text-campus-charcoal-900 focus:outline-none focus:ring-2 focus:ring-campus-purple-400"
              />
            </div>
            <div>
              <label className="block font-bold text-campus-charcoal-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-campus-cream-50 border border-campus-purple-100 rounded-xl text-campus-charcoal-900 focus:outline-none focus:ring-2 focus:ring-campus-purple-400"
              />
            </div>
            <div>
              <label className="block font-bold text-campus-charcoal-700 mb-1">Hostel Room & Block</label>
              <input
                type="text"
                value={block}
                onChange={(e) => setBlock(e.target.value)}
                className="w-full px-3 py-2 bg-campus-cream-50 border border-campus-purple-100 rounded-xl text-campus-charcoal-900 focus:outline-none focus:ring-2 focus:ring-campus-purple-400"
              />
            </div>
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="bg-white p-6 rounded-3xl border border-campus-purple-100 shadow-soft space-y-4">
          <h2 className="text-base font-extrabold text-campus-charcoal-900 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>Dietary & Ordering Preferences</span>
          </h2>

          <div className="flex items-center justify-between p-3.5 bg-campus-cream-50 rounded-2xl border border-campus-purple-50">
            <div>
              <span className="font-extrabold text-xs text-campus-charcoal-900 block">
                Pure Vegetarian Filter by Default
              </span>
              <span className="text-[11px] text-campus-charcoal-500">
                Hide non-vegetarian and egg dishes across cafeteria menus automatically
              </span>
            </div>
            <button
              type="button"
              onClick={toggleVegOnly}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                student.isVegOnly ? 'bg-emerald-600' : 'bg-campus-charcoal-200'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  student.isVegOnly ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-campus-cream-50 rounded-2xl border border-campus-purple-50">
            <div>
              <span className="font-extrabold text-xs text-campus-charcoal-900 block">
                Audio Chime when Order is Ready
              </span>
              <span className="text-[11px] text-campus-charcoal-500">
                Play sound notification when chef marks your token ready at the counter
              </span>
            </div>
            <button
              type="button"
              onClick={() => setNotifSound(!notifSound)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                notifSound ? 'bg-campus-purple-800' : 'bg-campus-charcoal-200'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  notifSound ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-campus-purple-800 hover:bg-campus-purple-700 text-white font-extrabold text-xs sm:text-sm py-3 px-6 rounded-2xl shadow-soft hover:shadow-purple-glow transition-all"
        >
          <Save className="w-4 h-4 text-campus-mango-400" />
          <span>Save Preferences</span>
        </button>
      </form>
    </div>
  );
};
