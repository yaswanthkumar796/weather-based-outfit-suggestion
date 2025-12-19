const Outfit = require('../models/Outfit');

const getSuggestions = async (weatherData, userPreferences = {}) => {
  const { temp, condition, season } = weatherData;

  // 1. Basic Query: Match season only (ignore temperature limits)
  // We look for outfits that are suitable for the current season
  const query = {
    season: season,
  };

  // 2. Add filters based on User Preferences (if provided)
  if (userPreferences.favoriteSeasons && userPreferences.favoriteSeasons.length > 0) {
    query.season = { $in: userPreferences.favoriteSeasons };
  }

  // Gender Filter
  if (userPreferences.gender) {
    // Normalize input to Title Case (male -> Male) to match Seed Data
    const searchGender = userPreferences.gender.charAt(0).toUpperCase() + userPreferences.gender.slice(1).toLowerCase();



    // Match requested gender OR Unisex OR outfits with no gender field (legacy)
    query.$or = [
      { gender: searchGender },
      { gender: 'Unisex' },
      { gender: { $exists: false } }
    ];
  }

  console.log("Final Query:", JSON.stringify(query, null, 2));

  // Fetch matching outfits (increased limit to ensure diverse categories are returned)
  const outfits = await Outfit.find(query).limit(100);
  console.log(`Found ${outfits.length} outfits`);
  return outfits;

};

module.exports = {
  getSuggestions,
  getOutfitSuggestions: getSuggestions // Alias for controller
};