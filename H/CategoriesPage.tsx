import React from 'react';
import { Grid, ArrowRight } from 'lucide-react';
import type { FoodCategory } from '../../../types';
import { useMenu } from '../../../context/MenuContext';

interface CategoriesPageProps {
  onSelectCategory: (category: FoodCategory) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onSelectCategory }) => {
  const { items } = useMenu();

  const categoryCards: {
    id: FoodCategory;
    title: string;
    description: string;
    emoji: string;
    image: string;
    accentColor: string;
  }[] = [
    {
      id: 'quick-bites',
      title: 'Quick Bites',
      description: 'Instant pick-me-ups like Maggi, momos & rolls ready in 5-8 minutes.',
      emoji: '🍜',
      image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80',
      accentColor: 'from-purple-900 to-indigo-900',
    },
    {
      id: 'snacks',
      title: 'Snacks & Sandwiches',
      description: 'Cheesy grilled sandwiches, crispy samosa chaat, and fries baskets.',
      emoji: '🥪',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
      accentColor: 'from-amber-900 to-orange-900',
    },
    {
      id: 'beverages',
      title: 'Beverages & Coolers',
      description: 'Cold coffee, fresh watermelon juice, hot chai, and thick shakes.',
      emoji: '☕',
      image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
      accentColor: 'from-sky-900 to-blue-900',
    },
    {
      id: 'main-course',
      title: 'Main Course & Meals',
      description: 'Chole bhature, butter chicken rice bowls, and hakka wok noodles.',
      emoji: '🍛',
      image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80',
      accentColor: 'from-emerald-900 to-teal-900',
    },
    {
      id: 'desserts',
      title: 'Desserts & Sweets',
      description: 'Warm fudge brownies with vanilla ice cream and Oreo thickshakes.',
      emoji: '🍰',
      image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=600&q=80',
      accentColor: 'from-rose-900 to-pink-900',
    },
    {
      id: 'healthy',
      title: 'Healthy Fuel Bowls',
      description: 'Sprouts paneer salad, energy bowls, and high-protein clean snacks.',
      emoji: '🥗',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
      accentColor: 'from-emerald-900 to-green-900',
    },
    {
      id: 'trending',
      title: 'Trending Cravings',
      description: 'Top-voted cafeteria items frequently ordered by fellow students today.',
      emoji: '🔥',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      accentColor: 'from-campus-purple-900 to-campus-coral-900',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-campus-purple-100 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-campus-purple-100 text-campus-purple-900 flex items-center justify-center">
            <Grid className="w-6 h-6 text-campus-purple-800" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-campus-charcoal-900 font-display">
              Food Categories 🍔
            </h1>
            <p className="text-xs sm:text-sm text-campus-charcoal-500 mt-0.5">
              Browse cafeteria counters by food type, snack size, or study mood
            </p>
          </div>
        </div>
      </div>

      {/* Large Visual Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categoryCards.map((cat) => {
          const count = items.filter((i) =>
            cat.id === 'trending' ? i.isTrending : i.category === cat.id
          ).length;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative h-64 rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer border border-campus-purple-100 hover:-translate-y-1.5 flex flex-col justify-end p-6"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-campus-purple-950/95 via-campus-purple-950/60 to-black/20" />

              {/* Card Content */}
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl">
                    {cat.emoji}
                  </div>
                  <span className="text-xs font-black text-campus-mango-400 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    {count} dishes
                  </span>
                </div>

                <h3 className="text-xl font-black text-white font-display group-hover:text-campus-mango-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-campus-purple-100 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-campus-mango-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore items</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
