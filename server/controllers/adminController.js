const Technician = require('../models/Technician');
const Booking = require('../models/Booking');
const User = require('../models/User');
// @route   PUT /api/admin/booking/:id
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();
    res.json({ message: `Booking ${status} successfully`, booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bookings for admin
// @route   GET /api/admin/bookings
// @access  Private/Admin
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('user', 'name email')
      .populate({
        path: 'technician',
        populate: { path: 'user', select: 'name' }
      });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all stats for admin
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = async (req, res) => {
  try {
    const totalTechs = await Technician.countDocuments();
    const pendingVerifications = await Technician.countDocuments({ isVerified: false });
    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    
    res.json({
      totalTechs,
      pendingVerifications,
      totalBookings,
      totalUsers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify a technician
// @route   PUT /api/admin/verify/:id
// @access  Private/Admin
const verifyTechnician = async (req, res) => {
  try {
    const technician = await Technician.findById(req.params.id);
    if (!technician) {
      return res.status(404).json({ message: 'Technician not found' });
    }

    technician.isVerified = true;
    await technician.save();
    res.json({ message: 'Technician verified successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { verifyTechnician, getAdminStats, updateBookingStatus, getAllBookings };
