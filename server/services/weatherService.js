const axios = require('axios');

// REMOVED THE TOP-LEVEL API_KEY CONSTANT TO AVOID TIMING ISSUES
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const determineSeason = (month) => {
  if ([12, 1, 2].includes(month)) return 'Winter';
  if ([3, 4, 5].includes(month)) return 'Spring';
  if ([6, 7, 8].includes(month)) return 'Summer';
  return 'Fall';
};

const getCurrentWeather = async (lat, lon) => {
  try {
    // USE process.env DIRECTLY HERE
    const apiKey = process.env.OPEN_WEATHER_API_KEY; 
    
    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;
    
    const currentMonth = new Date().getMonth() + 1;
    
    return {
      temp: data.main.temp,
      feelsLike: data.main.feels_like,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      windSpeed: data.wind.speed,
      humidity: data.main.humidity,
      season: determineSeason(currentMonth),
    };

  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    throw new Error('Failed to retrieve weather data.');
  }
};

module.exports = { getCurrentWeather };