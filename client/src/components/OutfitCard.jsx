import React, { useState, useEffect } from 'react';

const OutfitCard = ({ outfit, delay }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  // Check if outfit is in favorites on mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteOutfits') || '[]');
    setIsFavorite(favorites.some(fav => fav._id === outfit._id));
  }, [outfit._id]);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent card click if we add that later

    const favorites = JSON.parse(localStorage.getItem('favoriteOutfits') || '[]');

    if (isFavorite) {
      // Remove from favorites
      const updated = favorites.filter(fav => fav._id !== outfit._id);
      localStorage.setItem('favoriteOutfits', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      // Add to favorites
      favorites.push(outfit);
      localStorage.setItem('favoriteOutfits', JSON.stringify(favorites));
      setIsFavorite(true);
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 600);
    }

    // Notify other components (like VirtualWardrobe) of the change
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={outfit.imageUrl}
          alt={outfit.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500"></div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/30 truncate max-w-[150px] group-hover:bg-white/30 transition-all">
          {outfit.category}
        </div>

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/40 transition-all duration-300 group-hover:scale-110"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-5 h-5 transition-all duration-300 ${isFavorite ? 'fill-rose-500 stroke-rose-500' : 'fill-none stroke-white'
              } ${showHeartAnimation ? 'animate-ping' : ''}`}
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        {/* Bottom Info */}
        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{outfit.season.join(' / ')}</p>
          <h3 className="text-xl font-bold leading-tight drop-shadow-lg">{outfit.name}</h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 bg-white flex-1 flex flex-col">
        {/* Items Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {outfit.items.map((item, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-default"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-medium">
          <span className="uppercase tracking-wider">Recommended</span>
          {isFavorite && (
            <span className="flex items-center gap-1 text-rose-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
              </svg>
              Saved
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;