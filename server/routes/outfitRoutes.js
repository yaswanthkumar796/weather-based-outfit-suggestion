const express = require('express');
const router = express.Router();
const { suggestOutfit, createOutfit } = require('../controllers/outfitController');

// GET /api/outfits/suggest
router.get('/suggest', suggestOutfit);

// POST /api/outfits (NEW ROUTE)
router.post('/', createOutfit);

module.exports = router;