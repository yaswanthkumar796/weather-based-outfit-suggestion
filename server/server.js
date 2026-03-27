const express = require('express');
const dotenv = require('dotenv');


dotenv.config();

const cors = require('cors');
const connectDB = require('./config/db');
const outfitRoutes = require('./routes/outfitRoutes');

const weatherRoutes = require('./routes/weatherRoutes');
const adminRoutes = require('./routes/adminRoutes'); 
const feedbackRoutes = require('./routes/feedbackRoutes');


connectDB();

const app = express();


app.use(express.json());
app.use(cors());


app.use('/api/weather', weatherRoutes);
app.use('/api/outfits', outfitRoutes);
app.use('/api/admin', adminRoutes); 
app.use('/api/feedback', feedbackRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});