const express = require('express');
const router = express.Router();
const { suggestOutfit, createOutfit, getAllOutfits } = require('../controllers/outfitController');

// GET /api/outfits - Get all outfits
router.get('/', getAllOutfits);

// GET /api/outfits/suggest
router.get('/suggest', suggestOutfit);

// POST /api/outfits (NEW ROUTE)
router.post('/', createOutfit);

module.exports = router;