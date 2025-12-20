import React from 'react';

// Import local panel images
import panel1 from '../assets/hero_panels/panel_1.png';
import panel2 from '../assets/hero_panels/panel_2.png';
// Panel 3 removed as per request
import panel4 from '../assets/hero_panels/panel_4.png';

// Using generated local images for a cohesive 3-panel look
const heroImages = [
  panel1, // Female Casual
  panel2, // Male Sunglasses
  panel4, // Male Modern
];

const Hero = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen text-white flex flex-col md:flex-row font-sans overflow-hidden transition-colors duration-500" style={{ background: 'var(--bg-primary)' }}>

      {/* LEFT COLUMN: Text Content */}
      <div className="w-full md:w-[40%] lg:w-[35%] h-full flex flex-col justify-start px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 z-20 pt-40 md:pt-36 lg:pt-40 pb-16 order-2 md:order-1 relative" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-xl w-full animate-fade-in-up space-y-8">

          {/* Main Headline */}
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.95]" style={{ color: 'var(--text-primary)' }}>
              Start<br />
              Planning<br />
              Outfits
            </h1>
            <p className="text-base sm:text-lg font-medium max-w-md leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Get personalized outfit recommendations based on real-time weather conditions in your location.
            </p>
          </div>

          {/* Action Area (Location Prompt) */}
          <div className="w-full z-30 relative pt-4">
            {children}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Images */}
      <div className="w-full md:w-[60%] lg:w-[65%] h-[50vh] md:h-screen relative overflow-hidden order-1 md:order-2" style={{ background: 'linear-gradient(to bottom right, var(--bg-primary), var(--bg-secondary), var(--bg-primary))' }}>
        {/* Grid for images - 3 Columns with improved spacing */}
        <div className="w-full h-full grid grid-cols-3 pt-24 md:pt-32 lg:pt-40 pb-8 px-3 sm:px-4 md:px-6 gap-3 sm:gap-4 md:gap-6">
          {heroImages.map((src, idx) => (
            <div
              key={idx}
              className="relative w-full h-full overflow-hidden rounded-2xl md:rounded-3xl group shadow-2xl"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <img
                src={src}
                alt={`Fashion Inspiration ${idx + 1}`}
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-out transform scale-100 group-hover:scale-105 will-change-transform"
              />
              {/* Gradient overlay - theme aware */}
              <div className="absolute inset-0 opacity-60 group-hover:opacity-30 transition-opacity duration-700" style={{ background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 60%)' }}></div>

              {/* Subtle border glow on hover */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl transition-colors duration-700" style={{ border: '1px solid var(--border-color)' }}></div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Hero;
