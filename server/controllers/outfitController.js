const Outfit = require('../models/Outfit');
const Request = require('../models/Request');
const { getCurrentWeather } = require('../services/weatherService');
const { getSuggestions } = require('../services/outfitService');
const { getRecommendedColors } = require('../services/colorPsychologyService');

// 1. Suggest Outfit Logic
const suggestOutfit = async (req, res) => {
  const { lat, lon, gender } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ message: 'Latitude and Longitude are required.' });
  }

  try {
    // Get Real Weather
    const weatherData = await getCurrentWeather(lat, lon);

    // Get Color Recommendations based on weather
    const colorRecommendations = getRecommendedColors(
      weatherData.weather[0].main,
      weatherData.weather[0].description,
      weatherData.main.temp
    );

    // Get Suggestions based on that weather
    const suggestions = await getSuggestions(weatherData, { gender });

    // Send back weather, suggestions, and color recommendations
    res.json({
      weather: weatherData,
      suggestions,
      colorRecommendations
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// 2. Create Outfit Logic (NEW)
// 2. Submit Outfit Request (Modified for Approval Flow)
const createOutfit = async (req, res) => {
  try {
    // Instead of creating an Outfit directly, we create a Request for approval
    const newRequest = new Request({
      ...req.body,
      status: 'Pending' // Ensure it starts as pending
    });
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(400).json({ message: 'Error submitting outfit request', error: error.message });
  }
};

// 3. Get All Outfits (for Gallery)
const getAllOutfits = async (req, res) => {
  try {
    const outfits = await Outfit.find({}).sort({ createdAt: -1 });
    res.json(outfits);
  } catch (error) {
    console.error('Error fetching outfits:', error);
    res.status(500).json({ message: 'Error fetching outfits', error: error.message });
  }
};

module.exports = { suggestOutfit, createOutfit, getAllOutfits };