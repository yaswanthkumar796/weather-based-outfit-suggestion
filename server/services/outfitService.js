const Outfit = require('../models/Outfit');

const getSuggestions = async (weatherData, userPreferences = {}) => {
  const { temp, condition, season } = weatherData;

  // 1. Basic Query: Match temperature and weather condition
  // We look for outfits where the current temp is between the min and max
  const query = {
    tempMin: { $lte: temp }, 
    tempMax: { $gte: temp },
    // Optional: You can uncomment this line if you want strict matching for condition (e.g., 'Rain')
    // weatherCondition: condition 
  };

  // 2. Add filters based on User Preferences (if provided)
  if (userPreferences.favoriteSeasons && userPreferences.favoriteSeasons.length > 0) {
    query.season = { $in: userPreferences.favoriteSeasons };
  }

  // Fetch top 5 matching outfits
  const outfits = await Outfit.find(query).limit(5);
  return outfits;
};

module.exports = { getSuggestions };