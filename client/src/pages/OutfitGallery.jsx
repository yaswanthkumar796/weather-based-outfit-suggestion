import React, { useState, useEffect } from 'react';
import OutfitCard from '../components/OutfitCard';
import SkeletonCard from '../components/SkeletonCard';

const OutfitGallery = () => {
    const [outfits, setOutfits] = useState([]);
    const [filteredOutfits, setFilteredOutfits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        season: 'all',
        occasion: 'all',
        gender: 'all'
    });
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        fetchAllOutfits();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [outfits, filters, searchQuery, sortBy]);

    const fetchAllOutfits = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/outfits');
            const data = await response.json();
            setOutfits(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch outfits:', error);
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let result = [...outfits];

        // Apply season filter
        if (filters.season !== 'all') {
            result = result.filter(outfit =>
                outfit.season.includes(filters.season)
            );
        }

        // Apply occasion filter
        if (filters.occasion !== 'all') {
            result = result.filter(outfit =>
                outfit.category.toLowerCase() === filters.occasion.toLowerCase()
            );
        }

        // Apply gender filter
        if (filters.gender !== 'all') {
            result = result.filter(outfit =>
                outfit.gender.toLowerCase() === filters.gender.toLowerCase()
            );
        }

        // Apply search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(outfit =>
                outfit.name.toLowerCase().includes(query) ||
                outfit.items.some(item => item.toLowerCase().includes(query)) ||
                outfit.category.toLowerCase().includes(query)
            );
        }

        // Apply sorting
        if (sortBy === 'name-asc') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'name-desc') {
            result.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredOutfits(result);
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
    };

    const clearFilters = () => {
        setFilters({ season: 'all', occasion: 'all', gender: 'all' });
        setSearchQuery('');
        setSortBy('newest');
    };

    const activeFilterCount = Object.values(filters).filter(v => v !== 'all').length + (searchQuery ? 1 : 0);

    return (
        <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                        Outfit Gallery
                    </h1>
                    <p className="text-lg opacity-70 max-w-2xl mx-auto">
                        Browse our complete collection of {outfits.length} curated outfits for every occasion and season
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-6 mb-8 shadow-2xl">
                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search outfits, items, or categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-2xl px-12 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium bg-[var(--card-bg)] text-[var(--text-primary)] border-2 border-[var(--border-color)]"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                    </div>

                    {/* Filter Pills */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Season Filter */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[var(--text-secondary)]">Season</label>
                            <select
                                value={filters.season}
                                onChange={(e) => handleFilterChange('season', e.target.value)}
                                className="w-full rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer font-medium bg-[var(--card-bg)] text-[var(--text-primary)] border-2 border-[var(--border-color)]"
                            >
                                <option style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value="all">All Seasons</option>
                                <option style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value="Summer">Summer</option>
                                <option style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value="Winter">Winter</option>
                                <option style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value="Spring">Spring</option>
                                <option style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value="Fall">Fall</option>
                            </select>
                        </div>

                        {/* Occasion Filter */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[var(--text-secondary)]">Occasion</label>
                            <select
                                value={filters.occasion}
                                onChange={(e) => handleFilterChange('occasion', e.target.value)}
                                className="w-full rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer font-medium bg-[var(--card-bg)] text-[var(--text-primary)] border-2 border-[var(--border-color)]"
                            >
                                <option style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value="all">All Occasions</option>
                                <option style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value="casual">Casual</option>
                                <option style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value="work">Work</option>
                                <option style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value="formal">Formal</option>
                                <option style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value="party">Party</option>
                                <option style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value="date">Date</option>
                                <option style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value="travel">Travel</option>
                                <option style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value="sports/active">Sports/Active</option>
                            </select>
                        </div>

                        {/* Gender Filter */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[var(--text-secondary)]">Gender</label>
                            <select
                                value={filters.gender}
                                onChange={(e) => handleFilterChange('gender', e.target.value)}
                                className="w-full rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer font-medium bg-[var(--card-bg)] text-[var(--text-primary)] border-2 border-[var(--border-color)]"
                            >
                                <option style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value="all">All</option>
                                <option style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value="male">Male</option>
                                <option style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value="female">Female</option>
                            </select>
                        </div>

                        {/* Sort By */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[var(--text-secondary)]">Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer font-medium bg-[var(--card-bg)] text-[var(--text-primary)] border-2 border-[var(--border-color)]"
                            >
                                <option style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value="newest">Newest First</option>
                                <option style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value="name-asc">Name (A-Z)</option>
                                <option style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} value="name-desc">Name (Z-A)</option>
                            </select>
                        </div>
                    </div>

                    {/* Active Filters & Clear */}
                    {activeFilterCount > 0 && (
                        <div className="mt-6 flex items-center justify-between pt-6 border-t border-white/10">
                            <span className="text-sm opacity-60">
                                {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active • {filteredOutfits.length} result{filteredOutfits.length !== 1 ? 's' : ''}
                            </span>
                            <button
                                onClick={clearFilters}
                                className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Results */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : filteredOutfits.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-6 opacity-20">🔍</div>
                        <h3 className="text-2xl font-bold mb-2">No Outfits Found</h3>
                        <p className="opacity-60 mb-6">Try adjusting your filters or search query</p>
                        <button
                            onClick={clearFilters}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl transition-all font-bold"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Results Count */}
                        <div className="mb-6 text-center">
                            <p className="text-sm opacity-60">
                                Showing <span className="font-bold text-blue-400">{filteredOutfits.length}</span> of <span className="font-bold">{outfits.length}</span> outfits
                            </p>
                        </div>

                        {/* Outfit Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredOutfits.map((outfit, index) => (
                                <OutfitCard key={outfit._id} outfit={outfit} delay={index * 100} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default OutfitGallery;
