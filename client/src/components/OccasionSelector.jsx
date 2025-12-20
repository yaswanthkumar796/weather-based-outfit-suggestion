import React from 'react';

const occasions = [
  { id: 'casual', label: 'Casual', emoji: '👕', color: 'from-blue-400 to-blue-600' },
  { id: 'work', label: 'Work', emoji: '💼', color: 'from-slate-400 to-slate-600' },
  { id: 'formal', label: 'Formal', emoji: '👔', color: 'from-gray-700 to-gray-900' },
  { id: 'party', label: 'Party', emoji: '🎉', color: 'from-purple-400 to-pink-600' },
  { id: 'date', label: 'Date', emoji: '🍷', color: 'from-rose-400 to-red-600' },
  { id: 'travel', label: 'Travel', emoji: '✈️', color: 'from-cyan-400 to-sky-600' },
  { id: 'Sports/Active', label: 'Sports', emoji: '🏃', color: 'from-orange-400 to-amber-600' },
];

const OccasionSelector = ({ selected, onSelect }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <h3 className="text-xl font-light mb-4 text-center text-[var(--text-primary)] opacity-90">Select an occasion</h3>
      
      {/* Centered container with rounded corners, subtle dashed border, soft gradient dark background */}
      <div className="
        relative
        p-6 
        rounded-3xl 
        border border-white/30
        bg-black/40
        backdrop-blur-md 
        shadow-[0_0_20px_rgba(255,255,255,0.1)]
        flex flex-wrap justify-center gap-4
      ">
        {occasions.map((occasion) => {
          const isSelected = selected === occasion.id;

          return (
            <button
              key={occasion.id}
              onClick={() => onSelect(isSelected ? null : occasion.id)}
              className={`
                group
                relative
                flex items-center gap-2
                pl-3 pr-5 py-2.5
                rounded-full
                transition-all duration-300 ease-out
                border 
                overflow-hidden
                ${isSelected 
                  ? 'bg-black/80 border-white/80 scale-105 shadow-[0_0_15px_rgba(255,255,255,0.5)]' 
                  : 'bg-black/40 border-white/30 hover:bg-black/60 hover:border-white/60 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                }
              `}
            >
              {/* Button Background with Glassmorphism and Gradient */}
              <div className={`
                absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity
                bg-gradient-to-r ${occasion.color}
                ${isSelected ? 'opacity-100' : ''}
              `}></div>

              {/* Glass shine effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 pointer-events-none"></div>

              {/* Content */}
              <span className="text-lg drop-shadow-sm filter relative z-10">{occasion.emoji}</span>
              <span className={`
                text-sm font-medium tracking-wide relative z-10
                ${isSelected ? 'text-white' : 'text-[var(--text-primary)]'}
              `}>
                {occasion.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OccasionSelector;
