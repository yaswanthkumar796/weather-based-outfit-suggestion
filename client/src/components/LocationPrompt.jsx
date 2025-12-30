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
                                   className="w-full py-5 rounded-lg font-bold text-lg uppercase tracking-wider transition-all hover:scale-[1.01] shadow-lg flex items-center justify-center gap-2"
                                   style={{
                                        background: 'var(--text-primary)',
                                        color: 'var(--bg-primary)',
                                        border: '2px solid var(--text-primary)'
                                   }}
                                   onClick={onUseCurrent}
                              >
                                   Use Current Location
                              </button>
                              <button
                                   className="w-full py-5 rounded-lg font-bold text-lg uppercase tracking-wider transition-all"
                                   style={{
                                        background: 'transparent',
                                        color: 'var(--text-primary)',
                                        border: '2px solid var(--border-color)'
                                   }}
                                   onClick={() => setMode('search')}
                              >
                                   Search by City
                              </button>
                         </div>
                    </div>

                    {/* Search Form (Slide from below) */}
                    <div className={`transition-all duration-500 ease-in-out transform ${mode === 'search' ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0 absolute bottom-0 w-full pointer-events-none'}`}>
                         <form onSubmit={handleSearchSubmit} className="flex flex-col gap-4">
                              <h3 className="text-sm font-bold uppercase tracking-widest mb-1 text-center" style={{ color: 'var(--text-primary)' }}>Enter your city</h3>
                              <input
                                   type="text"
                                   className="w-full p-4 rounded-lg focus:outline-none transition text-lg text-center"
                                   style={{
                                        background: 'var(--card-bg)',
                                        border: '2px solid var(--border-color)',
                                        color: 'var(--text-primary)'
                                   }}
                                   placeholder="e.g. New York, London..."
                                   value={cityInput}
                                   onChange={(e) => setCityInput(e.target.value)}
                                   autoFocus={mode === 'search'}
                              />
                              <div className="flex gap-3">
                                   <button
                                        type="button"
                                        className="flex-1 py-3 transition font-medium text-sm uppercase tracking-wide"
                                        style={{ color: 'var(--text-tertiary)' }}
                                        onClick={() => setMode('choice')}
                                   >
                                        Cancel
                                   </button>
                                   <button
                                        type="submit"
                                        className="flex-[2] py-3 rounded-lg font-bold uppercase tracking-wider transition"
                                        style={{
                                             background: 'var(--text-primary)',
                                             color: 'var(--bg-primary)'
                                        }}
                                   >
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
