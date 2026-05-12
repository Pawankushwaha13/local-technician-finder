const express = require('express');
const router = express.Router();
const { verifyTechnician, getAdminStats, getAllBookings, updateBookingStatus } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.get('/stats', protect, admin, getAdminStats);
router.get('/bookings', protect, admin, getAllBookings);
router.put('/verify/:id', protect, admin, verifyTechnician);
router.put('/booking/:id', protect, admin, updateBookingStatus);

module.exports = router;
