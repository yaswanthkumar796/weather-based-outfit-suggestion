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
    <div className="relative w-full min-h-screen bg-black text-white flex flex-col md:flex-row font-sans">
      
      {/* LEFT COLUMN: Text Content (35%) */}
      {/* Changed justify-center to justify-start and used pt-48 to force text down below header */}
      <div className="w-full md:w-[35%] h-full flex flex-col justify-start px-6 md:px-12 lg:pl-16 z-20 bg-black pt-48 pb-12 md:py-0 order-2 md:order-1 relative">
        {/* Added mt-12 extra margin for safety on larger screens */}
        <div className="max-w-md w-full animate-fade-in-up md:mt-12">
           
           {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] mb-10 text-white text-left break-words">
           <br /> Start <br /> Planning <br /> Outfits
          </h1>

          {/* Action Area (Location Prompt) */}
          <div className="w-full z-30 relative">
            {children}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Images (65%) */}
      <div className="w-full md:w-[65%] h-[50vh] md:h-screen relative overflow-hidden order-1 md:order-2 bg-black">
         {/* Grid for images - 3 Columns. Increased top padding to pt-32 to show images 'a bit down' */}
        <div className="w-full h-full grid grid-cols-3 pt-32 pb-8 px-4 gap-4">
          {heroImages.map((src, idx) => (
            <div key={idx} className="relative w-full h-full overflow-hidden rounded-t-2xl group">
              <img 
                src={src} 
                alt="Fashion Inspiration" 
                className="w-full h-full object-cover object-center grayscale transition-all duration-1000 ease-in-out transform scale-95 origin-center group-hover:scale-110 group-hover:grayscale-0 will-change-transform"
              />
              {/* Subtle gradient for depth */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-50 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Hero;
