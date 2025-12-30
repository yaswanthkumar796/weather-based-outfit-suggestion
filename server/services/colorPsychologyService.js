/**
 * Color Psychology Service
 * Maps weather conditions to recommended colors based on psychological principles
 */

const colorPsychology = {
    // Weather condition to color mapping
    sunny: {
        mood: 'Energetic & Fresh',
        description: 'Cool tones feel refreshing in the heat',
        colors: ['Blue', 'White', 'Mint', 'Cream', 'Gray'],
        icon: '☀️'
    },
    rainy: {
        mood: 'Mood Boost Needed',
        description: 'Bright colors combat gloomy weather',
        colors: ['Yellow', 'Orange', 'Pink', 'Red', 'Coral'],
        icon: '🌧️'
    },
    cloudy: {
        mood: 'Balanced & Calm',
        description: 'Neutrals with pops of color',
        colors: ['Gray', 'Beige', 'Olive', 'Navy', 'Tan'],
        icon: '☁️'
    },
    snowy: {
        mood: 'Warm & Cozy',
        description: 'Warm tones provide psychological warmth',
        colors: ['Burgundy', 'Brown', 'Navy', 'Olive', 'Cream'],
        icon: '❄️'
    },
    stormy: {
        mood: 'Bold & Confident',
        description: 'Match the dramatic mood',
        colors: ['Navy', 'Black', 'Purple', 'Gray', 'Burgundy'],
        icon: '⛈️'
    },
    clear: {
        mood: 'Bright & Cheerful',
        description: 'Vibrant colors for clear skies',
        colors: ['Blue', 'Yellow', 'Green', 'White', 'Pink'],
        icon: '🌤️'
    }
};

/**
 * Get recommended colors based on weather condition
 * @param {string} weatherMain - Main weather condition (e.g., 'Rain', 'Clear', 'Clouds')
 * @param {string} weatherDescription - Detailed description
 * @param {number} temperature - Temperature in Celsius
 * @returns {object} Color recommendations with mood and description
 */
const getRecommendedColors = (weatherMain, weatherDescription = '', temperature = 20) => {
    // Normalize weather condition
    const condition = weatherMain.toLowerCase();

    // Map weather API responses to our color psychology categories
    if (condition.includes('rain') || condition.includes('drizzle')) {
        return colorPsychology.rainy;
    }

    if (condition.includes('snow') || condition.includes('sleet')) {
        return colorPsychology.snowy;
    }

    if (condition.includes('thunder') || condition.includes('storm')) {
        return colorPsychology.stormy;
    }

    if (condition.includes('cloud') || condition.includes('overcast') || condition.includes('mist') || condition.includes('fog')) {
        return colorPsychology.cloudy;
    }

    if (condition.includes('clear') || condition.includes('sun')) {
        // Hot sunny day vs mild sunny day
        if (temperature > 28) {
            return colorPsychology.sunny; // Cool colors for hot weather
        } else {
            return colorPsychology.clear; // Vibrant colors for mild weather
        }
    }

    // Default to clear/sunny
    return colorPsychology.clear;
};

/**
 * Check if an outfit matches recommended colors
 * @param {array} outfitColors - Array of colors in the outfit
 * @param {array} recommendedColors - Array of recommended colors
 * @returns {boolean} True if outfit has at least one recommended color
 */
const isColorMatch = (outfitColors, recommendedColors) => {
    if (!outfitColors || !recommendedColors) return false;
    return outfitColors.some(color => recommendedColors.includes(color));
};

/**
 * Calculate color match score (0-100)
 * @param {array} outfitColors - Array of colors in the outfit
 * @param {array} recommendedColors - Array of recommended colors
 * @returns {number} Match score percentage
 */
const getColorMatchScore = (outfitColors, recommendedColors) => {
    if (!outfitColors || !outfitColors.length) return 0;
    if (!recommendedColors || !recommendedColors.length) return 0;

    const matchingColors = outfitColors.filter(color => recommendedColors.includes(color));
    return Math.round((matchingColors.length / outfitColors.length) * 100);
};

/**
 * Get color emoji for display
 * @param {string} colorName - Name of the color
 * @returns {string} Emoji representation
 */
const getColorEmoji = (colorName) => {
    const emojiMap = {
        'Red': '🔴',
        'Orange': '🟠',
        'Yellow': '🟡',
        'Green': '🟢',
        'Blue': '🔵',
        'Purple': '🟣',
        'Pink': '🌸',
        'Brown': '🟤',
        'Black': '⚫',
        'White': '⚪',
        'Gray': '⚫',
        'Beige': '🟤',
        'Navy': '🔵',
        'Burgundy': '🔴',
        'Olive': '🟢',
        'Tan': '🟤',
        'Cream': '⚪',
        'Mint': '🟢',
        'Coral': '🟠'
    };

    return emojiMap[colorName] || '⚪';
};

module.exports = {
    getRecommendedColors,
    isColorMatch,
    getColorMatchScore,
    getColorEmoji,
    colorPsychology
};
