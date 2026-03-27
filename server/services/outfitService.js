const Outfit = require('../models/Outfit');

const getSuggestions = async (weatherData, userPreferences = {}) => {
  const { temp, condition, season } = weatherData;

  const query = {
    season: season,
  };

  
  if (userPreferences.favoriteSeasons && userPreferences.favoriteSeasons.length > 0) {
    query.season = { $in: userPreferences.favoriteSeasons };
  }

  
  if (userPreferences.gender) {
    
    const searchGender = userPreferences.gender.charAt(0).toUpperCase() + userPreferences.gender.slice(1).toLowerCase();



    
    query.$or = [
      { gender: searchGender },
      { gender: 'Unisex' },
      { gender: { $exists: false } }
    ];
  }

  console.log("Final Query:", JSON.stringify(query, null, 2));

  
  const outfits = await Outfit.find(query).limit(100);
  console.log(`Found ${outfits.length} outfits`);
  return outfits;

};

module.exports = {
  getSuggestions,
  getOutfitSuggestions: getSuggestions 
};