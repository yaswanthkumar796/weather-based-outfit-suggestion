import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const createOutfit = async (outfitData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/outfits`, outfitData);
    return response.data;
  } catch (error) {
    throw error;
  }
};