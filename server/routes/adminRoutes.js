const express = require('express');
const router = express.Router();
const { authAdmin, getRequests, approveRequest, rejectRequest, seedAdmin } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/login', authAdmin);
router.post('/seed', seedAdmin); // Temp route to create admin

// Protected routes
router.get('/requests', protect, getRequests);
router.post('/requests/:id/approve', protect, approveRequest);
router.post('/requests/:id/reject', protect, rejectRequest);

module.exports = router;
