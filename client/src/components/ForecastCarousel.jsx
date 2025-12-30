import React from 'react';

const ForecastCarousel = ({ forecast, unit, onDayClick }) => {
     if (!forecast || forecast.length === 0) return null;

     // Helper to convert temp if needed
     const getTemp = (celsius) => {
       if (unit === 'F') return Math.round((celsius * 9/5) + 32);
       return Math.round(celsius);
     };

     return (
          <div className="w-full">
               <h3 className="text-lg font-bold mb-4 opacity-80 pl-1">Next Week</h3>

               {/* Horizontal Scroll Container */}
               <div className="flex overflow-x-auto gap-3 pb-4 snap-x snap-mandatory scrollbar-hide">
                    {forecast.map((day, index) => (
                         <div
                              key={index}
                              onClick={() => onDayClick && onDayClick(day)}
                              className="flex-shrink-0 w-28 p-4 rounded-3xl bg-black/60 backdrop-blur-sm border border-white/80 flex flex-col items-center justify-center snap-start hover:bg-black/80 transition cursor-pointer group shadow-[0_0_25px_rgba(255,255,255,0.6)] text-white"
                         >
                              <p className="text-sm font-semibold opacity-70 mb-1">
                                   {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                              </p>
                              <p className="text-xs opacity-50 mb-2">
                                   {new Date(day.date).getDate()}
                              </p>

                              <img
                                   src={`http://openweathermap.org/img/wn/${day.icon}.png`}
                                   alt={day.condition}
                                   className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform"
                              />

                              <div className="flex gap-2 text-sm">
                                   <span className="font-bold">{getTemp(day.tempMax)}°</span>
                                   <span className="opacity-50">{getTemp(day.tempMin)}°</span>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default ForecastCarousel;
