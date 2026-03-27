const express = require('express');
const router = express.Router();
const { suggestOutfit, createOutfit, getAllOutfits } = require('../controllers/outfitController');


router.get('/', getAllOutfits);

router.get('/suggest', suggestOutfit);

router.post('/', createOutfit);

module.exports = router;