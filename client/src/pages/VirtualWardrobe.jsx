import React, { useState, useEffect } from 'react';
import OutfitCard from '../components/OutfitCard';

const VirtualWardrobe = ({ onNavigate }) => {
    const [favorites, setFavorites] = useState([]);
    const [groupBy, setGroupBy] = useState('all'); // 'all', 'season', 'occasion'

    useEffect(() => {
        loadFavorites();

        // Listen for storage changes (when favorites are updated from OutfitCard)
        const handleStorageChange = () => {
            loadFavorites();
        };

        window.addEventListener('storage', handleStorageChange);
        // Also listen for custom event from same tab
        window.addEventListener('favoritesUpdated', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('favoritesUpdated', handleStorageChange);
        };
    }, []);

    const loadFavorites = () => {
        const stored = localStorage.getItem('favoriteOutfits');
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    };

    const clearAllFavorites = () => {
        if (window.confirm('Are you sure you want to remove all saved outfits?')) {
            localStorage.setItem('favoriteOutfits', JSON.stringify([]));
            setFavorites([]);
        }
    };

    const groupedFavorites = () => {
        if (groupBy === 'all') {
            return { 'All Saved Outfits': favorites };
        } else if (groupBy === 'season') {
            const groups = {};
            favorites.forEach(outfit => {
                outfit.season.forEach(season => {
                    if (!groups[season]) groups[season] = [];
                    groups[season].push(outfit);
                });
            });
            return groups;
        } else if (groupBy === 'occasion') {
            const groups = {};
            favorites.forEach(outfit => {
                const category = outfit.category;
                if (!groups[category]) groups[category] = [];
                groups[category].push(outfit);
            });
            return groups;
        }
        return {};
    };

    const groups = groupedFavorites();

    return (
        <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-rose-500/30">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white">
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400">
                        My Wardrobe
                    </h1>
                    <p className="text-lg opacity-70 max-w-2xl mx-auto">
                        {favorites.length === 0
                            ? "Your saved outfits will appear here"
                            : `You have ${favorites.length} saved outfit${favorites.length !== 1 ? 's' : ''}`
                        }
                    </p>
                </div>

                {favorites.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-20">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 max-w-2xl mx-auto">
                            <div className="text-6xl mb-6 opacity-20">💝</div>
                            <h3 className="text-2xl font-bold mb-4">Your Wardrobe is Empty</h3>
                            <p className="opacity-60 mb-8 leading-relaxed">
                                Start building your collection by clicking the heart icon on any outfit card.
                                Save your favorite looks for quick access anytime!
                            </p>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (onNavigate) onNavigate('gallery');
                                }}
                                className="inline-block px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 rounded-xl transition-all font-bold shadow-lg shadow-rose-500/30"
                            >
                                Browse Outfit Gallery
                            </a>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Controls */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                            {/* Group By */}
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold opacity-60 uppercase tracking-wider">Group By:</span>
                                <div className="flex gap-2">
                                    {['all', 'season', 'occasion'].map(option => (
                                        <button
                                            key={option}
                                            onClick={() => setGroupBy(option)}
                                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${groupBy === option
                                                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                                                    : 'bg-white/5 hover:bg-white/10'
                                                }`}
                                        >
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Clear All */}
                            <button
                                onClick={clearAllFavorites}
                                className="text-sm font-bold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                Clear All
                            </button>
                        </div>

                        {/* Grouped Outfits */}
                        {Object.entries(groups).map(([groupName, groupOutfits]) => (
                            <div key={groupName} className="mb-12">
                                {groupBy !== 'all' && (
                                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                        <span className="w-1 h-8 bg-gradient-to-b from-rose-500 to-pink-600 rounded-full"></span>
                                        {groupName}
                                        <span className="text-sm opacity-40 font-normal">({groupOutfits.length})</span>
                                    </h2>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {groupOutfits.map((outfit, index) => (
                                        <OutfitCard key={outfit._id} outfit={outfit} delay={index * 100} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default VirtualWardrobe;
