const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Outfit = require('./models/Outfit');

// Load env vars
dotenv.config();

// WINTER ONLY COLLECTION
// Includes "Warm Winter" (for your 23°C) and "Cold Winter" (for chilly nights)
const winterOutfits = [
  // --- WARM WINTER (18°C - 26°C) ---
  // Perfect for your current weather
  {
    name: "Light Winter Hoodie",
    category: "Casual",
    weatherCondition: ["Clear", "Clouds", "Windy"],
    tempMin: 15,
    tempMax: 26,
    items: ["Light Hoodie", "Jeans", "Sneakers"],
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=500&q=60",
    season: ["Winter"]
  },
  {
    name: "Winter Sun Casual",
    category: "Casual",
    weatherCondition: ["Clear", "Sunny"],
    tempMin: 18,
    tempMax: 28,
    items: ["Long Sleeve Tee", "Chinos", "Casual Shoes"],
    imageUrl: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=500&q=60",
    season: ["Winter"]
  },
  {
    name: "Office Light Layers",
    category: "Formal",
    weatherCondition: ["Clear", "Clouds"],
    tempMin: 18,
    tempMax: 25,
    items: ["Button Up Shirt", "Light Sweater Vest", "Trousers"],
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=60",
    season: ["Winter"]
  },

  // --- COOL WINTER (10°C - 17°C) ---
  {
    name: "Denim & Knit",
    category: "Casual",
    weatherCondition: ["Clouds", "Windy"],
    tempMin: 10,
    tempMax: 17,
    items: ["Denim Jacket", "Wool Sweater", "Black Jeans"],
    imageUrl: "https://images.unsplash.com/photo-1516257984-b1b4d8c9230c?auto=format&fit=crop&w=500&q=60",
    season: ["Winter"]
  },

  // --- COLD WINTER (0°C - 10°C) ---
  {
    name: "Puffer Jacket Fit",
    category: "Casual",
    weatherCondition: ["Clouds", "Clear", "Rain"],
    tempMin: 0,
    tempMax: 10,
    items: ["Puffer Jacket", "Thermals", "Boots"],
    imageUrl: "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=500&q=60",
    season: ["Winter"]
  },
  {
    name: "Formal Overcoat",
    category: "Formal",
    weatherCondition: ["Clear", "Clouds"],
    tempMin: -5,
    tempMax: 12,
    items: ["Long Wool Coat", "Scarf", "Formal Boots"],
    imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=500&q=60",
    season: ["Winter"]
  }
];

const resetData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // 1. DELETE ALL OLD DATA (Cleans up the summer stuff)
    await Outfit.deleteMany({}); 
    console.log('🗑️  Deleted all old/random outfits.');

    // 2. INSERT NEW WINTER DATA
    await Outfit.insertMany(winterOutfits);
    console.log('❄️  Inserted 6 curated Winter outfits (Warm & Cold types).');

    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

resetData();