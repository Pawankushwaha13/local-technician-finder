const mongoose = require('mongoose');

const technicianSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  specialization: {
    type: [String],
    required: true, // e.g. ['Home Repair', 'Computer Repair']
  },
  bio: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true, // e.g. "Mumbai, India"
  },
  experience: {
    type: Number,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviewsCount: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  availableSlots: {
    type: [String], // Array of ISO strings or specific time formats
    default: [],
  },
  image: {
    type: String,
    default: '',
  }
}, { timestamps: true });

module.exports = mongoose.model('Technician', technicianSchema);
