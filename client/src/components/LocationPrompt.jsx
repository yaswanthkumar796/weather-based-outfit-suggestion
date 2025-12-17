import React, { useState } from 'react';

const LocationPrompt = ({ onUseCurrent, onSearchCity }) => {
     const [cityInput, setCityInput] = useState('');
     const [mode, setMode] = useState('choice'); // 'choice' or 'search'

     const handleSearchSubmit = (e) => {
          e.preventDefault();
          if (cityInput.trim()) {
               onSearchCity(cityInput);
          }
     };

     return (
          <div className="w-full overflow-hidden relative min-h-[160px] flex items-end">
               <div className="w-full">
                    {/* Primary Choices */}
                    <div className={`transition-all duration-500 ease-in-out transform ${mode === 'choice' ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 absolute bottom-0 w-full pointer-events-none'}`}>
                         <div className="flex flex-col gap-4">
                              <button
                                   className="w-full py-5 bg-white text-black rounded-lg font-bold text-lg uppercase tracking-wider hover:bg-gray-200 transition-transform hover:scale-[1.01] shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 border border-white"
                                   onClick={onUseCurrent}
                              >
                                   Use Current Location
                              </button>
                              <button
                                   className="w-full py-5 bg-transparent border border-white/40 text-white rounded-lg font-bold text-lg uppercase tracking-wider hover:bg-white/10 hover:border-white transition"
                                   onClick={() => setMode('search')}
                              >
                                   Search by City
                              </button>
                         </div>
                    </div>

                    {/* Search Form (Slide from below) */}
                    <div className={`transition-all duration-500 ease-in-out transform ${mode === 'search' ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0 absolute bottom-0 w-full pointer-events-none'}`}>
                         <form onSubmit={handleSearchSubmit} className="flex flex-col gap-4">
                              <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-1 text-center">Enter your city</h3>
                              <input
                                   type="text"
                                   className="w-full p-4 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white transition text-lg text-center"
                                   placeholder="e.g. New York, London..."
                                   value={cityInput}
                                   onChange={(e) => setCityInput(e.target.value)}
                                   autoFocus={mode === 'search'}
                              />
                              <div className="flex gap-3">
                                   <button
                                        type="button"
                                        className="flex-1 py-3 text-gray-400 hover:text-white transition font-medium text-sm uppercase tracking-wide"
                                        onClick={() => setMode('choice')}
                                   >
                                        Cancel
                                   </button>
                                   <button type="submit" className="flex-[2] py-3 bg-white text-black rounded-lg font-bold uppercase tracking-wider hover:bg-gray-200 transition">
                                        Go
                                   </button>
                              </div>
                         </form>
                    </div>
               </div>
          </div>
     );
};

export default LocationPrompt;
