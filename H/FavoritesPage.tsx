import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useMenu } from '../../../context/MenuContext';
import { FoodCard } from '../FoodCard';

interface FavoritesPageProps {
  onExploreMenu: () => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ onExploreMenu }) => {
  const { student } = useAuth();
  const { items } = useMenu();

  const favoriteItems = items.filter((item) => student.favoriteItemIds.includes(item.id));

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-campus-purple-100 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-campus-charcoal-900 font-display">
                Your Saved Favorites ❤️
              </h1>
              <span className="text-xs bg-rose-100 text-rose-700 font-black px-2.5 py-0.5 rounded-full">
                {favoriteItems.length} items
              </span>
            </div>
            <p className="text-xs sm:text-sm text-campus-charcoal-500 mt-0.5">
              Dishes you've favorited for instant access between classes
            </p>
          </div>
        </div>
      </div>

      {favoriteItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-campus-purple-100 shadow-soft flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-3xl mb-3">
            ❤️
          </div>
          <h3 className="text-lg font-black text-campus-charcoal-900 font-display">
            No favorites yet!
          </h3>
          <p className="text-xs text-campus-charcoal-500 mt-1 max-w-sm mb-6">
            Tap the heart icon on any food item to bookmark it for fast ordering.
          </p>
          <button
            type="button"
            onClick={onExploreMenu}
            className="flex items-center gap-2 bg-campus-purple-800 hover:bg-campus-purple-700 text-white text-xs font-extrabold px-6 py-3 rounded-2xl shadow-soft transition-all"
          >
            <span>Explore Cafeteria Menu</span>
            <ArrowRight className="w-4 h-4 text-campus-mango-400" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {favoriteItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
