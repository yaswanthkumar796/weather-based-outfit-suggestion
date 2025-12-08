const Outfit = require('../models/Outfit');
const { getCurrentWeather } = require('../services/weatherService');
const { getSuggestions } = require('../services/outfitService');

// 1. Suggest Outfit Logic
const suggestOutfit = async (req, res) => {
  const { lat, lon } = req.query; 

  if (!lat || !lon) {
    return res.status(400).json({ message: 'Latitude and Longitude are required.' });
  }

  try {
    // Get Real Weather
    const weatherData = await getCurrentWeather(lat, lon);
    
    // Get Suggestions based on that weather
    const suggestions = await getSuggestions(weatherData);

    // Send back both
    res.json({ weather: weatherData, suggestions });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// 2. Create Outfit Logic (NEW)
const createOutfit = async (req, res) => {
  try {
    const newOutfit = new Outfit(req.body);
    const savedOutfit = await newOutfit.save();
    res.status(201).json(savedOutfit);
  } catch (error) {
    res.status(400).json({ message: 'Error creating outfit', error: error.message });
  }
};

module.exports = { suggestOutfit, createOutfit };