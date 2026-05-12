import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose, technician }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [notes, setNotes] = useState('');

  const handleBooking = () => {
    // In real app, call API
    setStep(3);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div 
          className="modal-content" 
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
        >
          <button className="modal-close" onClick={onClose}><X size={24} /></button>
          
          {step === 1 && (
            <div className="modal-step">
              <h2>Select a Date & Time</h2>
              <div className="form-group">
                <label><Calendar size={18} /> Choose Date</label>
                <input 
                  type="date" 
                  min={new Date().toISOString().split('T')[0]} 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              
              <div className="slots-grid">
                {technician.availableSlots.map((slot, index) => (
                  <button 
                    key={index} 
                    className={`slot-btn ${selectedSlot === slot ? 'active' : ''}`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    <Clock size={16} /> {slot}
                  </button>
                ))}
              </div>

              <button 
                className="btn btn-primary next-btn" 
                disabled={!selectedDate || !selectedSlot}
                onClick={() => setStep(2)}
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="modal-step">
              <h2>Confirm Booking</h2>
              <div className="booking-summary">
                <p><strong>Technician:</strong> {technician.user.name}</p>
                <p><strong>Service:</strong> {technician.specialization[0]}</p>
                <p><strong>Time:</strong> {selectedDate} at {selectedSlot}</p>
                <p><strong>Rate:</strong> ₹{technician.hourlyRate}/hr</p>
              </div>

              <div className="form-group">
                <label>Additional Notes</label>
                <textarea 
                  placeholder="Describe your issue in detail..." 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="modal-actions">
                <button className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                <button className="btn btn-primary" onClick={handleBooking}>Confirm & Book</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="modal-step success-step">
              <CheckCircle size={64} className="success-icon" />
              <h2>Booking Confirmed!</h2>
              <p>Your appointment with {technician.user.name} has been scheduled. You'll receive an email confirmation shortly.</p>
              <button className="btn btn-primary" onClick={onClose}>Close</button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;
