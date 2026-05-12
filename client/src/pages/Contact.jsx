import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you'd send this to your backend
  };

  return (
    <div className="contact-page container">
      <section className="contact-header">
        <h1>Contact <span className="text-blue">Us</span></h1>
        <p>Have questions? We're here to help you 24/7.</p>
      </section>

      <div className="contact-layout">
        <div className="contact-info-panel">
          <div className="info-card">
            <div className="info-icon"><Phone size={24} /></div>
            <div className="info-text">
              <h3>Call Us</h3>
              <p>+91 98765 43210</p>
              <p>Mon-Sat: 9am - 8pm</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon"><Mail size={24} /></div>
            <div className="info-text">
              <h3>Email Us</h3>
              <p>support@techfinder.in</p>
              <p>info@techfinder.in</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon"><MapPin size={24} /></div>
            <div className="info-text">
              <h3>Our Head Office</h3>
              <p>TechFinder Solutions Pvt. Ltd.</p>
              <p>Connaught Place, New Delhi</p>
              <p>Delhi - 110001, India</p>
            </div>
          </div>

          <div className="social-links-panel">
            <h3>Follow Our Journey</h3>
            <div className="social-icons">
              {/* Add social links if needed */}
              <div className="social-icon-box">IN</div>
              <div className="social-icon-box">FB</div>
              <div className="social-icon-box">TW</div>
            </div>
          </div>
        </div>

        <div className="contact-form-panel">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="success-message"
            >
              <MessageSquare size={48} className="success-icon" />
              <h2>Thank You!</h2>
              <p>Your message has been sent successfully. Our team will get back to you shortly.</p>
              <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
            </motion.div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input 
                  type="text" 
                  placeholder="How can we help?" 
                  required 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea 
                  rows="5" 
                  placeholder="Your message here..." 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary submit-btn">
                Send Message <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
