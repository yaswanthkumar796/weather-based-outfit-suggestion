const { getWeatherData } = require('../services/weatherService');
const { getOutfitSuggestions } = require('../services/outfitService');

const getWeather = async (req, res) => {
  const { lat, lon, city } = req.query;

  // Basic validation
  if (!city && (!lat || !lon)) {
    return res.status(400).json({
      message: 'Please provide a city name OR latitude/longitude.'
    });
  }

  try {
    // 1. Get Weather + Forecast
    const weatherData = await getWeatherData({ lat, lon, city });

    // 2. Get Outfit Suggestions based on CURRENT weather
    // (Future improvement: Suggest based on forecast too)
    const { gender } = req.query;
    const suggestions = await getOutfitSuggestions(weatherData.current, { gender });

    res.json({
      location: weatherData.location,
      weather: weatherData.current, // Keeping 'weather' key for backward compat with frontend
      forecast: weatherData.forecast,
      suggestions
    });
  } catch (error) {
    const status = error.message === 'City not found' ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

module.exports = { getWeather };