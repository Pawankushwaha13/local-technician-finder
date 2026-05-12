const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getTechBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/tech', protect, getTechBookings);
router.put('/:id/status', protect, updateBookingStatus);

module.exports = router;
