const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Outfit = require('./models/Outfit'); // Adjust path if needed

// Load env vars
dotenv.config();

// Outfit Data to Insert
const outfits = [

  // --- CASUAL (5 Examples) ---
  {
    name: "Summer Graphic Tee",
    category: "Casual",
    weatherCondition: ["Clear", "Sunny", "Clouds"],
    tempMin: 22,
    tempMax: 35,
    items: ["Graphic T-Shirt", "Denim Shorts", "Sneakers", "Sunglasses"],
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=500&q=60",
    season: ["Summer"]
  },
  {
    name: "Autumn Flannel Layer",
    category: "Casual",
    weatherCondition: ["Clouds", "Windy", "Clear"],
    tempMin: 10,
    tempMax: 20,
    items: ["Flannel Shirt", "White Undershirt", "Chinos", "Desert Boots"],
    imageUrl: "https://images.unsplash.com/photo-1516257984-b1b4d8c9230c?auto=format&fit=crop&w=500&q=60",
    season: ["Fall", "Spring"]
  },
  {
    name: "Winter Puffer Ease",
    category: "Casual",
    weatherCondition: ["Snow", "Rain", "Clouds"],
    tempMin: -5,
    tempMax: 10,
    items: ["Puffer Jacket", "Hoodie", "Jeans", "Beanies"],
    imageUrl: "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=500&q=60",
    season: ["Winter"]
  },
  {
    name: "Spring Denim Vibe",
    category: "Casual",
    weatherCondition: ["Clear", "Clouds"],
    tempMin: 15,
    tempMax: 25,
    items: ["Denim Jacket", "Striped Tee", "Black Jeans", "White Sneakers"],
    imageUrl: "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=500&q=60",
    season: ["Spring"]
  },
  {
    name: "Cozy Knitwear",
    category: "Casual",
    weatherCondition: ["Clouds", "Rain"],
    tempMin: 5,
    tempMax: 15,
    items: ["Oversized Sweater", "Leggings", "Ankle Boots"],
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=500&q=60",
    season: ["Fall", "Winter"]
  },

  // --- WORK (5 Examples) ---
  {
    name: "Summer Business Light",
    category: "Work",
    weatherCondition: ["Clear", "Sunny"],
    tempMin: 20,
    tempMax: 30,
    items: ["Linen Blazer", "Polo Shirt", "Tailored Trousers", "Loafers"],
    imageUrl: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=500&q=60",
    season: ["Summer"]
  },
  {
    name: "Corporate Sharp",
    category: "Work",
    weatherCondition: ["Clouds", "Clear"],
    tempMin: 10,
    tempMax: 22,
    items: ["Navy Suit", "White Dress Shirt", "Tie", "Oxford Shoes"],
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c47e356?auto=format&fit=crop&w=500&q=60",
    season: ["Fall", "Spring", "Winter"]
  },
  {
    name: "Smart Casual Office",
    category: "Work",
    weatherCondition: ["Clouds", "Rain"],
    tempMin: 15,
    tempMax: 25,
    items: ["Turtleneck", "Checkered Blazer", "Dark Jeans", "Chelsea Boots"],
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=60",
    season: ["Fall", "Winter"]
  },
  {
    name: "Warm Commuter",
    category: "Work",
    weatherCondition: ["Snow", "Rain", "Windy"],
    tempMin: -5,
    tempMax: 10,
    items: ["Wool Overcoat", "Suit Trousers", "Sweater", "Leather Gloves"],
    imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=500&q=60",
    season: ["Winter"]
  },
  {
    name: "Breezy Friday",
    category: "Work",
    weatherCondition: ["Sunny", "Clear"],
    tempMin: 22,
    tempMax: 29,
    items: ["Button-down Shirt (Rolled Sleeves)", "Chinos", "Boat Shoes"],
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=60",
    season: ["Summer", "Spring"]
  },

  // --- FORMAL (5 Examples) ---
  {
    name: "Black Tie Galaxy",
    category: "Formal",
    weatherCondition: ["Clear", "Clouds"],
    tempMin: 10,
    tempMax: 25,
    items: ["Tuxedo", "Bow Tie", "Patent Leather Shoes", "Cufflinks"],
    imageUrl: "https://images.unsplash.com/photo-1566232392379-afd9298e6a46?auto=format&fit=crop&w=500&q=60",
    season: ["Winter", "Fall", "Spring"]
  },
  {
    name: "Summer Wedding Guest",
    category: "Formal",
    weatherCondition: ["Sunny", "Clear"],
    tempMin: 22,
    tempMax: 32,
    items: ["Light Grey Suit", "Pastel Shirt", "Brown Loafers", "Pocket Square"],
    imageUrl: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&w=500&q=60",
    season: ["Summer"]
  },
  {
    name: "Gala Glamour",
    category: "Formal",
    weatherCondition: ["Clear", "Windy"],
    tempMin: 15,
    tempMax: 25,
    items: ["Evening Gown/Velvet Jacket", "Statement Jewelry", "Heels/Dress Shoes"],
    imageUrl: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=500&q=60",
    season: ["Fall", "Spring"]
  },
  {
    name: "Winter Formal Layering",
    category: "Formal",
    weatherCondition: ["Snow", "Clouds"],
    tempMin: -2,
    tempMax: 10,
    items: ["Three-piece Suit", "Wool Overcoat", "Leather Gloves"],
    imageUrl: "https://images.unsplash.com/photo-1497339100210-9e87df79c218?auto=format&fit=crop&w=500&q=60",
    season: ["Winter"]
  },
  {
    name: "Cocktail Attire",
    category: "Formal",
    weatherCondition: ["Clear", "Clouds"],
    tempMin: 18,
    tempMax: 26,
    items: ["Dark Suit", "Crisp White Shirt", "No Tie", "Derby Shoes"],
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=60",
    season: ["Spring", "Fall"]
  },

  // --- PARTY (5 Examples) ---
  {
    name: "Rooftop Party",
    category: "Party",
    weatherCondition: ["Clear", "Sunny"],
    tempMin: 20,
    tempMax: 30,
    items: ["Silk Shirt", "Tailored Trousers", "Designer Loafers"],
    imageUrl: "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=500&q=60",
    season: ["Summer"]
  },
  {
    name: "Club Night",
    category: "Party",
    weatherCondition: ["Clouds", "Clear"],
    tempMin: 15,
    tempMax: 25,
    items: ["Black Tee", "Leather Jacket", "Ripped Jeans", "Boots"],
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=500&q=60",
    season: ["Fall", "Spring", "Winter"]
  },
  {
    name: "House Party Chaos",
    category: "Party",
    weatherCondition: ["Rain", "Clouds"],
    tempMin: 10,
    tempMax: 20,
    items: ["Graphic Hoodie", "Cargo Pants", "High-top Sneakers"],
    imageUrl: "https://images.unsplash.com/photo-1529139574466-a3005c404464?auto=format&fit=crop&w=500&q=60",
    season: ["Fall", "Winter"]
  },
  {
    name: "Beach Bonfire",
    category: "Party",
    weatherCondition: ["Clear", "Windy"],
    tempMin: 18,
    tempMax: 25,
    items: ["Oversized Knit Sweater", "Shorts", "Sandals"],
    imageUrl: "https://images.unsplash.com/photo-1520013577549-18dec313f01c?auto=format&fit=crop&w=500&q=60",
    season: ["Summer", "Spring"]
  },
  {
    name: "Holiday Gathering",
    category: "Party",
    weatherCondition: ["Snow", "Clouds"],
    tempMin: -5,
    tempMax: 10,
    items: ["Festive Sweater", "Corduroy Pants", "Warm Socks"],
    imageUrl: "https://images.unsplash.com/photo-1576158187530-97c88b577c63?auto=format&fit=crop&w=500&q=60",
    season: ["Winter"]
  },

  // --- DATE (5 Examples) ---
  {
    name: "Romantic Dinner",
    category: "Date",
    weatherCondition: ["Clear", "Clouds"],
    tempMin: 15,
    tempMax: 25,
    items: ["Button-down Shirt", "Dark Denim", "Boots", "Watch"],
    imageUrl: "https://images.unsplash.com/photo-1517462964-21fdcec3f25e?auto=format&fit=crop&w=500&q=60",
    season: ["Fall", "Spring"]
  },
  {
    name: "Coffee Date",
    category: "Date",
    weatherCondition: ["Clouds", "Rain"],
    tempMin: 10,
    tempMax: 20,
    items: ["Camel Coat", "Turtleneck", "Jeans", "Sneakers"],
    imageUrl: "https://images.unsplash.com/photo-1485230946086-1d99d52571eb?auto=format&fit=crop&w=500&q=60",
    season: ["Fall", "Winter"]
  },
  {
    name: "Summer Picnic",
    category: "Date",
    weatherCondition: ["Sunny", "Clear"],
    tempMin: 22,
    tempMax: 30,
    items: ["Floral Dress / Short Sleeve Shirt", "Sandals", "Hat"],
    imageUrl: "https://images.unsplash.com/photo-1523380744952-b7e00e6e2ffa?auto=format&fit=crop&w=500&q=60",
    season: ["Summer"]
  },
  {
    name: "Movie Night Cozy",
    category: "Date",
    weatherCondition: ["Rain", "Snow"],
    tempMin: 0,
    tempMax: 15,
    items: ["Soft Hoodie", "Joggers", "Warm Socks", "Blanket Scarf"],
    imageUrl: "https://images.unsplash.com/photo-1519764622345-23439dd774f7?auto=format&fit=crop&w=500&q=60",
    season: ["Winter", "Fall"]
  },
  {
    name: "Museum Walk",
    category: "Date",
    weatherCondition: ["Clouds", "Clear"],
    tempMin: 15,
    tempMax: 25,
    items: ["Minimalist Tee", "Trousers", "Trench Coat", "White Sneakers"],
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=60",
    season: ["Spring", "Fall"]
  },

  // --- TRAVEL (5 Examples) ---
  {
    name: "Airport Comfort",
    category: "Travel",
    weatherCondition: ["Clouds", "Rain", "Clear"],
    tempMin: 15,
    tempMax: 25,
    items: ["Tracksuit", "Comfortable Sneakers", "Noise-cancelling Headphones", "Backpack"],
    imageUrl: "https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&w=500&q=60",
    season: ["All Year"]
  },
  {
    name: "Tropical Getaway",
    category: "Travel",
    weatherCondition: ["Sunny", "Clear"],
    tempMin: 25,
    tempMax: 35,
    items: ["Swimwear", "Sarong/Cover-up", "Flip Flops", "Sun Hat"],
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=60",
    season: ["Summer"]
  },
  {
    name: "City Explorer",
    category: "Travel",
    weatherCondition: ["Clouds", "Clear"],
    tempMin: 12,
    tempMax: 22,
    items: ["Walking Shoes", "Crossbody Bag", "Layers", "Jeans"],
    imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=500&q=60",
    season: ["Spring", "Fall"]
  },
  {
    name: "Winter Expedition",
    category: "Travel",
    weatherCondition: ["Snow", "Windy"],
    tempMin: -10,
    tempMax: 5,
    items: ["Heavy Parka", "Snow Boots", "Thermal Layers", "Wool Hat"],
    imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=500&q=60",
    season: ["Winter"]
  },
  {
    name: "Train Hop",
    category: "Travel",
    weatherCondition: ["Rain", "Clouds"],
    tempMin: 10,
    tempMax: 20,
    items: ["Cardigan", "Scarf", "Ankle Boots", "Tote Bag"],
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=500&q=60",
    season: ["Fall", "Spring"]
  },

  // --- OUTDOOR ACTIVITY (5 Examples) ---
  {
    name: "Hiking Adventure",
    category: "Outdoor Activity",
    weatherCondition: ["Clear", "Clouds"],
    tempMin: 10,
    tempMax: 25,
    items: ["Performance T-Shirt", "Hiking Pants", "Hiking Boots", "Cap"],
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=500&q=60",
    season: ["Spring", "Summer", "Fall"]
  },
  {
    name: "Winter Ski Trip",
    category: "Outdoor Activity",
    weatherCondition: ["Snow", "Clear"],
    tempMin: -15,
    tempMax: 0,
    items: ["Ski Jacket", "Snow Pants", "Goggles", "Thermal Base Layer"],
    imageUrl: "https://images.unsplash.com/photo-1551524164-687a55dd1126?auto=format&fit=crop&w=500&q=60",
    season: ["Winter"]
  },
  {
    name: "Park Jog",
    category: "Outdoor Activity",
    weatherCondition: ["Clouds", "Sunny"],
    tempMin: 15,
    tempMax: 25,
    items: ["Running Shorts", "Tank Top", "Running Shoes", "Armband"],
    imageUrl: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=500&q=60",
    season: ["Summer", "Spring"]
  },
  {
    name: "Rainy Camping",
    category: "Outdoor Activity",
    weatherCondition: ["Rain", "Drizzle"],
    tempMin: 10,
    tempMax: 18,
    items: ["Waterproof Shell", "Quick-dry Pants", "Waterproof Boots", "Hat"],
    imageUrl: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=500&q=60",
    season: ["Fall", "Spring"]
  },
  {
    name: "Evening Stroll",
    category: "Outdoor Activity",
    weatherCondition: ["Clear", "Windy"],
    tempMin: 15,
    tempMax: 22,
    items: ["Windbreaker", "Leggings", "Sneakers"],
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=500&q=60",
    season: ["Spring", "Fall"]
  },

  // --- SPORTS/ACTIVE (5 Examples) ---
  {
    name: "Gym Grind",
    category: "Sports/Active",
    weatherCondition: ["Clear", "Rain", "Snow", "Clouds"],
    tempMin: -20,
    tempMax: 40,
    items: ["Performance Tee", "Shorts", "Training Shoes", "Towel"],
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=500&q=60",
    season: ["All Year"]
  },
  {
    name: "Yoga Flow",
    category: "Sports/Active",
    weatherCondition: ["Clouds", "Sunny"],
    tempMin: 18,
    tempMax: 30,
    items: ["Yoga Pants", "Sports Bra/Tank", "Barefoot/Grip Socks"],
    imageUrl: "https://images.unsplash.com/photo-1544367563-12123d896889?auto=format&fit=crop&w=500&q=60",
    season: ["All Year"]
  },
  {
    name: "Cold Run",
    category: "Sports/Active",
    weatherCondition: ["Clouds", "Snow"],
    tempMin: -5,
    tempMax: 10,
    items: ["Thermal Leggings", "Long Sleeve Running Top", "Gloves", "Headband"],
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=500&q=60",
    season: ["Winter", "Fall"]
  },
  {
    name: "Basketball Court",
    category: "Sports/Active",
    weatherCondition: ["Sunny", "Clouds"],
    tempMin: 20,
    tempMax: 35,
    items: ["Jersey", "Basketball Shorts", "High-tops"],
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=500&q=60",
    season: ["Summer", "Spring"]
  },
  {
    name: "Golf Day",
    category: "Sports/Active",
    weatherCondition: ["Clear", "Clouds"],
    tempMin: 15,
    tempMax: 28,
    items: ["Polo Shirt", "Golf Trousers", "Golf Shoes", "Cap"],
    imageUrl: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=500&q=60",
    season: ["Spring", "Summer", "Fall"]
  }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Remove existing to start fresh and ensure duplicates aren't piled up
    await Outfit.deleteMany(); 
    console.log('🗑️  Old Data Cleared');

    await Outfit.insertMany(outfits);
    console.log('🌱 Data Imported Successfully!');

    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();