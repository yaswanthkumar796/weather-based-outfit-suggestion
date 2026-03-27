import axios from 'axios';


const API_URL = 'http://localhost:5000/api/weather';

export const fetchWeather = async (lat, lon, city, gender) => {
  try {
    let url = `${API_URL}/current?`;

    if (city) {
      url += `city=${encodeURIComponent(city)}`;
    } else if (lat && lon) {
      url += `lat=${lat}&lon=${lon}`;
    } else {
      throw new Error("Location data missing");
    }

    if (gender) {
      url += `&gender=${gender}`;
    }

    const response = await axios.get(url);
    return response.data; 
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error.response?.data?.message || "Failed to fetch weather data";
  }
};


export const fetchSuggestions = (lat, lon) => fetchWeather(lat, lon);