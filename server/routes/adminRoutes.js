const express = require('express');
const router = express.Router();
const { authAdmin, getRequests, approveRequest, rejectRequest, seedAdmin } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');


router.post('/login', authAdmin);
router.post('/seed', seedAdmin);


router.get('/requests', protect, getRequests);
router.post('/requests/:id/approve', protect, approveRequest);
router.post('/requests/:id/reject', protect, rejectRequest);

module.exports = router;
