import React from 'react';

const OutfitCard = ({ outfit, delay }) => {
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/30 truncate max-w-[150px]">
          {outfit.category}
        </div>

        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-xs opacity-80 uppercase tracking-wider mb-1">{outfit.season.join(' / ')}</p>
          <h3 className="text-xl font-bold leading-tight">{outfit.name}</h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 bg-white flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-4">
          {outfit.items.map((item, index) => (
            <span key={index} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-medium">
          <span>RECOMMENDED</span>
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;