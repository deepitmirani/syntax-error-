import React from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { useMenu } from '../../../context/MenuContext';
import { useCart } from '../../../context/CartContext';
import { useToast } from '../../common/Toast';
import { FoodCard } from '../FoodCard';

export const OrderAgainPage: React.FC = () => {
  const { items } = useMenu();
  const { addToCart, openCart } = useCart();
  const { showToast } = useToast();

  const usualItems = items.filter((item) => item.isUsual || item.isPopular);

  const handleReorderAllUsuals = () => {
    usualItems.slice(0, 3).forEach((item) => {
      if (item.isAvailable) addToCart(item);
    });
    showToast(`Added your top regular cravings to tray! 🎉`);
    openCart();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-campus-purple-100 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-campus-purple-100 text-campus-purple-900 flex items-center justify-center">
            <RotateCcw className="w-6 h-6 text-campus-purple-800" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-campus-charcoal-900 font-display">
                Order Again 🔄
              </h1>
              <span className="text-xs bg-campus-mango-400 text-campus-charcoal-950 font-black px-2.5 py-0.5 rounded-full">
                Your Usuals
              </span>
            </div>
            <p className="text-xs sm:text-sm text-campus-charcoal-500 mt-0.5">
              Reorder your frequent campus break munchies with a single tap
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReorderAllUsuals}
          className="flex items-center justify-center gap-2 bg-campus-purple-800 hover:bg-campus-purple-700 text-white text-xs sm:text-sm font-extrabold px-5 py-3 rounded-2xl shadow-soft hover:shadow-purple-glow transition-all active:scale-95 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-campus-mango-400" />
          <span>Add All 3 Usuals to Tray</span>
        </button>
      </div>

      {/* Grid of Usuals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {usualItems.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
