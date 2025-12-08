const express = require('express');
const dotenv = require('dotenv');

// 1. CONFIGURE DOTENV FIRST (Before importing routes)
dotenv.config(); 

const cors = require('cors');
const connectDB = require('./config/db');
const outfitRoutes = require('./routes/outfitRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route Mounts
app.use('/api/weather', weatherRoutes);
app.use('/api/outfits', outfitRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});