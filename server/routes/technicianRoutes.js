const express = require('express');
const router = express.Router();
const { getTechnicians, getTechnicianById, updateTechnicianProfile } = require('../controllers/technicianController');
const { protect } = require('../middleware/auth');

router.get('/', getTechnicians);
router.get('/:id', getTechnicianById);
router.post('/', protect, updateTechnicianProfile);

module.exports = router;
