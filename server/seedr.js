const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Outfit = require('./models/Outfit');

// Load env vars
dotenv.config();

// WINTER ONLY COLLECTION
// Using specific, high-quality Unsplash Photo IDs to ensure visibility
const winterOutfits = [
  // --- MALE OUTFITS ---
  {
    name: "Male Winter Hoodie",
    category: "Casual",
    weatherCondition: ["Clear", "Clouds", "Windy"],
    tempMin: 15,
    tempMax: 26,
    items: ["Heavy Hoodie", "Cargo Pants", "Sneakers"],
    // Photo by radubik on Unsplash (Man in hoodie)
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    season: ["Winter"],
    gender: "Male"
  },
  {
    name: "Male Smart Casual",
    category: "Casual",
    weatherCondition: ["Clear", "Sunny"],
    tempMin: 18,
    tempMax: 28,
    items: ["Long Sleeve Henley", "Chinos", "Boots"],
    // Photo by hannah morgan on Unsplash (Man in casual winter wear)
    imageUrl: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    season: ["Winter"],
    gender: "Male"
  },
  {
    name: "Male Office Layering",
    category: "Formal",
    weatherCondition: ["Clear", "Clouds"],
    tempMin: 15,
    tempMax: 25,
    items: ["Button Down Shirt", "V-Neck Sweater", "Dress Trousers"],
    // Photo by hunting_pixel on Unsplash (Man in suit/formal)
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    season: ["Winter"],
    gender: "Male"
  },
  {
      name: "Male Puffer Style",
      category: "Casual",
      weatherCondition: ["Clouds", "Rain", "Snow"],
      tempMin: -5,
      tempMax: 15,
      items: ["Puffer Jacket", "Thermals", "Jeans", "Winter Boots"],
      // Photo by ozguromer (Man in winter jacket)
      imageUrl: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      season: ["Winter"],
      gender: "Male"
  },

  // --- FEMALE OUTFITS ---
  {
    name: "Cozy Winter Sweater",
    category: "Casual",
    weatherCondition: ["Clear", "Clouds"],
    tempMin: 15,
    tempMax: 25,
    items: ["Oversized Knit Sweater", "Leggings", "Ankle Boots"],
    // Photo by kyleloftus (Woman in sweater)
    imageUrl: "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    season: ["Winter"],
    gender: "Female"
  },
  {
    name: "Chic Winter Coat",
    category: "Formal",
    weatherCondition: ["Clouds", "Windy"],
    tempMin: 10,
    tempMax: 20,
    items: ["Trench Coat", "Scarf", "Boots"],
    // Photo by thecreative_vibe (Woman in coat)
    imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    season: ["Winter"],
    gender: "Female"
  },
  {
    name: "Winter Dress Look",
    category: "Formal",
    weatherCondition: ["Sunny", "Clear"],
    tempMin: 18,
    tempMax: 28,
    items: ["Long Sleeve Dress", "Tights", "Cardigan"],
    // Photo by alexandra gorn (Woman in winter dress/knitwear)
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    season: ["Winter"],
    gender: "Female"
  },

  // --- UNISEX OUTFITS ---
   {
    name: "Classic Denim & Wool",
    category: "Casual",
    weatherCondition: ["Clouds", "Windy"],
    tempMin: 10,
    tempMax: 17,
    items: ["Denim Jacket", "Wool Sweater", "Black Jeans"],
    // Photo by munga (Denim/Streetwear)
    imageUrl: "https://images.unsplash.com/photo-1516257984-b1b4d8c9230c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    season: ["Winter"],
    gender: "Unisex"
  },
];

const resetData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // 1. DELETE ALL OLD DATA
    await Outfit.deleteMany({}); 
    console.log('🗑️  Deleted all old/random outfits.');

    // 2. INSERT NEW WINTER DATA
    await Outfit.insertMany(winterOutfits);
    console.log('❄️  Inserted diverse Winter outfits with NEW HIGH-QUALITY IMAGES.');

    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

resetData();