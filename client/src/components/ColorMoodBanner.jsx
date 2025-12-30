import React from 'react';

const ColorMoodBanner = ({ weatherCondition, temperature, colorRecommendations }) => {
    if (!colorRecommendations) return null;

    const { mood, description, colors, icon } = colorRecommendations;

    // Color to hex mapping for visual display
    const colorHexMap = {
        'Red': '#EF4444',
        'Orange': '#F97316',
        'Yellow': '#EAB308',
        'Green': '#22C55E',
        'Blue': '#3B82F6',
        'Purple': '#A855F7',
        'Pink': '#EC4899',
        'Brown': '#92400E',
        'Black': '#1F2937',
        'White': '#F9FAFB',
        'Gray': '#6B7280',
        'Beige': '#D4A373',
        'Navy': '#1E3A8A',
        'Burgundy': '#7F1D1D',
        'Olive': '#65A30D',
        'Tan': '#C2A679',
        'Cream': '#FEF3C7',
        'Mint': '#6EE7B7',
        'Coral': '#FB7185'
    };

    return (
        <div className="w-full mb-8 animate-fade-in-up">
            <div
                className="relative overflow-hidden rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-[1.02]"
                style={{
                    background: 'linear-gradient(135deg, var(--card-bg) 0%, var(--bg-secondary) 100%)',
                    borderColor: 'var(--border-color)'
                }}
            >
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full blur-3xl"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">{icon}</span>
                        <div>
                            <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                Today's Color Palette
                            </h3>
                            <p className="text-sm opacity-70" style={{ color: 'var(--text-secondary)' }}>
                                {mood}
                            </p>
                        </div>
                    </div>

                    {/* Color Swatches */}
                    <div className="flex flex-wrap gap-3 mb-4">
                        {colors.map((color, index) => (
                            <div
                                key={color}
                                className="group relative"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animationFillMode: 'both'
                                }}
                            >
                                {/* Color Circle */}
                                <div
                                    className="w-16 h-16 rounded-full shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl cursor-pointer border-4"
                                    style={{
                                        backgroundColor: colorHexMap[color] || '#6B7280',
                                        borderColor: 'var(--bg-primary)'
                                    }}
                                ></div>

                                {/* Color Label */}
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                    <span className="text-xs font-semibold opacity-70" style={{ color: 'var(--text-secondary)' }}>
                                        {color}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    <div className="mt-8 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Color Psychology:</span> {description}
                        </p>
                    </div>

                    {/* Perfect Match Indicator */}
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold" style={{ background: 'var(--card-hover)', color: 'var(--text-primary)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-500">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                        Outfits below match these colors
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorMoodBanner;
