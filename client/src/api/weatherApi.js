import axios from 'axios';

// Ensure this matches your backend port
const API_BASE_URL = 'http://localhost:5000/api'; 

export const fetchSuggestions = async (lat, lon) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/outfits/suggest`, {
      params: { lat, lon }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
};