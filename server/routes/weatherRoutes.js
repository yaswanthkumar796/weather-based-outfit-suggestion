const express = require('express');
const router = express.Router();
const { getWeather } = require('../controllers/weatherController');

// GET /api/weather/current?lat=...&lon=...
router.get('/current', getWeather);

module.exports = router;