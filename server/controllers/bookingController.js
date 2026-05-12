const Booking = require('../models/Booking');
const Technician = require('../models/Technician');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const { technicianId, slot, notes, totalAmount } = req.body;

    const technician = await Technician.findById(technicianId);
    if (!technician) {
      return res.status(404).json({ message: 'Technician not found' });
    }

    const booking = new Booking({
      user: req.user._id,
      technician: technicianId,
      slot,
      notes,
      totalAmount
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({
        path: 'technician',
        populate: { path: 'user', select: 'name' }
      });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get technician bookings
// @route   GET /api/bookings/tech
// @access  Private (Technician only)
const getTechBookings = async (req, res) => {
  try {
    const technician = await Technician.findOne({ user: req.user._id });
    if (!technician) {
      return res.status(404).json({ message: 'Technician profile not found' });
    }

    const bookings = await Booking.find({ technician: technician._id })
      .populate('user', 'name email');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private (Technician only)
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const technician = await Technician.findOne({ user: req.user._id });
    if (!technician || booking.technician.toString() !== technician._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this booking' });
    }

    booking.status = status;
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createBooking, getMyBookings, getTechBookings, updateBookingStatus };
