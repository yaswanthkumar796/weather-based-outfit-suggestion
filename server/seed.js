const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Outfit = require('./models/Outfit'); // Adjust path if needed

// Load env vars
dotenv.config();

// Outfit Data to Insert
const outfits = [
  // --- SUMMER / WARM (20°C - 35°C) ---
  {
    name: "Classic Summer Tee",
    category: "Casual",
    weatherCondition: ["Clear", "Sunny", "Clouds"],
    tempMin: 20,
    tempMax: 35,
    items: ["Cotton T-Shirt", "Shorts", "Canvas Shoes"],
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=500&q=60",
    season: ["Summer", "Spring"]
  },
  {
    name: "Beach Ready",
    category: "Casual",
    weatherCondition: ["Clear", "Sunny"],
    tempMin: 25,
    tempMax: 40,
    items: ["Tank Top", "Swim Shorts", "Flip Flops", "Sunglasses"],
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=60",
    season: ["Summer"]
  },
  {
    name: "Summer Formal",
    category: "Formal",
    weatherCondition: ["Clear", "Clouds"],
    tempMin: 20,
    tempMax: 30,
    items: ["Linen Shirt", "Chinos", "Loafers"],
    imageUrl: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=500&q=60",
    season: ["Summer", "Spring"]
  },

  // --- MILD / SPRING / FALL (15°C - 24°C) ---
  {
    name: "Smart Casual Layers",
    category: "Casual",
    weatherCondition: ["Clouds", "Clear", "Drizzle"],
    tempMin: 15,
    tempMax: 24,
    items: ["Denim Jacket", "White Tee", "Black Jeans"],
    imageUrl: "https://images.unsplash.com/photo-1516257984-b1b4d8c9230c?auto=format&fit=crop&w=500&q=60",
    season: ["Spring", "Fall", "Winter"] // Added Winter for your "Warm Winter" case
  },
  {
    name: "Light Hoodie Vibe",
    category: "Casual",
    weatherCondition: ["Clouds", "Windy"],
    tempMin: 12,
    tempMax: 23,
    items: ["Hoodie", "Joggers", "Running Shoes"],
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=500&q=60",
    season: ["Spring", "Fall", "Winter"]
  },

  // --- COLD / WINTER (0°C - 14°C) ---
  {
    name: "Winter Wool Coat",
    category: "Formal",
    weatherCondition: ["Clouds", "Clear", "Snow"],
    tempMin: -5,
    tempMax: 12,
    items: ["Wool Coat", "Sweater", "Scarf", "Boots"],
    imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=500&q=60",
    season: ["Winter"]
  },
  {
    name: "Puffer Jacket Protection",
    category: "Casual",
    weatherCondition: ["Snow", "Rain", "Windy"],
    tempMin: -10,
    tempMax: 10,
    items: ["Puffer Jacket", "Thermals", "Beanie", "Gloves"],
    imageUrl: "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=500&q=60",
    season: ["Winter"]
  },

  // --- RAINY (Any Temp) ---
  {
    name: "Rainy Day Essentials",
    category: "Casual",
    weatherCondition: ["Rain", "Drizzle", "Thunderstorm"],
    tempMin: 10,
    tempMax: 25,
    items: ["Raincoat", "Waterproof Boots", "Umbrella"],
    imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=500&q=60",
    season: ["Spring", "Fall", "Summer", "Winter"]
  }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // OPTIONAL: Clear existing data to avoid duplicates
    // await Outfit.deleteMany(); 
    // console.log('🗑️  Old Data Destroyed');

    await Outfit.insertMany(outfits);
    console.log('🌱 Data Imported Successfully!');

    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();