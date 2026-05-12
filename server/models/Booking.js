const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technician',
    required: true,
  },
  slot: {
    type: String, // Time slot selected
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  notes: {
    type: String,
  },
  totalAmount: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
