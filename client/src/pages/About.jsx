import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-16 fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">About Us</h1>
        <p className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto leading-relaxed">
          Bridging the gap between reliable weather forecasts and effortless style.
        </p>
      </div>

      {/* Section 1: Mission + Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24 fade-in-up">
        <div className="order-2 md:order-1 relative rounded-2xl overflow-hidden shadow-2xl h-[400px]">
             <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80" 
                alt="Fashion Outfit" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
             />
        </div>
        <div className="space-y-6 order-1 md:order-2">
          <h2 className="text-4xl font-bold">Our Mission</h2>
          <p className="opacity-75 leading-relaxed text-lg">
            At <span className="font-bold opacity-100">WearToWeather</span>, we believe that checking the weather and picking an outfit shouldn't be two separate tasks. Our mission is to simplify your daily routine by providing intelligent, weather-based style recommendations that keep you comfortable and looking your best, no matter what the sky does.
          </p>
        </div>
      </div>

      {/* Section 2: Why Us + Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24 fade-in-up">
         <div className="bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10 h-full flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-6">Why WearToWeather?</h3>
            <ul className="space-y-4 opacity-80 text-lg">
                <li className="flex items-start gap-3">
                    <span className="opacity-100 font-bold mt-1">✓</span> Smart, real-time weather analysis
                </li>
                 <li className="flex items-start gap-3">
                    <span className="opacity-100 font-bold mt-1">✓</span> Curated outfit inspiration for every occasion
                </li>
                 <li className="flex items-start gap-3">
                    <span className="opacity-100 font-bold mt-1">✓</span> Privacy-focused and free to use
                </li>
                 <li className="flex items-start gap-3">
                    <span className="opacity-100 font-bold mt-1">✓</span> Seamless design for effortless planning
                </li>
            </ul>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px]">
             <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80" 
                alt="Shopping / Style" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
             />
        </div>
      </div>

      {/* Story / Vision - Full Width */}
      <div className="relative rounded-3xl overflow-hidden mb-12 fade-in-up">
        <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?auto=format&fit=crop&w=1200&q=80" 
                alt="City Lifestyle" 
                className="w-full h-full object-cover opacity-40 grayscale"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        {/* Force Text White here because we have a dark image overlay */}
        <div className="relative z-10 p-12 md:p-24 text-center text-white">
             <h2 className="text-3xl md:text-5xl font-bold mb-8">The Vision</h2>
             <p className="opacity-90 leading-relaxed max-w-4xl mx-auto text-xl font-light">
               We envision a world where you never have to guess what to wear. By leveraging advanced weather data and AI-driven curation, WearToWeather aims to be your go-to digital stylist, ensuring you're always prepared for the elements without compromising on personal style.
             </p>
        </div>
      </div>
    </div>
  );
};

export default About;
