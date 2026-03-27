const Outfit = require('../models/Outfit');
const Request = require('../models/Request');
const { getCurrentWeather } = require('../services/weatherService');
const { getSuggestions } = require('../services/outfitService');
const { getRecommendedColors } = require('../services/colorPsychologyService');

const suggestOutfit = async (req, res) => {
  const { lat, lon, gender } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ message: 'Latitude and Longitude are required.' });
  }

  try {
    
    const weatherData = await getCurrentWeather(lat, lon);

    
    const colorRecommendations = getRecommendedColors(
      weatherData.weather[0].main,
      weatherData.weather[0].description,
      weatherData.main.temp
    );

    
    const suggestions = await getSuggestions(weatherData, { gender });

    
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



const createOutfit = async (req, res) => {
  try {
    
    const newRequest = new Request({
      ...req.body,
      status: 'Pending' 
    });
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(400).json({ message: 'Error submitting outfit request', error: error.message });
  }
};


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