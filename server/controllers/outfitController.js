const Outfit = require('../models/Outfit');
const Request = require('../models/Request');
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

module.exports = { suggestOutfit, createOutfit };