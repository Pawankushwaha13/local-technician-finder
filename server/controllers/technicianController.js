const Technician = require('../models/Technician');
const User = require('../models/User');

// @desc    Get all technicians with filters
// @route   GET /api/technicians
// @access  Public
const getTechnicians = async (req, res) => {
  try {
    const { category, location, minRating } = req.query;
    let query = {};

    if (category) {
      query.specialization = { $in: [category] };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }

    const technicians = await Technician.find(query).populate('user', 'name email avatar');
    res.json(technicians);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get technician by ID
// @route   GET /api/technicians/:id
// @access  Public
const getTechnicianById = async (req, res) => {
  try {
    const technician = await Technician.findById(req.params.id).populate('user', 'name email avatar');
    if (technician) {
      res.json(technician);
    } else {
      res.status(404).json({ message: 'Technician not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create/Update technician profile
// @route   POST /api/technicians
// @access  Private (Technician role)
const updateTechnicianProfile = async (req, res) => {
  try {
    const { specialization, bio, location, experience, hourlyRate } = req.body;
    
    let technician = await Technician.findOne({ user: req.user._id });

    if (technician) {
      // Update
      technician.specialization = specialization || technician.specialization;
      technician.bio = bio || technician.bio;
      technician.location = location || technician.location;
      technician.experience = experience || technician.experience;
      technician.hourlyRate = hourlyRate || technician.hourlyRate;
      
      const updatedTech = await technician.save();
      res.json(updatedTech);
    } else {
      // Create
      const newTech = new Technician({
        user: req.user._id,
        specialization,
        bio,
        location,
        experience,
        hourlyRate
      });
      const createdTech = await newTech.save();
      res.status(201).json(createdTech);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getTechnicians, getTechnicianById, updateTechnicianProfile };
