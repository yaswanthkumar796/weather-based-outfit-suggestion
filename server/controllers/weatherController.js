const { getCurrentWeather } = require('../services/weatherService');

const getWeather = async (req, res) => {
  const { lat, lon } = req.query; // Get lat and lon from the URL query string

  // Basic validation
  if (!lat || !lon) {
    return res.status(400).json({ 
      message: 'Latitude (lat) and Longitude (lon) query parameters are required.' 
    });
  }

  try {
    const weatherData = await getCurrentWeather(lat, lon);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getWeather };